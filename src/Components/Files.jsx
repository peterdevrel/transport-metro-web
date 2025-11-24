import React from 'react'

const Files = ({className, width, name, onChange, label, value, height}) => {
  return (
    <div className={`w-${width} h-${height} ` }>
        {/* <label className='d-flex pt-3'>
          {label}
        </label> */}
        <input 
            type='file' 
             name={name}
            className={className}  
            onChange={onChange}  
            value={value}        
            required
        />
    </div>
  )
}

export default Files