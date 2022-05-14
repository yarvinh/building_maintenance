class BuildingsController < ApplicationController

    def index
        user = User.find_by_id(session[:user_id])
        employee = Employee.find_by_id(session[:employee_id])
        if employee
          user ||= User.find_by_id(employee.user_id)
        end 

        if user 
          buildings = user.buildings
          render json:BuildingsSerializer.new(buildings).to_serialized_json
        else
          render json:{error_message: ["Sign Up or Login."]}
        end
    end

    def create
        user = User.find_by_id(session[:user_id])
        building = Building.new(building_params)
        building.user = user
        if building.valid? 
            building.save
            buildings = user.buildings
            render json:BuildingsSerializer.new(buildings).to_serialized_json
        else
             render json: {id: "error_1", error_message: building.errors.full_messages}
        end
      end

      def update
        user = User.find_by_id(session[:user_id])
        if user
            building = user.buildings.find_by_id(params[:id])
            if building.update(building_params)
              render json:BuildingsSerializer.new(current_user.buildings).to_serialized_json
            else
            render json: {error_message: building.errors.full_messages}
            end
        else
            render json: {error_message: ["No building was found"]}
        end
      end

      def destroy
        if current_user
          building = Building.find_by_id(params[:id])
          building.delete
          render json:BuildingsSerializer.new(current_user.buildings).to_serialized_json
        else
          render json: {error_message: ["you are not outhorize to delete action"]}
        end
      end

      private

      def building_params
            params.require(:building).permit(:address,:super_name,:phone_number)
      end
    
    
end
