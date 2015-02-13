class Event < ActiveRecord::Base
  has_many :actions
  validates :event, presence: true
  validates :operator, presence: true
end
