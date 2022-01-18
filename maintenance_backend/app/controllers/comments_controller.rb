class CommentsController < ApplicationController
    def index
        work_order = WorkOrder.find_by_id(params[:id])
        render json:CommentsSerializer.new(work_order.comments).to_serialized_json
    end
    
    def create
        user = User.find_by_id(session[:user_id])
        employee = Employee.find_by_id(session[:employee_id])
        comment = Comment.new(comment_params)
        work_order = WorkOrder.find_by_id(params[:comment][:work_order_id])
        if user && comment.valid?
           comment.user = user
           comment.save
           render json:CommentsSerializer.new(work_order.comments).to_serialized_json
        elsif employee && comment.valid?
           comment.employee = employee
           comment.save
           render json:CommentsSerializer.new(work_order.comments).to_serialized_json
        else
            render json: {error: comment.errors.full_messages}
        end 
    end

    private
    def comment_params
          params.require(:comment).permit(:work_order_id,:subject, :comment)
    end
end
