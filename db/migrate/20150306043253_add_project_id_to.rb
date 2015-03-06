class AddProjectIdTo < ActiveRecord::Migration
  def change
    add_column :events, :project_id, :string
  end
end
