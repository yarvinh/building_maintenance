class EmployeesController < ApplicationController
  def index
    employees = Employee.current_user_employees(session[:user_id])
    render json:EmployeesSerializer.new(employees).to_serialized_json
  end

end
