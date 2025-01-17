class Tape < ApplicationRecord
    has_one :resource, class_name: 'Resource', foreign_key: 'id', primary_key: 'resource_id'
    has_many :tracks, dependent: :destroy
  
    validates :uuid, presence: true, uniqueness: true
    validates :name, presence: true
end
  