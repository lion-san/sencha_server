class Event < ActiveRecord::Base
  has_many :actions
end
