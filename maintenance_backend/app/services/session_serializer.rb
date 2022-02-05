class SessionSerializer
    def initialize(user_object,admin)
       @user = user_object
       @admin = admin
    end

  def to_serialized_json
      options = {
        include: {
          work_orders: {
          include: {
              building: {},
              employee: {}
          }
          }

        }
        # except: [:password, :username, :updated_at, :created_at]
      }
      user = {admin: @admin, is_login: true, user: @user}
      user.to_json(options)
    end
  
  end