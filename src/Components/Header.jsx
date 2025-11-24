import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Contexts/UserContextProvider'

import { ClipLoader } from 'react-spinners'; // Or any other spinner
import { useTranslation } from 'react-i18next'




function Header() {

  const { t, i18n } = useTranslation();
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuToggle = () => {
  const wrapper = document.querySelector(".main-wrapper");
  wrapper.classList.toggle("menu-toggle");
  setMenuActive(!menuActive);
};


 const navigate = useNavigate()
  
    const {
      profiledata, 
      getProfileUser, 
      isLoggedIn, 
      setIsLoggedIn, 
      userdata, 
      setUserData, 
      logout, 
      setProfileData
    } = useAuthContext()

  

  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userdata) {
          setIsLoggedIn(true);
          const fetchData = async () => {
            await getProfileUser(userdata.user_id, userdata.access);
            setLoading(false); // Set loading to false after data is fetched
          };
          fetchData();
        }
      }, [userdata]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="loading-container">
                <ClipLoader color="#000" size={50} />
                <p className="mt-3 text-muted">Please wait...</p>
                </div>
            </div>
        );
      }




 const logOut = async () => {
    try {
        await logout();  // Wait for API logout to complete

        // Clear all client-side state and localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('access');
        localStorage.clear();
        setUserData(null);
        setProfileData(null);
        setIsLoggedIn(false);

        navigate('/');    // Redirect after logout
        window.location.reload();  // Optional: reload page if you need fresh state
    } catch (error) {
        console.error("Logout failed:", error);
        // Optionally still clear local stuff and redirect on error
    }
    };

  return (

    <>
  <div className="nav-header">
    <a href="index.html" className="brand-logo">
      <img className="logo-abbr" src="/images/logo-white-2.png" alt />
      <img className="logo-compact" src="/images/logo-text-white.png" alt />
      <img className="brand-title" src="/images/logo-text-white.png" alt />
    </a>

    {/* Hamburger menu */}
        <div className="nav-control" onClick={handleMenuToggle}>
          <div className={`hamburger ${menuActive ? "is-active" : ""}`}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
  </div>
  <div className="header">
    <div className="header-content">
      <nav className="navbar navbar-expand">
        <div className="collapse navbar-collapse justify-content-between">

          <div className="header-left">
            <div className="search_bar dropdown">
              <span className="search_icon p-3 c-pointer" data-toggle="dropdown">
                <i className="mdi mdi-magnify" />
              </span>
              <div className="dropdown-menu p-0 m-0">
                <form>
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </div>
            </div>
          </div>
          <ul className="navbar-nav header-right">
           
            <li className="nav-item dropdown header-profile">
              <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                <img src="/images/profile/education/pic1.jpg" width={20} alt />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a href="app-profile.html" className="dropdown-item ai-icon">
                  <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                  <span className="ml-2">Profile </span>
                </a>
                <a href="email-inbox.html" className="dropdown-item ai-icon">
                  <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span className="ml-2">Inbox </span>
                </a>
                <a 
                  type='button'
                  onClick={() => {
                         logOut()
                  }} className="dropdown-item"> 
                  <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>
                  <span className="ml-2">Logout </span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

    </>

  )
}

export default Header