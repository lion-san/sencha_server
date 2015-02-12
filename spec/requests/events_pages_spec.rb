require 'spec_helper'

describe "EventsPages" do
  describe "Event New" do
    it "should have the content 'Events'" do
      visit '/events/new'
      expect(page).to have_content('Events')
    end
  end
end
