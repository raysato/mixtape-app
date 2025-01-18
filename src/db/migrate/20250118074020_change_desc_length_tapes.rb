class ChangeDescLengthTapes < ActiveRecord::Migration[8.0]
  def up
    change_column :tapes, :description, :string, limit: 2550 # Adjust the limit as needed
  end

  def down
    change_column :tapes, :description, :string, limit: 255 # Revert to the original limit
  end
end
