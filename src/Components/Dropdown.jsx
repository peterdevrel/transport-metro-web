import React from 'react';

const Dropdown = ({ label, value, width, placeholder, className, options, onChange }) => {
  return (
    <div className={`w-${width}`}>
      {/* <label className='d-flex pt-3'>{label}</label> */}
     <select
        className={className}
        value={typeof value === 'string' || typeof value === 'number' ? value : ''}
        onChange={onChange}
      >
        <option value="" disabled>
          Select {placeholder}
        </option>
        {options?.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Dropdown;
