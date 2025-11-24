import React from 'react'
import { useTranslation } from 'react-i18next'




const WelcomeGreetingHeader = ({name, id, icon, onClickBack, email}) => {


   const { t, i18n } = useTranslation();


   
  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="row">
          <div className="col-12 col-xl-8 mb-4 mb-xl-0">
            <div className='d-flex justify-space-between align-items-center'>

                {icon    ?         
                    <i type='button' onClick={onClickBack}  style={{ fontSize: '30px', cursor: 'pointer' }} className={icon} aria-hidden="true"></i> : ""
                }
                <h3 className="font-weight-bold ml-5 mt-3">{t('hi')}, {name !== 'undefined' ? name : 'Guest' } | ID: {id !== 'undefined' ? id : 'Guest' }</h3>
            </div>
                  {/* <h6 className="font-weight-normal ml-2 mb-2">Email: {email}</h6> */}
            {/* <h6 className="font-weight-normal ml-2 mb-0">All systems are running smoothly! You have <span className="text-primary">3 unread alerts!</span></h6> */}
          </div>

          <div className="col-12 col-xl-4">
            <div className="justify-content-end d-flex">
              <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                  <h6 className="font-weight-normal ml-2 mb-2">{email}</h6>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default WelcomeGreetingHeader