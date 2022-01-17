class CommentsController < ApplicationController
    def create
        user = User.find_by_id(session[:user_id])
        employee = Employee.find_by_id(session[:employee_id])
        comment = Comment.new(comment_params)
        # if user && comment.valid?
        #    comment.user = user
        #    render json: {id: "error_1"}
        #    render json:CommentsSerializer.new(Comment.all).to_serialized_json
        # elsif employee && comment.valid?
        #    comment.employee = employee
        #    render json: {id: "error_1"}
        #    render json:CommentsSerializer.new(Comment.all).to_serialized_json
        # else
            # render json: {id: "error_1"}
            # render json: {error: comment.errors.full_messages}
        # end 
        render json: {id: "error_1"}
        # render json: {id: "error_1"}
    end

    # private
    def comment_params
          params.require(:comment).permit(:work_order_id,:subject, :comment)
    end
end
