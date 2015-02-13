require 'spec_helper'

describe Event do

    before { @event = Event.new(event: "say", operator: "==") }

      subject { @event }

        it { should respond_to(:event) }
        it { should respond_to(:operator) }

      describe "when event is not present" do
        before { @event.event = nil }
        it { should_not be_valid }
      end

      describe "when operator is not present" do
        before { @event.operator = nil }
        it { should_not be_valid }
      end
end
