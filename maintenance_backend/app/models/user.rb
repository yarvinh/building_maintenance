class User < ApplicationRecord     
    has_secure_password
    has_many :work_orders
    has_many :comments
    has_many :employees#, through: :work_orders
    has_many :buildings#, through: :work_orders
    has_many :replies
  
    validates :username, :email, :company_name, presence: true
    validates :username, :email, uniqueness: true
    PASSWORD_REQUIREMENT = /\A (?=.*[[:^alnum:]])/x
    # validates_with OldPasswordValidator , :if => :password_required?

    
     
    validates :password, :presence =>true, :confirmation =>true, format: PASSWORD_REQUIREMENT,:length => {:within => 6..40}, :if => :password_required?
    validates_confirmation_of :password , :if => :password_required?

   def old_password=(password)
     if self.authenticate(password[:old_password])
      @old_password = true
     end
   end

   def old_password
    @old_password
   end
    protected

  def password_required?
    !persisted? || !password.nil? || !password_confirmation.nil?
  end
end
