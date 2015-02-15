class Event < ActiveRecord::Base
  has_many :actions, dependent: :destroy
  validates :event, presence: true
  validates :operator, presence: true

  accepts_nested_attributes_for :actions
end
