class RenameColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :tickets, :name, :title
    add_column :tickets, :draggable,  :boolean, default: true
  end
end
