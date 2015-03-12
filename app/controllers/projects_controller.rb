class ProjectsController < ApplicationController

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def index
    @projects = Project.find_all_by_user_id( 'test' )

    respond_to do |format|
      format.html
      format.json { render json: @projects.to_json(
        :only => ['pjname']
      ) }
      format.xml { render :xml => @events }
    end
  end

  
  def show

    @project = Project.find_by( pjname: project_params )

  end

  
  def destroy
    @project = Project.find( params[:id] ).destroy
    flash[:success] = "Project destroyed."
    redirect_to projects_url
  end


  def create

    project = event_params

    logger.debug("=============hoge=================");
    logger.debug( project.attributes )
    project.events.each do |e|
      logger.debug( e.attributes )
      e.actions.each do |p|
        logger.debug( p.attributes )
      end
    end

    before_project = Project.find_by( user_id: project.user_id,
                                     pjname: project.pjname )
    if !before_project.nil?
      before_project.destroy
      logger.debug("=============destory=================");
    end

    logger.debug("=============piyo=================");

    project.save

    redirect_to projects_url

  end
  

  private

    def project_params
      pjname = params[:id]
      return pjname
    end
    

    def event_params

    json = params[ :_json ]

    logger.debug("=============params=================");
    project = ActiveSupport::JSON.decode json 

    logger.debug( project["events"] )
    events = project["events"]

    @project = Project.new( user_id: "test", pjname: project["project"] )
    @events = Array.new

    events.each do | e |

      event = Event.new( #id: e["event_id"],
                        event: e["event"],
                        operator: e["operator"],
                        param: e["param"] )

      e[ "actions" ].each do | a |

        action = Action.new( event_id: e["event_id"],
                             action: a["action"],
                             param: a["param"] )

        event.actions << action
        logger.debug( event.actions.length )
      end
      @events.push( event )
    end

    @project.events << @events


    logger.debug("=============params=================");

    return @project
  end
end
