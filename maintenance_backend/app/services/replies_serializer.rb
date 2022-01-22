class RepliesSerializer
    def initialize(replies_object)
       @replies = replies_object
    end

    def to_serialized_json
      options = {
        include:{   
            user: {},
            employee:{}
        }
      }
      @replies.to_json(options)
    end
  end