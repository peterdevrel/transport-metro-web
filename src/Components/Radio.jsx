import React from 'react'

function Radio({name, value, title, onChecked, onChange, placeholder, style}) {
  return (
    <div className='d-flex flex-row align-items-center'>

        <label>
            <input 
            type='radio'
            name={name}
            value={value}
            checked={onChecked}
            onChange={onChange}
            style={style}
            placeholder={placeholder}
            /> &nbsp; &nbsp;
            
            {title}
        </label>
        
    </div>
  )
}

export default Radio