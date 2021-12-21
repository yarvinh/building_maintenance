class EmployeesSerializer
    def initialize(employees_object)
       @employees = employees_object
   
    end

  def to_serialized_json
      options = {
        include:{
            user: {only: [:id]}
        },
        except: [:updated_at, :created_at]
      }
      @employees.to_json(options)
    end
  
  end