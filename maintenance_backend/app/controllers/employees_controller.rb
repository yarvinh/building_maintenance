class EmployeesController < ApplicationController
  def index
    employees = Employee.current_user_employees(session[:user_id])
    render json:EmployeesSerializer.new(employees).to_serialized_json
  end
  def create
    employee = Employee.new(employee_params)
    employee.user_id = session[:user_id]
    if employee.valid? 
        employee.save
        employees = Employee.current_user_employees(session[:user_id])
        render json:EmployeesSerializer.new(employees).to_serialized_json
    else
         render json: {id: "error_1", error_message: employee.errors.full_messages}
    end
  end

  private

  def employee_params
        params.require(:employee).permit(:name, :password, :password_confirmation, :username, :email)
  end

end
