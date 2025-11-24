import React from 'react';
import toast from 'react-hot-toast';          // or any toast library you use
import './SubscriptionDurationUnionSelector.css'; // your CSS

const SubscriptionDurationAdvertisementSelector = ({
  subscriptiondurationdata,
  duration,
  setDuration,
}) => {
  const handleSelect = (item) => {
    const years  = parseInt(item.years  || '0', 10);
    const months = parseInt(item.months || '0', 10);
    const weeks  = parseInt(item.weeks  || '0', 10);
    const days   = parseInt(item.days   || '0', 10);

    // ✅ allow *only* weekly durations (e.g., 1 week, 2 weeks, …)
    const isValidWeeklyOnly =
      weeks > 0 && years === 0 && months === 0 && days === 0;

    if (!isValidWeeklyOnly) {
      toast.error('Only weekly subscription durations are allowed.');
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

export default SubscriptionDurationAdvertisementSelector;
