class TasksController < ApplicationController
    def create
        user = User.find_by_id(session[:user_id])
        work_order = WorkOrder.find_by_id(params[:task][:work_order_id])
        task = Task.new(task_params)
        if user && task.valid?
            task.save
            render json: TasksSerializer.new(work_order.tasks)
        else
            render json:{error: task.errors.full_messages}
        end
    end

    def task_params
        params.require(:task).permit(:task, :work_order_id, :completed)
      end
end
