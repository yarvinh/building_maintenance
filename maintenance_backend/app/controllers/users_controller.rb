class UsersController < ApplicationController
   def index
     user = User.all
     render json: {users: user }
   end
    def create
      # session.clear
      user = User.new(user_params)
      if user.valid?
        # user.admin = true
        user.save
        session[:user_id] = user.id
        render json: {is_login: true, user: User.find_by_id(session[:user_id])}
      else
        render json: {is_login: false,  messages: user.errors.full_messages}
      end

    end

    private
    def user_params
          params.require(:user).permit(:company_name, :password, :password_confirmation, :username, :email, :coins, :address, :admin)
    end
end
