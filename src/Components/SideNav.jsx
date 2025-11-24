import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Colors from '../Utils/Colors'
import { useAuthContext } from '../Contexts/UserContextProvider'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SideNav = () => {

 const { t, i18n } = useTranslation();
  const navigate = useNavigate()


  const userId = localStorage.getItem('userId')
  const access = localStorage.getItem('access')

   const {
    userdata, 
    profiledata,
    isLoggedIn, 
    setIsLoggedIn, 
    getProfileUser
  } = useAuthContext()

  useEffect(() => {
    if(!userId || !access){
      navigate('/unathorised')
    }else{
      setIsLoggedIn(true)
      getProfileUser(userId)
    }
  
  }, [])
  
  
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{backgroundColor: Colors.LIGHT_GREEN}}>
    <ul className="nav">
      <li className="nav-item">
        <Link to={`/protected/dashboard`} className="nav-link" >
          <i className="icon-grid menu-icon" />
          <span className="menu-title">{t('dashboard')}</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/biodata'} className="nav-link" >
          <i className="fa fa-user menu-icon" />
          <span className="menu-title">{t('biodata')}</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/support'} className="nav-link" >
          <i className="fa fa-support menu-icon" />
          <span className="menu-title">{t('support')}</span>
        </Link>
      </li>
      {/* <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <i className="icon-layout menu-icon" />
          <span className="menu-title">e-Support</span>
          <i className="menu-arrow" />
        </a>
        <div className="collapse" id="ui-basic">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Pin Issuance</a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Transfer</a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Transactions</a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Job Vacancy</a></li>
          </ul>
        </div>
      </li> */}
     
    </ul>
  </nav>
  )
}

export default SideNav