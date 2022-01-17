class SessionsController < ApplicationController

    def show   
        if logged_in? 
            user = User.find_by_id(session[:user_id])
            employee = Employee.find_by_id(session[:employee_id])
            if user
                render json: {admin: true, is_login: true, user: user}
            else
                render json: {admin: false, is_login: true, user: employee}
            end
        else
            render json: {is_login: false}
       end
    end  
    # def new
    #     if logged_in?
    #         user = User.find(session[:user_id])
    #         redirect_to user_path(user)
    #     else
    #         render "new"
    #     end
    # end

    # def create  
    #     @user = User.find_by(username: params[:user][:username])
    #     if @user && @user.authenticate(params[:user][:password])
    #         login!
    #         if @user.admin
    #           redirect_to user_path(@user)
    #         else    
    #            render json: {logged_in: true, user: @user }
    #         end
    #     else
    #         redirect_to "/adminlogin"
    #     end   
    # end

    def admins_login
        @user = User.find_by(username: params[:user][:username])
        if @user && @user.authenticate(params[:user][:password])
            login!  
            render json: {admin: true, is_login: true, user: @user }
        else
            render json: {is_login: false, status: 401, messages: ['wrong password or username'] }
        end  
    end

    def employees_login
        @employee = Employee.find_by(username: params[:user][:username])
        if @employee && @employee.authenticate(params[:user][:password])
            session[:employee_id] = @employee.id
            render json: {admin: false, is_login: true, user: @employee }
        else
            render json: {is_login: false, status: 401, messages: ['wrong password or username'] }
        end  
    end
  
    def destroy
        logout!
        render json: {is_login: false}
    end
end
