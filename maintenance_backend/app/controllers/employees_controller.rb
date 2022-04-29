class EmployeesController < ApplicationController
  def show
    user = User.find_by_id(session[:user_id]) 
    employee = Employee.find_by_id(session[:employee_id])
    if user
      employee = user.employees.find_by_id(params[:id])
      render json:EmployeeSerializer.new(employee).to_serialized_json
    elsif employee
      employee = Employee.find_by_id(params[:id])
      render json:EmployeeSerializer.new(employee).to_serialized_json
    end
    
  end
  def index
    user = User.find_by_id(session[:user_id])
    employee = Employee.find_by_id(session[:employee_id])
     if employee
      user ||= employee.user
     end 
    if user
       render json:EmployeesSerializer.new(user.employees).to_serialized_json
    else
      render json:{error_message: ["Sigh Up or Login"]}
    end
  end
  def create
    employee = Employee.new(employee_params)
    user = User.find_by_id(session[:user_id])
    employee.user = user
    if employee.valid?  
        employee.save
        render json:EmployeesSerializer.new(user.employees).to_serialized_json
    else
        render json: {id: "error_1", error_message: employee.errors.full_messages}
    end
  end

  def update
    user = User.find_by_id(session[:user_id]) 
     if user
      employee = user.employees.find_by_id(params[:id])
      if employee.update(employee_params)
        render json:EmployeeSerializer.new(employee).to_serialized_json
      else
      render json: {error: employee.errors.full_messages}
      end
    end
  end

  private

  def employee_params
        params.require(:employee).permit(:name, :password, :password_confirmation, :username, :email, :phone, :old_password)
  end

end
