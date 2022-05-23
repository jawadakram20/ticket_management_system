class Api::V1::TicketsController < ApplicationController
    
  before_action :set_ticket, only: [:show,:update]
  def index
    @tickets = Ticket.where(sprint_id: nil)
    render json: @tickets
  end

  def show
    render json: @ticket
  end

  def create
    @ticket = Ticket.new(ticket_params)

    if @ticket.save
        render json: @ticket, status: :created, location: api_v1_ticket_url(@ticket)
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  def update
    if @ticket.update!(ticket_params)
      render json: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  private
  def set_ticket
    @ticket = Ticket.find(params[:id])
  end

  def ticket_params
    params.permit(:title, :description ,:sprint_id, :draggable)
  end
end
