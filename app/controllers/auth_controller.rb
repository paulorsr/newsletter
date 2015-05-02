class AuthController < ApplicationController

	def login
		data = JSON.parse(request.body.read)
		user = User.where("username = ? AND password = ?", data["username"], data["password"]).first
		if user.present?
			render json: user.to_json(only: [:name, :token])
		else 
			render nothing: true, status: :forbidden
		end
	end

end