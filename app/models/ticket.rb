class Ticket < ApplicationRecord
  validates :title, presence: true
  belongs_to :sprint, optional: true
end
