class CommentsSerializer
    def initialize(comments_object)
       @comments = comments_object
    end

    def to_serialized_json
      options = {
        include:{   
            user: {},
            employee:{},
            replies: {
               include: {
                 employee: {},
                 user: {}
               }
            }
        }
      }
      @comments.to_json(options)
    end
  end