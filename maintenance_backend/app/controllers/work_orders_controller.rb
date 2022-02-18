class WorkOrdersController < ApplicationController
  def show
    user = User.find_by_id(session[:user_id])
    employee = Employee.find_by_id(session[:employee_id])
    if user
      work_order = user.work_orders.find_by_id(params[:id])
      render json:WorkOrderSerializer.new(work_order).to_serialized_json
    elsif employee
      work_order = employee.user.work_orders.find_by_id(params[:id])
      render json:WorkOrderSerializer.new(work_order).to_serialized_json
    else
        render json: {error_message: ["No work orders was found"]}
    end
  end

  def index
    id =  session[:user_id]
    employee = Employee.find_by_id(session[:employee_id])
    if employee
      id ||= employee.user_id
    end 
    work_orders = WorkOrder.current_user_work_orders(id)
    render json:WorkOrdersSerializer.new(work_orders).to_serialized_json
  end

  def create
    user = User.find_by_id(session[:user_id])
    work_orders = WorkOrder.new(work_order_params)
    work_orders.user = user
    if work_orders.valid? 
        work_orders.save
        work_orders = WorkOrder.current_user_work_orders(session[:user_id])
        render json:WorkOrdersSerializer.new(work_orders).to_serialized_json
    else
         render json: {id: "error_1", error_message: work_orders.errors.full_messages}
    end
  end

  def update
    user = User.find_by_id(session[:user_id]) 
    employee = Employee.find_by_id(session[:employee_id]) 
    if user
      work_order = user.work_orders.find_by_id(params[:id])
      if work_order.update(work_order_params)
        render json:WorkOrdersSerializer.new(user.work_orders).to_serialized_json
      end
    elsif employee
        work_order = employee.work_orders.find_by_id(params[:id])
        if work_order.update(work_order_params)
          render json:WorkOrdersSerializer.new(employee.user.work_orders).to_serialized_json
        end
    else
      render json: {error: work_order.errors.full_messages}
    end
 
  end

  def work_order_params
    params.require(:work_order).permit(:title,:task,:date,:building_id,:employee_id, :status)
  end
end
