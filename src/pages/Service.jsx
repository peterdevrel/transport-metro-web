import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WalletCard from "../components/WalletCard";
import { useAuthContext } from '../Contexts/UserContextProvider'
import { useServiceContext } from '../Contexts/ServiceContextProvider'
import { useDedicatedVirtualContext } from '../Contexts/DedicatedVirtualAccountContextProvider'
import { useCustomer } from '../Contexts/CustomerContextProvider'
import Colors from '../Utils/Colors'
import { toast } from 'react-toastify'
import Sizes from '../Utils/Sizes'
import { useTranslation } from 'react-i18next'
import Translate from '../Components/Translate'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ContainerTitle } from '../Components/ContainerTitle';

export default function Dashboard() {


const { t, i18n } = useTranslation();

const navigate = useNavigate()


  const {
    userdata, 
    profiledata,
    setIsLoggedIn, 
    getProfileUser,
    page,
    maskEmail,
    formatMoney,
    fetchUserCounts,
    userCounts
  } = useAuthContext()



  const {
    userwalletamount,
    getUserWallet,
    getUserRole,
    userroledata,
    getTransactionSuccessful,
    transactionSuccessfulData,
} = useCustomer() || {}




const { 
  formatTimeStamp,
  currencyFormat
  } = useServiceContext()

  const {
    getAccountBalance,
    balance,   
    getCustomerDedicatedAccount, 
    virtualaccountdata,
  } = useDedicatedVirtualContext()

  
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleMenuItems, setVisibleMenuItems] = useState([]);

  
  
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
        getUserWallet(),
        // getPageStatus(),
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchUserCounts()
  
  // getCustomerDedicatedAccount()
  fetchAllData();
}, []);


// console.log(userCounts)

//  console.log('userwalletamount', userwalletamount[0]?.balance)
// If virtualaccountdata is already an array:
const virtualdata = virtualaccountdata[0];

//  If virtualaccountdata is a Set or iterable:
//  const virtualdata = Array.from(virtualaccountdata)[0];




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





const Modal = () => {
  return (<div>
  <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Create Card</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
         
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
        </div>
      </div>
    </div>
  </div>



</div>

  )
}


  return (

    <ContainerTitle title={'Card Services'}>
      {Modal()}
      {/* === WALLET ROW (UNCHANGED) === */}
      <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="Card Service"/>
        </div>
        
    
        <p>Welcome, {profiledata?.first_name} </p>
      </div>

      {/* === NEW ROW === */}
      <div className="row g-3">

        {/* LEFT SIDE — 8 COLUMNS */}
        <div className="col-lg-8 col-md-8 col-sm-12">

 
          {/* You can add charts or analytics here later */}
          <div className="p-4" style={{ background: "#111", borderRadius: "15px" }}>
            <p>More dashboard content here…</p>
          </div>

        </div>

        {/* RIGHT SIDE — 4 COLUMNS (SCROLLABLE TRANSACTIONS) */}
        <div className="col-lg-4 col-md-4 col-sm-12">
      
         
              <ul className="list-group">
                   {/* ==== ROUNDED MOBILE-STYLE MENU ==== */}
                <div
                  style={{
                    background: "#0d0d0d",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 4px 15px rgba(255,255,255,0.05)",
                    marginBottom: "20px",
                  }}
                >
                  <h5 className="mb-3">Quick Menu</h5>

                  <div className="d-flex flex-column gap-2">

                    <button
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                      data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                    >
                      📥 Create Card
                    </button>

                    <button
                      
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Add Money
                    </button>

                    


                  

                  </div>
                </div>

              </ul>
           

        </div>

      </div>

    </ContainerTitle>

  );
}
