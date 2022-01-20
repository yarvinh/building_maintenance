class CommentSerializer
    def initialize(object)
       @comment = object
    end

    def to_serialized_json
        options = {
            include:{
               user: {},
               employee: {}
            }
        } 
        @comment.to_json(options)
    end
  
  end