class ChangeColumnNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tickets, :sprint_id, true
  end
end
