class RepliesController < ApplicationController
    def index
        comment = Comment.find_by_id(params[:id])
        render json:RepliesSerializer.new(Reply.sort_replies_by_date(comment.replies)).to_serialized_json   
    end

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

    def destroy
        reply = Reply.find_by_id(params[:id])

        if reply
            # reply.likes.each{|like|like.delete}
            work_order = reply.comment.work_order
            reply.delete
        end
        render json:CommentsSerializer.new(Comment.sort_comments_by_date(work_order.comments)).to_serialized_json
    end

   

    private
    def reply_params
          params.require(:reply).permit(:comment_id, :reply)
    end

end
