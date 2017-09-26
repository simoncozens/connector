class Person
  include Mongoid::Document
  include Mongoid::Timestamps

  paginates_per 10
  authenticates_with_sorcery!

  # Profile fields
  field :roles, type: Array
  field :name, type: String
  field :intro_bio, type: String
  field :preferred_contact, type: String
  field :affiliations, type: Array
  field :experience, type: Array
  field :regions, type: Array
  field :gender
  field :picture
  field :country
  has_many :follows, :dependent => :destroy
  field :last_visited, type: Array # Do this as array of IDs for simplicity

  def self.searchable_fields
    fields.map{|x|x[0]} - ["crypted_password","salt"]
  end

  def follow!(user)
    follows.create(followed_user_id: user.id)
  end

  def unfollow!(user)
    follows.where(followed_user_id: user.id).destroy
  end

  def following?(user)
    follows.where(followed_user_id: user.id).exists?
  end

  def visit(user)
    l = self.last_visited || []
    l.unshift(user.id).uniq!
    l.slice!(6)
    self.last_visited = l
    save!
  end

  def self.search_from_params(params)
    clause = params.slice(*searchable_fields)
    if params["fts"] and !params["fts"].empty?
      clause[:$text] = { :$search => params["fts"] }
    end
    self.where(clause)
  end
end
