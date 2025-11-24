import React, { useEffect, useState, useRef } from 'react'
import Body from '../Components/Body'
import SettingsPanel from '../Components/SettingsPanel'
import SideNav from '../Components/SideNav'
import Main from '../Components/Main'
import { useNavigate } from 'react-router-dom'
import WelcomeGreetingHeader from '../Components/WelcomeGreetingHeader'
import { useAuthContext } from '../Contexts/UserContextProvider'
import { useServiceContext } from '../Contexts/ServiceContextProvider'
import { useDedicatedVirtualContext } from '../Contexts/DedicatedVirtualAccountContextProvider'
import { useCustomer } from '../Contexts/CustomerContextProvider'
import Colors from '../Utils/Colors'
import CustomIDCard from './CustomIDCard'
import { useTranslation } from 'react-i18next';





const DigitalID = () => {

    const { t, i18n } = useTranslation();


  const navigate = useNavigate()


  const {
    userdata, 
    profiledata,
    isLoggedIn, 
    setIsLoggedIn, 
    getProfileUser,
    totalwalletbalanceinvault,
    getTotalWalletInVault,
    getPageStatus,
    page,
    isAuthenticated, setIsAuthenticated,
    login,
    logout,
    maskEmail
  } = useAuthContext()


  const {
    userwalletamount,
    getUserWallet,
    getUserRole,
    userroledata,
    userloanwalletdata,
    userWalletWithdrawAmountData,
    getUserLoanWallet,
    getCustomerSubscriptionByExpire,
    datasub, setDataSub
} = useCustomer()

const { 
  formatTimeStamp, currencyFormat
  } = useServiceContext()

  const {getAccountBalance,balance} = useDedicatedVirtualContext()
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleMenuItems, setVisibleMenuItems] = useState([]);

  
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const access = localStorage.getItem('access');
    const usercid = localStorage.getItem('usercid');
  
    if (!userId || !access) {
      navigate('/unauthorized');
      return;
    }
  
    setIsLoggedIn(true);
  
    // Wait for all async calls
    const fetchAllData = async () => {
      try {
        await getProfileUser();
        await getUserWallet();
        await getUserRole();
        await getAccountBalance();
        await getTotalWalletInVault();
        await getPageStatus(access);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAllData();
  }, []);



useEffect(() => {
  if (profiledata?.id) {
    getUserLoanWallet(profiledata.id);
  }
}, [profiledata?.id]);

useEffect(() => {
  if (profiledata?.customer_id) {
    getCustomerSubscriptionByExpire(profiledata.customer_id);
  }
}, [profiledata?.customer_id]);

  if (isLoading) {
      return (
          <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="loading-container">
              <ClipLoader color="#000" size={50} />
              </div>
          </div>
      );
    }

// console.log('balance', balance)


  


useEffect(() => {
  const handleContextmenu = e => {
      e.preventDefault()
  }
  document.addEventListener('contextmenu', handleContextmenu)
  return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
  }
}, [ ])







  return (
    <>

    <Body>
        <SettingsPanel />
        <SideNav />
        <Main>
        <div className="content-wrapper" style={{backgroundColor: Colors.WHITE}}>
        <WelcomeGreetingHeader name={profiledata?.last_name !== 'undefined' ? profiledata?.last_name : 'Guest' } icon={'fa fa-chevron-circle-left fs-30'} onClickBack={() => navigate(-1)} />
         <p className="fs-30">{t('digitalid')}</p>



        <CustomIDCard 
          cardTitle={'Neighbourhood Digital Identity e-Card '}
          government={`Government of ${profiledata.state} State`}
          nimc_no={profiledata?.nimc_no}
          image={import.meta.env.VITE_BASE_URL_IMAGE + profiledata?.profile_pic}
          first_name={profiledata?.first_name}
          last_name={profiledata?.last_name}
          middle_name={profiledata?.middle_name}
          lga={profiledata?.lga}
          sex={profiledata?.sex}
          phone={profiledata?.mobile}
          joined={formatTimeStamp(profiledata?.date_joined)}
        />
 
      </div>
        </Main>
    </Body>

      
    </>

  )
}

export default DigitalID