class Comment < ApplicationRecord
    belongs_to :work_order
    belongs_to :user, optional: true
    belongs_to :employee ,optional: true
    has_many :replies
    validates :subject, :comment, presence: true
end
