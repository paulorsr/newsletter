class CreateMailinglists < ActiveRecord::Migration
  def change
    create_table :mailinglists do |t|

      t.timestamps
    end
  end
end
