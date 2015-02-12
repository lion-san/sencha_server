require 'spec_helper'

describe Action do

    before { @event = Action.new(action: "talk", param: "hoge") }

      subject { @event }

        it { should respond_to(:action) }
        it { should respond_to(:param) }
end
