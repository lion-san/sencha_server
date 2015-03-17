require 'spec_helper'

describe "ProjectsPages" do

  subject { page }


  describe "projects" do

    before { visit projects_path }

    it { should have_content( "Projects belong" ) }
    it { should have_title( full_title('Project list')) }
  end


  describe "after saving the project" do

    params = '{"project":"test","events": [{"event":"say","operator":"=","param":"1","event_id":"1","actions": [{"action":"talk","param":"2"}]},{"event":"saw","operator":"==","param":"FACE","event_id":"2","actions": [{"action":"camera","param":""}]}]}'

    it "should create project from json" do
      expect do
        post "/projects", params.to_json, { 'CONTENT_TYPE' => "application/json", "Accept" => "application/json" }
      end.to change(Project, :count).by(1) 
    end

    it "should create events from json" do
      expect do
        post "/projects", params.to_json, { 'CONTENT_TYPE' => "application/json", "Accept" => "application/json" }
      end.to change(Event, :count).by(2)
    end

    it "should create actions from json" do
      expect do
        post "/projects", params.to_json, { 'CONTENT_TYPE' => "application/json", "Accept" => "application/json" }
      end.to change(Action, :count).by(2)
    end
  end


  describe "GET /projects.json" do
    it "/projects.json" do
      get "/projects.json", {}, { "Accept" => "application/json" }
      expect(response.status).to eq 200
    end
  end


  describe "with delete links" do
    before { visit projects_path }

    it { should_not have_link('delete') }

    describe "there are delete projects" do
      before(:all) { 10.times { FactoryGirl.create(:project) } }
      after(:all)  { Project.delete_all }

      it { should have_link('delete', href: project_path(Project.first)) }

      it "should be able to delete another project" do
        expect do
          click_link('delete', match: :first)
        end.to change(Project, :count).by(-1)
      end
    end
  end


  describe "Project details page" do
    let(:pj) { FactoryGirl.create(:project) }
    before { visit project_path( pj ) }

    it { should have_content("Project detail") }
    it { should have_title(full_title("Project: " + pj.pjname)) }
    it { should have_content(pj.events.first.event) }
    it { should have_content(pj.events.first.operator) }
    it { should have_content(pj.events.first.param) }
  end

end
