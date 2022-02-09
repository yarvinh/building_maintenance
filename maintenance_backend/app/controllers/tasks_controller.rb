class TasksController < ApplicationController
    def index
        work_order = WorkOrder.find_by_id(params[:id])
     
        if  work_order
            render json: TasksSerializer.new(work_order.tasks).to_serialized_json
        else
            render json: {error: "Something Went Wrong"}
        end
    end
    def create
        user = User.find_by_id(session[:user_id])
        work_order = WorkOrder.find_by_id(params[:task][:work_order_id])
        task = Task.new(task_params)
        if user && task.valid?
            task.save
            render json: TasksSerializer.new(work_order.tasks).to_serialized_json
        else
            render json:{error: task.errors.full_messages}
        end
    end

    def update
        task = Task.find_by_id(params[:id])
        if task  
            if !task.completed
               task.completed = true
            else
                task.completed = false
            end
            task.save
            work_order = task.work_order
            render json: TasksSerializer.new(work_order.tasks).to_serialized_json
        else
            render json: {error: "Something Went Wrong"}
        end
    end

    def destroy
        user = User.find_by_id(session[:user_id])
        task = Task.find_by_id(params[:id])
        work_order = task.work_order
        if user
            task.delete
            # render json: TasksSerializer.new(work_order.tasks).to_serialized_json
        end
        render json: TasksSerializer.new(work_order.tasks).to_serialized_json
    end

    def task_params
        params.require(:task).permit(:task, :work_order_id, :completed)
      end
end
