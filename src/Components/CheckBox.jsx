import React from 'react'


const CheckBox = ({ label, value, onChange }) => {
    return (
    <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <div className="form-check">
                
                <label>
                    <input type="checkbox" checked={value} onChange={onChange} /> &nbsp;
                    {label}
                </label>
                {value ?                
                    <p>Value successfully checked! {value.toString()}</p>: ""
                }
            </div>
          </div>
        </div>
    </div>
    );
  };

export default CheckBox