class CreateTapes < ActiveRecord::Migration[8.0]
  def change
    create_table :tapes do |t|
      t.string :name
      t.string :description
      t.string :uuid
      t.string :password
      t.integer :resource_id

      t.timestamps
    end
  end
end
