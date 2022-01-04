class WorkOrder < ApplicationRecord
    belongs_to :user
    belongs_to :building
    belongs_to :employee

    validates :task, :date, presence: true

    def self.current_user_work_orders(id)
        user = User.find_by_id(id)
        work_orders = WorkOrder.all
        if !work_orders.empty? && user
            work_orders.select{|b|b.user_id.to_s === user.id.to_s}
        else
            work_orders = {error_message: ["No work orders has been created."]}
        end
    end
end
