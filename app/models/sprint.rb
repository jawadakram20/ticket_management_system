class Sprint < ApplicationRecord
    validates :name, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
    has_many :tickets, dependent: :destroy
end
