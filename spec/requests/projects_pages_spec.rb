require 'spec_helper'

describe "ProjectsPages" do

  subject { page }


  describe "events/show" do
    let( :e ) { FactoryGirl.create( :event ) }

    before { visit event_path( e ) }

    it { should have_content( e.event ) }
    it { should have_content( e.operator ) }
  end


  describe "events/new" do

    before { visit new_event_path }

    it { should have_content('Events') }
  end


  describe "GET /events.json" do

    it "/events.json" do

      get "/events.json", {}, { "Accept" => "application/json" }

      expect(response.status).to eq 200
    end
  end

end
