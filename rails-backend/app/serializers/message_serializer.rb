class MessageSerializer < ActiveModel::Serializer
  has_one :sender
  has_one :recipient
  attributes :id, :content, :status, :created_at

  class PersonSerializer < ActiveModel::Serializer
    attributes :name
  end
end