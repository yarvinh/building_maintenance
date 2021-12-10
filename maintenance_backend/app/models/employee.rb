class Employee < ApplicationRecord
    has_secure_password
    belongs_to :user
    has_many :work_orders
    has_many :pay_roles
    has_many :replies
    has_many :comments
    has_many :buildings, through: :work_orders

    validates :name, :email, :username,  presence: true
    validates  :email, :username, uniqueness: true

    validates :password, :presence =>true, :confirmation =>true , :if => :password_required?
    validates_confirmation_of :password , :if => :password_required?
    
    # scope :find_employees, -> {order(:name) }
    protected


    def password_required?
      !persisted? || !password.nil? || !password_confirmation.nil?
    end

    def self.current_user_employees(id)
      user = User.find_by_id(id)
      employees = Employee.all
      if !employees.empty? && user
        employees.select{|emp|emp.user_id.to_s === user.id.to_s}
      else
        employees = {error_message: ["No employees has been created."]}
      end
    end
end
