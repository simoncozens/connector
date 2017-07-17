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
end
