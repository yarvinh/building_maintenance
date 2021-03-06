class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string  :address
      t.string  :company_name
      t.string :username
      t.string  :password_digest
      t.string :email,  null: false, default: ""
      t.boolean :admin, default: false
      t.timestamps
    end
  end
end
