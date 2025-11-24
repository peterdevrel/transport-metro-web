import React from 'react';
import toast from 'react-hot-toast'; // or your preferred toast lib
import './SubscriptionDurationUnionSelector.css'; // styling in CSS file

const SubscriptionDurationTwoMonthSelector = ({ subscriptiondurationdata, duration, setDuration }) => {
  const handleSelect = (item) => {
  const years = Number(item.years || 0);
  const months = Number(item.months || 0);
  const weeks = Number(item.weeks || 0);
  const days = Number(item.days || 0);

  const isExactlyTwoMonths =
    months === 2 && years === 0 && weeks === 0 && days === 0;

  if (!isExactlyTwoMonths) {
    toast.error('Only a duration of exactly 2 months is allowed.');
    return;
  }

  setDuration(item);
};

  return (
    <div className="duration-wrapper">
      {Array.isArray(subscriptiondurationdata) && subscriptiondurationdata.map((item) => {
        const isSelected = duration?.id === item.id;
        return (
          <div
            key={item.id}
            className={`option-container ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSelect(item)}
          >
            <div className="radio-circle">
              {isSelected && <div className="selected-rb" />}
            </div>
            <span className="label-text">{item?.specific}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionDurationTwoMonthSelector;
