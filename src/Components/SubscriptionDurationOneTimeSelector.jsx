import React from 'react';
import toast from 'react-hot-toast';
import './SubscriptionDurationUnionSelector.css';

const SubscriptionDurationOneTimeSelector = ({
  subscriptiondurationdata,
  duration,
  setDuration,
}) => {

    
  const handleSelect = (item) => {
    const years = parseInt(item.years || '0', 10);
    const months = parseInt(item.months || '0', 10);
    const weeks = parseInt(item.weeks || '0', 10);
    const days = parseInt(item.days || '0', 10);

    const isOneTimePayment =
      years === 0 && months === 0 && weeks === 0 && days === 0;

    if (!isOneTimePayment && !item.is_one_time) {
      toast.error('Only one-time payment options are allowed.');
      return;
    }

    setDuration(item);
  };

  return (
    <div className="duration-wrapper">
      {Array.isArray(subscriptiondurationdata) &&
        subscriptiondurationdata.map((item) => {
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

export default SubscriptionDurationOneTimeSelector;
