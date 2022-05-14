class UsersController < ApplicationController
   def index
     users = User.all
     render json: {users: users }
   end
    def create
      user = User.new(user_params)
      if user.valid?
        user.admin = true
        user.save
        session[:user_id] = user.id
        render json: {is_login: true, user: User.find_by_id(session[:user_id])}

      else
        render json: {is_login: false,  error_message: user.errors.full_messages}
      end


    end

    private
    def user_params
          params.require(:user).permit(:company_name, :password, :password_confirmation, :username, :email, :address, :admin)
    end
end
