class MailinglistsController < ApplicationController

	before_action { 
		checkToken(params[:token])
	}

	def show
		render json: Mailinglist.all
	end

	def new
		data = JSON.parse(request.body.read)
		mailinglist = Mailinglist.new(:name => data['name'], :addresses => data['addresses'])
		mailinglist.save
		render nothing: true
	end

	def edit
		render json: Mailinglist.where(id: params[:id]).first
	end

	def delete
		mailinglist = Mailinglist.where(id: params[:id]).first
		mailinglist.destroy
		render json: Mailinglist.all
	end

end