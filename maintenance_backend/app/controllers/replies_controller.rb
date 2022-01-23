class RepliesController < ApplicationController

    def create
        user = User.find_by_id(session[:user_id])
        employee = Employee.find_by_id(session[:employee_id])
        reply = Reply.new(reply_params)
        comment = Comment.find_by_id(reply_params[:comment_id])
        if user && reply.valid?
           reply.user = user
           reply.save
           render json:CommentsSerializer.new(Comment.sort_comments_by_date(comment.work_order.comments)).to_serialized_json
        elsif employee && reply.valid?
           reply.employee = employee
           reply.save
           render json:CommentsSerializer.new(Comment.sort_comments_by_date(comment.work_order.comments)).to_serialized_json
        else
            render json:{error: reply.errors.full_messages}
        end 
    end

    private
    def reply_params
          params.require(:reply).permit(:comment_id,:reply)
    end

end
