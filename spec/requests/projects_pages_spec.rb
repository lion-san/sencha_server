require 'spec_helper'

describe "ProjectsPages" do

  subject { page }


  describe "projects" do

    before { visit projects_path }

    it { should have_content( "Projects belong" ) }
    it { should have_title( full_title('Project list')) }
  end


  describe "GET /projects.json" do

    it "/projects.json" do

      get "/projects.json", {}, { "Accept" => "application/json" }

      expect(response.status).to eq 200
    end
  end

end
