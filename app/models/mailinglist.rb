class Mailinglist < ActiveRecord::Base
	attr_accessor :name
	has_many :emails
end
