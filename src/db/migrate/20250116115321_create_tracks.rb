class CreateTracks < ActiveRecord::Migration[8.0]
  def change
    create_table :tracks do |t|
      t.string :name
      t.integer :play_at
      t.integer :start_at
      t.integer :end_at
      t.integer :resource_id
      t.integer :tape_id

      t.timestamps
    end
  end
end
