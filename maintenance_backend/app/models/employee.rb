class Employee < ApplicationRecord
    has_secure_password
    belongs_to :user
    has_many :work_orders
    has_many :pay_roles
    has_many :replies
    has_many :comments
    has_many :buildings, through: :work_orders
    validates_with OldPasswordValidator , :if => :password_required?

    validates :name, :email, :username, :phone,  presence: true
    validates  :email, :username, uniqueness: true

    validates :password,  :presence =>true, :confirmation =>true ,:length => {:within => 6..40}, :if => :password_required?
    validates_confirmation_of :password , :if => :password_required?
    
    scope :find_employees, -> {order(:name) }
   

 
    def old_password=(password)
      if self.authenticate(password)
       @old_password = true
      end
    end
 
    def old_password
     @old_password
    end

    def self.current_user_employees(id)
      user = User.find_by_id(id)
      employees = Employee.all
      if !employees.empty? && user
        find_employees.select{|emp|emp.user_id.to_s === user.id.to_s}
      else
        employees = {error_message: ["No employees has been created."]}
      end
    end
    # protected
    def password_required?
      !persisted? || !password.nil? || !password_confirmation.nil? #|| !old_password.nil?
    end


end
