require 'spec_helper'

describe Event do

    before { @event = Event.new(event: "say", operator: "==") }

      subject { @event }

        it { should respond_to(:event) }
        it { should respond_to(:operator) }
end
