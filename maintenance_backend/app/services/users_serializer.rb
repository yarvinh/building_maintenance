class UsersSerializer
    def initialize(user_object)
       @users = user_object
    end

  def to_serialized_json
      options = {
        include: {
          work_orders: {}
        }
        except: [:updated_at, :created_at]
      }
      @users.to_json(options)
    end
  
  end