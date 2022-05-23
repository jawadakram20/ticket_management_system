# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 10.times do |i|
#     Sprint.create(
#       id: i,
#       name: "test name #{i+1}",
#       start_date: Date.today + i,
#       end_date: Date.today - i
#     )
#   end
  # 10.times do |i|
  #   Ticket.create(
  #     id: i ,
  #     sprint_id: rand(1..9),
  #     title: "test title #{i+1}",
  #     description: "test description #{i+1}"
  #   )
  # end

  4.times do |i|
    Ticket.create(
      # id: i ,
      # sprint_id: rand(1..9),
      title: "test title #{i+1}",
      description: "test description #{i+1}"
    )
  end
