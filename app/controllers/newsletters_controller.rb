class NewslettersController < ApplicationController

	before_action { 
		checkToken(params[:token])
	}

	def show
		render json: Newsletter.all
	end

	def get
		render json: Newsletter.where(id: params[:id]).first
	end

	def save
		data = JSON.parse(request.body.read)
		newsletter = Newsletter.where(id: params[:id]).first
		if newsletter.present?
			newsletter.name = data['name']
			newsletter.content = data['content']
		else
			newsletter = Newsletter.new(:name => data['name'], :content => data['content'])
		end
		newsletter.save
		render nothing: true
	end

	def delete
		newsletter = Newsletter.where(id: params[:id]).first
		newsletter.destroy
		render json: Newsletter.all
	end

end
