import React from 'react';
import toast from 'react-hot-toast'; // or your preferred toast lib
import './SubscriptionDurationUnionSelector.css'; // styling in CSS file

const SubscriptionDurationUnionSelector = ({ subscriptiondurationdata, duration, setDuration }) => {
  const handleSelect = (item) => {
    const years = parseInt(item.years || "0");
    const months = parseInt(item.months || "0");
    const weeks = parseInt(item.weeks || "0");
    const days = parseInt(item.days || "0");

    const isValidDailyOnly = days > 0 && years === 0 && months === 0 && weeks === 0;

    if (!isValidDailyOnly) {
      toast.error('Only daily subscription durations are allowed.');
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

export default SubscriptionDurationUnionSelector;
