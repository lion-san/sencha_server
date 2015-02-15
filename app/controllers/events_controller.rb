class EventsController < ApplicationController

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

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
    logger.debug("=============hoge=================");
    #@event = Event.new( event_params )  

    hoge = event_params

    logger.debug( hoge )
    

    redirect_to events_url 
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
    json = params[ :_json ]

    logger.debug("=============params=================");
    #hoges = JSON.parse( json )
    events = ActiveSupport::JSON.decode json 


    logger.debug( events )
    logger.debug( '+++++++++++++++++++' )

    events.each do | event |
      #logger.debug( event )
      logger.debug( event["event"] )
      logger.debug( event["operator"] )

      @event = Event.new( event: event["event"],
                          operator: event["operator"] )

      event[ "actions" ].each do | action |
        #logger.debug( action )
        logger.debug( '  ' + action["action"] )
        logger.debug( '  ' + action["param"] )

        @action = Action.new( action: action["action"],
                             param: action["param"] )

        #イベントがもつactionsをPush
      end

    
    end


    #logger.debug( events );

    logger.debug("=============params=================");
    #params.require(:event).permit( :event, :operator )
  end

end
