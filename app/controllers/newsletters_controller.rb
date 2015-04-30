class NewslettersController < ApplicationController

	def show
		@newsletters = Newsletter.all
		render json: @newsletters
		#render :json => Newsletters.find(params[:account_id])
	end

	def new
		newsletter = Newsletter.new
	end

	def edit
		render plain: "I'm only accessible if you know the password"
	end

end
