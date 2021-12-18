class BuildingsSerializer
    def initialize(buildings_object)
       @buildings = buildings_object
   
    end

  def to_serialized_json
      options = {
        include:{
            user: {only: [:id]}
        },
        except: [:updated_at, :created_at]
      }
      @buildings.to_json(options)
    end
  
  end