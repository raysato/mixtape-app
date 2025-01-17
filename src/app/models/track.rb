class Track < ApplicationRecord
    belongs_to :tape
    has_one :resource, class_name: 'Resource', foreign_key: 'id', primary_key: 'resource_id'
  
    validates :name, :play_at, :start_at, :end_at, :resource_id, presence: true
end  