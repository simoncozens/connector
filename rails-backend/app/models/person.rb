class Person
  include Mongoid::Document
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

  has_many :follows, :dependent => :destroy

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

  def self.search_from_params(params)
    clause = params.slice(*searchable_fields)
    if params["fts"]
      clause[:$text] = { :$search => params["fts"] }
    end
    self.where(clause)
  end
end
