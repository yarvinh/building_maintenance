class Building < ApplicationRecord
    belongs_to :user
    has_many :work_orders
    has_many :employees, through: :work_orders

    validates :super_name, :address, :phone_number, presence: true
    validates :address, uniqueness: true

    def self.current_user_buildings(id)
        user = User.find_by_id(id)
        # buildings = Building.all
        if user
          user.buildings
          # buildings.select{|b|b.user_id.to_s === user.id.to_s}
        else
         buildings = {error_message: ["No buildings has been created."]}
        end
      end
end
