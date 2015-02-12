FactoryGirl.define do
  factory :event do
    event     "say"
    type    "=="
  end

  factory :action do
    action     "talk"
    param    "1"
  end
end
