class BuildingsController < ApplicationController
    def index
        buildings = Building.current_user_buildings(session[:user_id])
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

      private

      def building_params
            params.require(:building).permit(:address,:super_name,:phone_number)
      end
    
    
end
