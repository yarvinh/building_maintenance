class TasksSerializer
    def initialize(object)
       @tasks = object
    end

    def to_serialized_json
      options = {
        include:{   
          work_order: {}
        }
      }
      @tasks.to_json(options)
    end
  end