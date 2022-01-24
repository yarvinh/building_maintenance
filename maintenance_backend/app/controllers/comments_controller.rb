class CommentsController < ApplicationController
    def index
        work_order = WorkOrder.find_by_id(params[:id])
        render json:CommentsSerializer.new(Comment.sort_comments_by_date(work_order.comments)).to_serialized_json   
    end
    def show
       comment = Comment.find_by_id(params[:id])
       render json:CommentSerializer.new(comment).to_serialized_json
    end
    
    def create
        user = User.find_by_id(session[:user_id])
        employee = Employee.find_by_id(session[:employee_id])
        comment = Comment.new(comment_params)
        work_order = WorkOrder.find_by_id(params[:comment][:work_order_id])
        if user && comment.valid?
           comment.user = user
           comment.save
           render json:CommentsSerializer.new(Comment.sort_comments_by_date(work_order.comments)).to_serialized_json
        #    render json:CommentSerializer.new(comment).to_serialized_json
        elsif employee && comment.valid?
           comment.employee = employee
           comment.save
           render json:CommentsSerializer.new(Comment.sort_comments_by_date(work_order.comments)).to_serialized_json
        #    render json:CommentSerializer.new(comment).to_serialized_json

        else
            render json:{error: comment.errors.full_messages}
        end 
    end

    def destroy
        comment = Comment.find_by_id(params[:id])
        if comment
            comment.replies.each{|r|r.delete}
            work_order = comment.work_order
            comment.delete
        end
        render json:CommentsSerializer.new(Comment.sort_comments_by_date(work_order.comments)).to_serialized_json
    end

    private
    def comment_params
          params.require(:comment).permit(:work_order_id,:subject, :comment)
    end
end
