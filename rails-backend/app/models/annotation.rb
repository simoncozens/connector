class Annotation
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :about, class_name: 'Person'
  belongs_to :created_by, class_name: 'Person'
  field :content
end
