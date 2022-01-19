class EmployeeSerializer
    def initialize(object)
       @employee = object
    end

  def to_serialized_json
      options = {
        include:{
            user: {only: [:id]},
            work_orders: {
              include:{
                user: {only: [:id]},
                employee: {},
                building: {}
              }
        }

  
        }
        # except: [:updated_at, :created_at]
      }
      @employee.to_json(options)
    end
  
  end