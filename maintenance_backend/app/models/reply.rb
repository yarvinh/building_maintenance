class Reply < ApplicationRecord
    belongs_to :comment
    belongs_to :employee, optional: true
    belongs_to :user, optional: true
    
    def date   
        self.created_at.strftime("%a %b %d, %Y %I:%M%p")
    end

    def self.sort_replies_by_date(replies)
        replies.reverse{|reply|
           reply.created_at
        }
    end
    
end
