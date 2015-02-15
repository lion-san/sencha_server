class EventsController < ApplicationController

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def index

    @events = Event.all

    respond_to do |format|
      format.html
      format.json { render json: @events.to_json(
        :only => ['event', 'operator', 'param'],
        :include => [ :actions => { :only => ['action', 'param'] } ] 
      ) }
      format.xml { render :xml => @events }
    end
  end


  def new
  end

  def create

    #$B%Q%i%a%?$N<hF@(B
    events = event_params

    logger.debug("=============destroy=================");

    #Delete -> Insert
    dels = Event.all
    dels.each do |del|
      logger.debug( del )
      del.destroy
    end

    logger.debug("=============hoge=================");
    logger.debug( events )

    logger.debug("=============piyo=================");
    events.each do |event|
      event.save
    end

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
    events = ActiveSupport::JSON.decode json 

    @events = Array.new

    #$BMWAG$N<h$j=P$7(B
    events.each do | e |

#      e.require(:event).permit(:event, :operator,
#                              {:actions => [:action, :params]})

      event = Event.new( id: e["event_id"],
                        event: e["event"],
                        operator: e["operator"],
                        param: e["param"] )

      e[ "actions" ].each do | a |

        action = Action.new( event_id: e["event_id"],
                             action: a["action"],
                             param: a["param"] )

        #$B%$%Y%s%H$,$b$D(Bactions$B$r(BPush
        event.actions << action
        logger.debug( event.actions.length )
      end
      @events.push( event )
    end


    #logger.debug( events );

    logger.debug("=============params=================");
    #params.require(:event).permit( :event, :operator )
    return @events
  end

end
