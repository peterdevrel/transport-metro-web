import React, { useEffect, useState } from 'react'
import Body from '../../Components/Body'
import Main from '../../Components/Main'
import SettingsPanel from '../../Components/SettingsPanel'
import SideNav from '../../Components/SideNav'
import WelcomeGreetingHeader from '../../Components/WelcomeGreetingHeader'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
// import PaystackPop from '@paystack/inline-js';
import Colors from '../../Utils/Colors'
import Dropdown from '../../Components/Dropdown'
import { toast } from 'react-toastify'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import { useTranslation } from 'react-i18next';
import SubscriptionDurationThreeMonthSelector from '../../Components/SubscriptionDurationThreeMonthSelector'
import HeaderTitle from '../../Components/HeaderTitle'
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../components/WalletCard'
import { ClipLoader } from 'react-spinners'



const cardTypeData = [
    {label: 'Diamond', value: 'diamond'},
    {label: 'Gold', value: 'gold'},
    {label: 'Basic', value: 'basic'},
    
  ]

const statusTypeData = [
    {label: 'New', value: 'new'},
    {label: 'Stolen', value: 'stolen'},
    {label: 'Damage', value: 'damage'},
  ]
  


const PhysicalCard = () => {

    const { t, i18n } = useTranslation();
 
    useEffect(() => {
        const script = document.createElement("script")
    
        script.src = 'https://js.paystack.co/v2/inline.js';
        script.async = true;
    
        document.body.appendChild(script)
        
    },[])
    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access')


    const { 
      formatTimeStamp, currencyFormat,
      getCardApplication,
      cardApplication,
    } = useServiceContext()

    const [isLoading, setIsLoading] = useState(true)
    const [itemdata, setItemData] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [subaccount, setSubAccount] = useState("")
    const [address, setAddress] = useState("")
    const [deliverylga, setDeliveryLga] = useState("")
    const [cardType, setCardType] = useState("")
    const [status, setStatus] = useState("")
    const [mobile, setMobile] = useState("")
    const [duration, setDuration] = useState("")
    

    const {
        subscriptiondurationdata,
        getSubscriptionDuration,
        addDuration,
        getCardSubAccountData,
        cardSubAccountData,
        getUserRole,
        userroledata
    } = useCustomer()

    const {userdata, profiledata, getProfileUser} = useAuthContext()


    useEffect(() => {
    if(!userId || !access){
        navigate('/unathorised')
    }
    }, [])


    

    // console.log(park?.id)
  
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);

    try {
      await Promise.all([
        getCardApplication(),
        getCardSubAccountData(),
        getSubscriptionDuration(),
        getProfileUser(userdata.user_id),
        getUserRole()
      ]);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false); // ✅ Always runs
    }
  };

  fetchData();
}, []);


    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    
    
    const filteredUsers = cardApplication.filter(user =>
        user?.email?.toLowerCase().includes(search.toLowerCase()) 
    );
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentData = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);



     const handleChange = (event) => {
        const selected = cardSubAccountData.find(option => option.value === event.target.value);
        setSubAccount(selected)     
    }


    const Validate = () => {
            if (itemdata.amount === 0 || itemdata.plateno === "") {
              toast.warn('Some fields are empty or there is a network issue.');
              return;
            } 
            if (subaccount.value !== 'fine-account') {
              toast.warn('You choose the wrong account.');
              return;
            } 
    }



        const now = new Date();
        const nextDue = addDuration(now, duration);

        if (isNaN(nextDue.getTime())) {
            console.error("❌ Invalid nextDue date from duration:", duration);
            throw new Error("Invalid duration: could not calculate next due date.");
        }



        const baseAmount = Number(subaccount.amount); // the amount you want subaccount to get
        let transactionCharge = Math.round(baseAmount * 0.02 + 100);

        // Cap if over ₦200,000
        if (baseAmount >= 200000) {
            transactionCharge = 3000;
        }

        // ✅ Convert each value INDIVIDUALLY to kobo
        const transactionChargeKobo = transactionCharge * 100;
        const totalAmountKobo = (baseAmount + transactionCharge) * 100;




         const makePayment = () => {  
            
        
        
            if(deliverylga === "" || address === "" || mobile === "" || status === "" || cardType === "" || subaccount === ""){
                toast.warn('Delivery address or Delivery LGA is missing')
                return
            }
            if (!duration || Object.keys(duration).length === 0) {
                toast.warn('Maintenance Duration is empty');
                return;
            }
            try {
                
                setTimeout(() => {
                      
                  setIsLoading(true)
                  const paystack = new PaystackPop();
                  paystack.newTransaction({
                      key: import.meta.env.VITE_PUBLICK_KEY,
                      email: profiledata.email,
                      amount: totalAmountKobo,
                      subaccount: subaccount.subaccount ? subaccount?.subaccount : "", 
                      channels: ["card"],
                      label: 'Neighbourhood Checkout',
                      transaction_charge: transactionChargeKobo,
                      metadata: {
                          custom_physicalcard: true,
                          user_id: profiledata.id,
                          deliverylga: deliverylga,
                          address: address,
                          mobile: mobile,
                          status_type: status,
                          card_type: cardType,
                          amount:subaccount?.amount,
                          subaccount:subaccount?.id,
                          maintenance_fee:subaccount?.maintenance_fee,
                          last_payment_date: now.toISOString(),
                          next_due_date: nextDue.toISOString(),  // ✅ now safe
                    },  
                      onSuccess: (transaction) => { 
                        //   console.log(transaction)
                        //   console.log(transaction.reference)
                        if(transaction.reference){
                            toast.success(`Transaction Successful, RefId: ${transaction.reference}`)
                            getCardApplication()
                            getCardSubAccountData()
    
                        }else{
                            toast.warn('Something went wrong')
                            setIsLoading(false)
                        }
                          
                         
                      },
                      onCancel: () => {
                          // user closed popup
                          toast.warn('Payment Popup Closed')
                          setIsLoading(false)
                      }
                  
                  })
                  setIsLoading(false)
                      
                   
              }, 2000)  
            } catch (error) {
                console.log(error.message)
            }
       
      }



  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={Colors.WHITE} size={50} />
      </div>
    );
  }


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

                          

       
              <div className="row">

                <div className="form-group col-12 col-md-4 mb-3">
                  <Dropdown
                    label="Account to Pay In"
                    className="form-control text-dark"
                    width={60}
                    options={cardSubAccountData}
                    value={subaccount?.value || ''}
                    onChange={handleChange}
                    placeholder="an Account"
                  />
                </div>

                <div className="form-group col-12 col-md-4 mb-3">
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Delivery Local Govt"
                    value={deliverylga}
                    onChange={(e) => setDeliveryLga(e.target.value)}
                  />
                </div>

                <div className="form-group col-12 col-md-4 mb-3">
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="form-group col-12 col-md-4 mb-3">
                  <Dropdown
                    label="Card Status"
                    className="form-control text-dark"
                    width={60}
                    options={statusTypeData}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Card Status"
                  />
                </div>

                <div className="form-group col-12 col-md-4 mb-3">
                  <Dropdown
                    label="Card Type"
                    className="form-control text-dark"
                    width={60}
                    options={cardTypeData}
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    placeholder="Card Type Account"
                  />
                </div>

                <div className="form-group col-12 col-md-4 mb-3">
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>

              </div>


                <div className="form-group col-sm-4 mt-2">
                <SubscriptionDurationThreeMonthSelector
                    subscriptiondurationdata={subscriptiondurationdata}
                    duration={duration}
                    setDuration={setDuration}
                />
            </div>
        
            {/* {subaccount && (
                <div>
                    <h3>Your Selected Category Details:</h3>
                    <p><strong>Account Name Selected:</strong> {subaccount.value}</p>
                    <p><strong>SubAccount:</strong> {subaccount.subaccount}</p>
                    <p><strong>SubAccount:</strong> {subaccount.amount}</p>
                </div>
            )} */}
        </div>
        <div className="modal-footer">
           <button 
              type="button"
              onClick={() => makePayment()}
              className="btn btn-primary w-50 mx-auto"
              >
                    Pay
            </button>
        </div>
      </div>
    </div>
  </div>



</div>

  )
}


return (
    <>
  {Modal()}
  <ContainerTitle title={'Card Services'}>


      <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="Card Service"/>
        </div>
        
    
        <p>Welcome, {profiledata?.first_name} </p>
      </div>


      <div className="row g-3">

       <div className="col-lg-9 col-md-8 col-sm-12">
        
          <div className="col-sm-12 mb-3 mb-sm-0 mb-5">

            
          <div className="card shadow-sm rounded-4 border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Card Listing</h5>
              </div>
              <div className="card-body">

                    {/* 🔍 Search Input */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset to first page
                }}
              />
            </div>



              <div className="table-responsive">
                  <table className="table">
                  <thead>
                      <tr>
                      <th>Email.</th>
                      <th>Status.</th>
                      <th>Type.</th>
                      <th>Address.</th>
                      <th>Delivered.</th>
                      <th>Print.</th>
                      <th>Paid.</th>
                      <th>Created At.</th>
                      {/* <th>Updated At.</th> */}
                      
                      </tr>
                  </thead>
                  <tbody>
                  {currentData.length > 0 ? (
                      currentData
                      .map((item, index) => (
                          
                          <tr key={index}>
                              <td>{(item.email)}</td>
                              <td>{item?.status_type}</td>
                              <td>{item?.card_type}</td>
                              <td>{item.delivery_address}</td>
                              <td>{item.physical_card_delivered}</td>
                              <td>{item.printed ? 'Printed' : 'Not Printed'}</td>
                              <td>{item.paid ? "Paid" : "Failed"}</td>
                              <td>{formatTimeStamp(item.createdAt)}</td>
                              {/* <td>{formatTimeStamp(item.updatedAt)}</td> */}
                              
                          </tr>

                      ))
                  ):(
                      <tr>
                      <td colSpan="8" className="text-center text-muted">
                        No Card Payment found.
                      </td>
                    </tr>
                  )
                  }
                  </tbody>
              </table>


                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-muted">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>


              </div>
              </div>
          </div>
          </div>
        </div>


          {/* RIGHT SIDE — 4 COLUMNS (SCROLLABLE TRANSACTIONS) */}
        <div className="col-lg-3 col-md-4 col-sm-12">
      
         
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
                      📥 Apply for Card
                    </button>

                    <button
                      onClick={() => navigate('/qr/payment/transaction')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 QR Transactions
                    </button>

                    <button
                      onClick={() => navigate('/dispute/resolution')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Dispute Resolution
                    </button>


                    <button
                      onClick={() => navigate('/digital/id')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 My ID Card
                    </button>

                    <button
                      onClick={() => navigate('/support')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Create Pin
                    </button>

                    {/* <button
                      onClick={() => navigate('/scan/card/payment')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Scan & Pay
                    </button> */}


                    <button
                      onClick={() => navigate('/pay/with/digital/id')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Pay with ID
                    </button>
                  

                  {userroledata[0]?.cardManager && (
                    <button
                      onClick={() => navigate('/transport/recipient')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Create Transport Recipient
                    </button>
                  )}


                  { userroledata[0]?.payTerminalManager && (
                    <button
                      onClick={() => navigate('/transer/with/digital/id')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Transfer with ID
                    </button>
                  )}

                { userroledata[0]?.cardVerifierManager && (
                    <button
                      onClick={() => navigate('/verify/digital/id')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Verify ID
                    </button>
                  )}

                  {userroledata[0]?.cardManager && (
                    
                    <button
                      onClick={() => navigate('/all/card/list')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 All Cards Applicant
                    </button>
                  )}

                  {userroledata[0]?.cardManager && (
                    
                    <button
                      onClick={() => navigate('/digital/user/list')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Download Card
                    </button>
                  )}

                    


                  

                  </div>
                </div>

              </ul>
           

        </div>
          
</div>
        

    </ContainerTitle>          
    </>
  )
}

export default PhysicalCard