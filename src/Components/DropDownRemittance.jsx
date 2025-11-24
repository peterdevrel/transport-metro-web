import React from 'react'

const DropdownRemittance = ({label, value, width, placeholder, className, options, onChange}) => {
  return (
    <div className={`w-${width} ` }>
    {/* <label className='d-flex pt-3'>

    {label}
    </label> */}

     <select className={className} value={value} onChange={onChange}>
       <option>Select {placeholder}</option>
        {options.map((option, index) => (
            <option key={index}  value={option.value}>{option.code} - {option.label}</option>
        ))}
     </select>
    </div>
  )
}


export default DropdownRemittance