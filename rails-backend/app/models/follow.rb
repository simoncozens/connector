class Follow
  include Mongoid::Document
  belongs_to :person
  belongs_to :followed_user, class_name: 'Person'
end
