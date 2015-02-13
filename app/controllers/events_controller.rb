class EventsController < ApplicationController

  def index

    @events = Event.all

    respond_to do |format|
      format.html
      format.json { render json: @events.to_json(
        :only => ['event', 'operator'],
        :include => [ :actions => { :only => ['action', 'param'] } ] 
      ) }
      format.xml { render :xml => @events }
    end
  end


  def new
  end

  def create
    @event = Event.new( event_params )  
  end


  def show

    @event = Event.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render :json => @event }
      format.xml { render :xml => @event }
    end

  end


  private
  def event_params
    params.require(:event).permit( :event, :operator )
  end

end
