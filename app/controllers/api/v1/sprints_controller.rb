class Api::V1::SprintsController < ApplicationController
  before_action :set_sprint, only: [:show,:update]
  def index
    @sprints = Sprint.all
    @sprint_data = []
    @sprints.each do |sprint|
      @sprint_data.push({ 
        id: sprint.id,
        title: sprint.name,
        start_date: sprint.start_date,
        end_date: sprint.end_date,
        tickets: sprint.tickets
      })
    end

    render json: @sprint_data
  end

  def show
    render json: @sprint
  end

  def create
    @sprint = Sprint.new(sprint_params)
    
    if @sprint.save
      render json: @sprint, status: :created,location: api_v1_sprint_url(@sprint)
    else
      render json: @sprint.errors, status: :unprocessable_entity
    end
  end

  def update
    if @sprint.update!(sprint_params)
      render json: @sprint
    else
      render json: @sprint.errors, status: :unprocessable_entity
    end
  end

  private
  def set_sprint
    @sprint = Sprint.find(params[:id])
  end

  def sprint_params
    params.permit(:name, :start_date, :end_date)
  end
end
