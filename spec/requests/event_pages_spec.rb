require 'spec_helper'

describe "EventPages" do

  subject { page }

  describe "Event new page" do

        before { visit new_events_path }
        
        it { should have_content('Events') }
  end
end
