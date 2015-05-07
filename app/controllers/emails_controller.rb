class EmailsController < ApplicationController
		
	def post
		data = JSON.parse(request.body.read)
		newsletter = Newsletter.where(data['newsletter']).first
		emails = Mailinglist.where(id: params[:id])
		data['mailinglists'].each do |id|
			mailinglist = Mailinglist.where(id: id).first
			if mailinglist.present?
				addresses = mailinglist.addresses.split(";")
				addresses.each do |address|
					RestClient.post "https://api:key-14e6d33962d392abf6849e2d7dcb67f5"\
  					"@api.mailgun.net/v3/sandbox6e717286433345b097a039d3a0e034e8.mailgun.org/messages",
			  		:from => "Mailgun Sandbox <postmaster@sandbox6e717286433345b097a039d3a0e034e8.mailgun.org>",
			  		:to => "#{address}",
			  		:subject => "#{newsletter.name}",
			  		:text => "#{newsletter.content}"
				end
			end
		end
		render nothing: true
	end

end