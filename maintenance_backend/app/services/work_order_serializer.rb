class WorkOrderSerializer
    def initialize(object)
       @work_order = object
   
    end

  def to_serialized_json
      options = {
        include:{
            user: {only: [:id]},
            employee: {},
            building: {}

        },
        except: [:updated_at, :created_at]
      }
      @work_order.to_json(options)
    end
  
  end