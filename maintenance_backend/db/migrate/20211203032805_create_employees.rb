class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :phone
      t.string :password_digest
      t.string :date_of_birth
      t.string :email
      t.string :image
      t.string :username
      t.integer :user_id
      t.timestamps
    end
  end
end
