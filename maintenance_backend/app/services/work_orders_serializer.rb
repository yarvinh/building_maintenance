class WorkOrdersSerializer
    def initialize(object)
       @work_orders = object
   
    end

  def to_serialized_json
      options = {
        include:{
            user: {only: [:id]},
            employee: {},
            building: {},
        }
      
      }
      @work_orders.to_json(options)
    end
  
  end