import React, { useEffect, useState } from 'react'
import SidebarItem from './SidebarItem'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Contexts/UserContextProvider'
import { useCustomer } from '../Contexts/CustomerContextProvider'



function Sidebar() {

    const navigate = useNavigate()

    const {getPageStatus,setIsLoggedIn, profiledata, getProfileUser, page} = useAuthContext()
    const {   getUserRole, userroledata} = useCustomer()

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      const userId = localStorage.getItem('userId');
      const access = localStorage.getItem('access');
    
      if (!userId || !access) {
        navigate('/unauthorized');
        return;
      }
    
      setIsLoggedIn(true);
    
      const fetchAllData = async () => {
        try {
          await Promise.all([
            getProfileUser(userId),
            // getPageStatus(),
        ]);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    } finally {
        setIsLoading(false);
    }
};
      getUserRole()
      getPageStatus()
      fetchAllData();
    }, []);




  return (
    <div className="dlabnav">
        <div className="dlabnav-scroll">
            <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>
            <li>
                <Link className="ai-icon" to={'/protected/dashboard'} aria-expanded="false">
                    <i className="la la-home" />
                    <span className="nav-text">Dashboard</span>
                </Link> 
            </li>


            {profiledata.user_option === "admin" && (
                <li>
                    <Link className="ai-icon" to="/register" aria-expanded="false">
                    <i className="la la-user" />
                    <span className="nav-text">Create User</span>
                    </Link>
                </li>

            )}
          {(profiledata.user_option === "admin" || profiledata.user_option === "lecturer") && (
            <SidebarItem title="Lecturer" icon={<i className="la la-user"></i>}>
                <ul aria-expanded="false">
                <li><Link to={'/lecturer/list'}>All Lecturer</Link> </li>
                </ul>
            </SidebarItem>
          )}

            {(profiledata.user_option === "admin" || profiledata.user_option === "staff") && (
                <SidebarItem title="Staff" icon={<i className="la la-users"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/staff/list'}>All Staff</Link> </li>
                    </ul>
                </SidebarItem>
            )}


             {(profiledata.user_option === "admin" || profiledata.user_option === "student") && (
                <SidebarItem title="Students" icon={<i className="la la-users"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/student/list'}>All Student</Link> </li>
                    <li><Link to={'/course/registration'}>Course Registration</Link> </li>
                    <li><Link to={'/student/lesson'}>My Lesson</Link> </li>
                    <li><Link to={'/student/assignment'}>My Assignment</Link> </li>
                    </ul>
                </SidebarItem>
             )}


              {(profiledata.user_option === "admin" || profiledata.user_option === "lecturer") && (
                <SidebarItem title="Lesson" icon={<i className="la la-graduation-cap"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/lesson/registration'}>Add Lesson</Link></li>
                    </ul>
                </SidebarItem>
              )}

               {(profiledata.user_option === "admin" || profiledata.user_option === "lecturer") && (
                <SidebarItem title="Assignment" icon={<i className="la la-graduation-cap"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/add/assignment'}>Add Assignment</Link></li>
                    </ul>
                </SidebarItem>
               )}

                <SidebarItem title="e-Library" icon={<i className="la la-book"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/add/book'}>Books</Link> </li>
                    <li><Link to={'/borrowed/book'}>Borrowed Book</Link> </li>
                    </ul>
                </SidebarItem>
      
                <SidebarItem title="CBT" icon={<i className="la la-dollar"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/exam/list'}>Exam Listing</Link></li>
                    <li><Link to={'/result/list'}>Result</Link></li>
                    </ul>
                </SidebarItem>
               
                <SidebarItem title="Fees" icon={<i className="la la-dollar"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/add/payment'}>Online Payment</Link></li>
                    <li><Link to={'/cash/payment'}>Cash Payment</Link></li>
                    <li><Link to={'/transfer'}>Transfer</Link></li>
                    </ul>
                </SidebarItem>


             {(profiledata.user_option === "admin" || profiledata.user_option === "student") && (
                <SidebarItem title="Savings" icon={<i className="la la-dollar"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/add/saving'}>Add Savings</Link></li>
                    <li><Link to={'/saving'}>Savings Account</Link></li>
                    </ul>
                </SidebarItem>
             )}


            <SidebarItem title="Card Services" icon={<i className="la la-dollar"></i>}>
                <ul aria-expanded="false">
                <li><Link to={'/physical/card/application'}>Card Application</Link></li>
                <li><Link to={'/digital/id'}>My Digital ID</Link></li>

                {userroledata[0]?.cardVerifierManager && (
                    <li><Link to={'/verify/digital/id'}>Verify Card</Link></li>
                )}

                
                    <>
                    {/* <li><Link to={'/idcard/upload'}>ID Upload</Link></li> */}
                    <li><Link to={'/pay/with/digital/id'}>Scan and Pay</Link></li>
                    
                       {userroledata[0]?.payTerminalManager && (
                        <>
                            <li><Link to={'/scan/and/pay'}>Pay Terminal</Link></li>
                            <li><Link to={'/qr/payment/transaction'}>QR Transaction</Link></li>
                        </>
                       )}
                     {userroledata[0]?.cardManager && (
                        <>
                        <li><Link to={'/digital/user/list'}>Digital ID User List</Link></li>
                        </>
                     )}
                    </>
          
                </ul>
            </SidebarItem>

                {userroledata[0]?.payTerminal && profiledata.user_option === "admin" && (
                    <SidebarItem title="Transport Recipient" icon={<i className="la la-dollar"></i>}>
                        <ul aria-expanded="false">
                        <li>
                            <Link to={'/transport/recipient'}>Transport Recipient</Link>
                        </li>
                        </ul>
                    </SidebarItem>
                )}

              {(profiledata.user_option === "admin") && (
                <SidebarItem title="Configs" icon={<i className="la la-book"></i>}>
                    <ul aria-expanded="false">
                    <li><Link to={'/page'}>Page</Link></li>
                    </ul>
                </SidebarItem>
              )}

            <SidebarItem title="Support" icon={<i className="la la-book"></i>}>
                <ul aria-expanded="false">
                <li><Link to={'/support'}>Support</Link></li>
                </ul>
            </SidebarItem>

            <li>
                <a className="ai-icon" href="event-management.html" aria-expanded="false">
                <i className="la la-calendar" />
                <span className="nav-text">Event Management</span>
                </a>
            </li>

    
            </ul>
        </div>
    </div>
  )
}

export default Sidebar