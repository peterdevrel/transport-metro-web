import React from 'react'
import { useTranslation } from 'react-i18next'
import Colors from '../Utils/Colors';




const GoBack = ({name, id, icon, onClickBack, email}) => {


   const { t, i18n } = useTranslation();


   
  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="row">
          <div className="col-12 col-xl-8 mb-4 mb-xl-0">
            <div className='d-flex justify-space-between align-items-center'>

                {icon    ?         
                    <i type='button' onClick={onClickBack}  style={{ color:Colors.PRIMARY, fontSize: '30px', cursor: 'pointer' }} className={icon} aria-hidden="true"></i> : ""
                }
            </div>
                  {/* <h6 className="font-weight-normal ml-2 mb-2">Email: {email}</h6> */}
            {/* <h6 className="font-weight-normal ml-2 mb-0">All systems are running smoothly! You have <span className="text-primary">3 unread alerts!</span></h6> */}
          </div>

        
          
        </div>
      </div>
    </div>
  )
}

export default GoBack