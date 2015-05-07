class MailinglistsController < ApplicationController

	before_action { 
		checkToken(params[:token])
	}

	def show
		render json: Mailinglist.all
	end

	def save
		data = JSON.parse(request.body.read)
		mailinglist = Mailinglist.where(id: params[:id]).first
		if mailinglist.present?
			mailinglist.name = data['name']
			mailinglist.addresses = data['addresses']
		else
			mailinglist = Mailinglist.new(:name => data['name'], :addresses => data['addresses'])
		end
		mailinglist.save
		render nothing: true
	end

	def get
		render json: Mailinglist.where(id: params[:id]).first
	end

	def delete
		mailinglist = Mailinglist.where(id: params[:id]).first
		mailinglist.destroy
		render json: Mailinglist.all
	end

end