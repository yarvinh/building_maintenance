class BuildingsController < ApplicationController
    def show
        user = User.find_by_id(session[:user_id])
        employee = Employee.find_by_id(session[:employee_id])
        if user 
            building = user.buildings.find_by_id(params[:id])
            render json: building
        elsif employee
            user = employee.user
            building = user.buildings.find_by_id(params[:id])
            render json: building
        else
            render json: {error_message: ["No building was found"]}
        end
    end

    def index
        id =  session[:user_id]
        employee = Employee.find_by_id(session[:employee_id])
        if employee
          id ||= employee.user_id
        end 
        buildings = Building.current_user_buildings(id)
        render json:BuildingsSerializer.new(buildings).to_serialized_json
    end

    def create
        user = User.find_by_id(session[:user_id])
        building = Building.new(building_params)
        building.user = user
        if building.valid? 
            building.save
            buildings = Building.current_user_buildings(session[:user_id])
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
              render json: building
            else
            render json: {error: building.errors.full_messages}
            end
        else
            render json: {error_message: ["No building was found"]}
        end
      end

      private

      def building_params
            params.require(:building).permit(:address,:super_name,:phone_number)
      end
    
    
end
