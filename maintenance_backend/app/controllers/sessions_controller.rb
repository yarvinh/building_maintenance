class SessionsController < ApplicationController

    def show   
        if logged_in? 
            user = User.find_by_id(session[:user_id])
            employee = Employee.find_by_id(session[:employee_id])
            if user
                render json: {admin: true, is_login: true, user: user, work_orders: user.work_orders}
            else
                user = User.find_by_id(employee.user_id)
                render json: SessionSerializer.new(employee, false).to_serialized_json
                # render json: {admin: false, is_login: true, user: employee , work_orders: employee.work_orders}
            end
        else
            render json: {is_login: false}
       end
    end  
    


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
