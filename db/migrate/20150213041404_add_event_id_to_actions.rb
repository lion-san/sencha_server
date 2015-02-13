class AddEventIdToActions < ActiveRecord::Migration
  def change
    add_column :actions, :event_id, :string
  end
end
