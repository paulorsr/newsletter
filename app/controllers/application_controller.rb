class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token
  
# verifica se o token é valido
def checkToken(token)
	if User.find_by(token: token).nil?
		redirect_to root_path
	else
		p "Token accepted!"
	end
end
end
