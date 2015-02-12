require 'spec_helper'

describe "EventsPages" do

subject { page }

  before { visit events_new_path }

  it { should have_content('Events') }

end
