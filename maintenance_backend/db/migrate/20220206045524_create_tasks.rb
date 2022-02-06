class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :task
      t.string :work_order_id
      t.string :completed , default: false
      t.timestamps
    end
  end
end
