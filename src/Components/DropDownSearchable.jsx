import React, { useState, useEffect, useRef } from 'react';

const DropdownSearchable = ({ label, value, width = 'full', placeholder, className, options, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const containerRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { value: option.value } });
    setSearchTerm(option.label);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-${width}`} ref={containerRef}>
      <label className='d-flex pt-3'>{label}</label>
      <input
        type="text"
        value={searchTerm}
        placeholder={`Select ${placeholder}`}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        className={className}
      />

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded max-h-40 overflow-y-auto mt-1">
          {filteredOptions.length === 0 ? (
            <li className="p-2 text-gray-500">No options found</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSearchable;
