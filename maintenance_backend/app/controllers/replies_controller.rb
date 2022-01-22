class RepliesController < ApplicationController
    def index
        comment = Comment.find_by_id(params[:id])
        render json:RepliesSerializer.new(Reply.sort_replies_by_date(comment.replies)).to_serialized_json   
    end
end
