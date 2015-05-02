class NewslettersController < ApplicationController

	before_action { 
		checkToken(params[:token])
	}

	def show
		render json: Newsletter.all
	end

	def new
		data = JSON.parse(request.body.read)
		newsletter = Newsletter.new(:name => data['name'], :content => data['content'])
		newsletter.save
		render nothing: true
	end

	def edit
		render json: Newsletter.where(id: params[:id]).first
	end

	def delete
		newsletter = Newsletter.where(id: params[:id]).first
		newsletter.destroy
		render json: Newsletter.all
	end

end
