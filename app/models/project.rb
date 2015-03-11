class Project < ActiveRecord::Base
  has_many :events, dependent: :destroy
  #self.primary_key = :user_id, :pjname

  accepts_nested_attributes_for :events
end
