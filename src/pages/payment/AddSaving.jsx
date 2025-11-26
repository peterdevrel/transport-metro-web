import React, { useEffect, useState } from 'react'
import { useRegister } from '../../Contexts/RegistrationContextProvider'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../../Components/Dropdown'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { toast } from 'react-toastify'
import { useLibrary } from '../../Contexts/LibraryContextProvider'
import { usePayment } from '../../Contexts/PaymentContextProvider'
import { ContainerTitle } from '../../Components/ContainerTitle'
import VirtualAccountCard from '../../Components/VirtualAccountCard'
import { useDedicatedVirtualContext } from '../../Contexts/DedicatedVirtualAccountContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'



const arrayData = [
  {label:'Saving', value: 'saving'},
  {label:'Wallet', value: 'wallet'},
]


const AddSaving = () => {

               
           
    const navigate = useNavigate()
           
      const {
        userdata, 
        profiledata,
        isLoggedIn, 
        setIsLoggedIn, 
        getProfileUser
      } = useAuthContext()
    
    


    const {
        leveldata,
        // getLevelSetupData,
        level, setLevel,
        addDuration
    } = useRegister()



    const {
      amount, setAmount,
      paymenttype, setPaymentType,
      feestype, setFeesType,
      getAllFeeTypeData,
      feesData,
      paymentTypeData,
      getAllPaymentTypesData,
      description, setDescription,
      getAllMyPaymentData, 
      mypaymentData,
      currencyFormat,
      savingPaymentData,
      getAllSavingPaymentData
    } = usePayment()

    const {
        getAllBookCategoryData,  
        libraryCategoryData, 
        getAllBookData,
        librarybookdata,
        formatTimeStamp,
    } = useLibrary()



      const {
        getAccountBalance,
        balance,
        getCustomerDedicatedAccount,
        virtualaccountdata = [],
      } = useDedicatedVirtualContext();
    

      const {getUserWallet} = useCustomer()

    const userId = localStorage.getItem('userId');
    const [isLoading, setIsLoading] = useState(false)
    const [isAgreed, setIsAgreed] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [error, setError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [lessonitem, setLessonItem] = useState(null)
    const [paymentItem, setPaymentItem] = useState(null)
    const [duration, setDuration] = useState("")
    const [typeArray, setTypeArray] = useState("")

     const [modalForm, setModalForm] = useState({
        title: "",
        author: "",
        description: "",
        category_id: "",     // boolean
        available_copies: "",     // boolean
        cover_image: "",     // boolean
    })

    
      
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
            getCustomerDedicatedAccount(),
            getUserWallet()
        ]);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    } finally {
        setIsLoading(false);
    }
    };

      
      // getLevelSetupData()
      getAllFeeTypeData()
      getAllPaymentTypesData()
      getAllMyPaymentData()
      getAllSavingPaymentData()
      fetchAllData();
    }, []);


  // extract virtual account data safely
  const virtualdata = virtualaccountdata?.[0];
    


      const handleChange = (event) => {
          const selected = feesData.find(option => option.value === event.target.value);
          setFeesType(selected)
          
      }

      const handleLevelChange = (event) => {
          const selected = leveldata.find(option => option.value === event.target.value);
          setLevel(selected)
          
      }


    const baseAmount = Number(amount); // the amount you want subaccount to get
    let transactionCharge = Math.round(baseAmount * 0.02 + 100);

    // Cap if over ₦200,000
    if (baseAmount >= 200000) {
        transactionCharge = 3000;
    }

    // ✅ Convert each value INDIVIDUALLY to kobo
    const transactionChargeKobo = transactionCharge * 100;
    const totalAmountKobo = (baseAmount + transactionCharge) * 100;


    const now = new Date();
    const nextDue = addDuration(now, duration);

    if (isNaN(nextDue.getTime())) {
        console.error("❌ Invalid nextDue date from duration:", duration);
        throw new Error("Invalid duration: could not calculate next due date.");
    }





const handlePayment = () => {

    setIsLoading(true)
      setTimeout(() => {
              
          const paystack = new PaystackPop();
          paystack.newTransaction({
              key: import.meta.env.VITE_PUBLICK_KEY,
              email: profiledata.email,
              amount: totalAmountKobo,
              label: 'Savings Checkout',
              transaction_charge: transactionChargeKobo,
              channels: ["card"],
              metadata: {
                  email: profiledata.email,
                  custom_saving: true,
                  user_id: profiledata.id,
                  amount: amount,
                  description: description,
                
              },   
              onSuccess: (transaction) => { 
              //   console.log(transaction)
              //   console.log(transaction.reference)
                  toast.success(`Transaction Successful, RefId: ${transaction.reference}`)
                  getAllSavingPaymentData()
                  // navigate('/protected/dashboard')
                   const modalEl = document.getElementById('staticBackdrop');
                   const modal = bootstrap.Modal.getInstance(modalEl);
                   modal.hide();
              },
              onCancel: () => {
                  // user closed popup
                  toast.warn('Payment Popup Closed')
                  setIsLoading(false)
              }
          
          })
          setIsLoading(false)
              
          
      }, 2000)  
}

const fundWallet = () => {

    setIsLoading(true)
      setTimeout(() => {
              
          const paystack = new PaystackPop();
          paystack.newTransaction({
              key: import.meta.env.VITE_PUBLICK_KEY,
              email: profiledata.email,
              amount: totalAmountKobo,
              label: 'Savings Checkout',
              transaction_charge: transactionChargeKobo,
              channels: ["card"],
              metadata: {
                  email: profiledata.email,
                  custom_wallet: true,
                  user_id: profiledata.id,
                  amount: amount,
                  description: description,
                
              },   
              onSuccess: (transaction) => { 
              //   console.log(transaction)
              //   console.log(transaction.reference)
                  toast.success(`Transaction Successful, RefId: ${transaction.reference}`)
                  getAllSavingPaymentData()
                  // navigate('/protected/dashboard')
                   const modalEl = document.getElementById('staticBackdrop');
                   const modal = bootstrap.Modal.getInstance(modalEl);
                   modal.hide();
              },
              onCancel: () => {
                  // user closed popup
                  toast.warn('Payment Popup Closed')
                  setIsLoading(false)
              }
          
          })
          setIsLoading(false)
              
          
      }, 2000)  
}





const PaymentDetailModal = () => {
    return (
    <div>
      <div
        className="modal fade"
        id="bookDetailModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="bookDetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold" id="paymentDetailLabel">
                Payment Receipt
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              {/* TOP SECTION: Amount & Reference */}
              <div className="mb-4 border-bottom pb-3">
                <h4 className="fw-bold">NGN {paymentItem?.amount}</h4>
                <small className="text-muted">
                  Payment Reference: {paymentItem?.reference}
                </small>
              </div>

              {/* PAYMENT INFO */}
              <div className="row mb-4">

                {/* LEFT: Payment Status */}
                <div className="col-md-4 text-center">
                  <div className="border rounded p-4">
                    <h5 className={paymentItem?.last_status === "success" ? "text-success" : "text-danger"}>
                      {paymentItem?.last_status?.toUpperCase() || "PENDING"}
                    </h5>
                    <p className="text-muted">{paymentItem?.payment_type || "N/A"}</p>
                  </div>
                </div>

                {/* RIGHT: Payment Details */}
                <div className="col-md-8">
                  <h6 className="fw-bold mb-3">Payment Information</h6>
                  <p className="mb-1"><strong>User:</strong> {paymentItem?.user?.first_name} {paymentItem?.user?.last_name}</p>
                  <p className="mb-1"><strong>Email:</strong> {paymentItem?.user.email}</p>
                  <p className="mb-1"><strong>Fees Type:</strong> {paymentItem?.fees_type || "N/A"}</p>
                  <p className="mb-1"><strong>Level:</strong> {paymentItem?.level_display || "N/A"}</p>

                  <h6 className="fw-bold mt-3">Description</h6>
                  <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                    {paymentItem?.description.replace(/^<p>|<\/p>$/g, '') || "No description provided."}
                  </p>
                </div>
              </div>

              {/* FOOTER: Timestamps */}
              <div className="border-top pt-3 mt-4">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold mb-0">Created On:</h6>
                  <p className="mb-0">{formatTimeStamp(paymentItem?.createdAt)}</p>
                </div>
               
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


    );
};

   


const AddModalPayment = () => {
    return (
        <div>
            <div className="modal" id="staticBackdrop" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document" style={{ maxWidth: '50%', height: '50vh' }}>
                    <div className="modal-content" style={{ height: '100%' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add funds ? </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                                    {/* Session */}
                    
                          <div className="modal-body" style={{ overflowY: 'auto' }}>
                              <div className="container-fluid">
                                  <div className="row g-3"> {/* g-3 adds spacing between columns */}
                                    
                         

                               <div className="row">
                                        {/* Amount */}

                                         <div className="col-md-6">
                                          <div className="form-group">
                                          <label className="form-label">Funding Type</label>
                                          <Dropdown
                                              className="form-control text-dark"
                                              width="100%"
                                              options={arrayData}
                                              value={typeArray}
                                              onChange={(e) =>
                                              setTypeArray(e.target.value)
                                              }
                                              placeholder={!isFocus ? "Type" : "..."}
                                          />
                                          </div>
                                          </div>

                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">Amount to save</label>
                                            <input 
                                              type="text" 
                                              className="form-control text-dark" 
                                              value={amount}
                                              onChange={(e) => setAmount(e.target.value)}  
                                              placeholder='Enter an Amount to save'                                      
                                            />
                                            {error && amount.length <= 0 && (
                                              <label className='text-danger mt-2'>Amount field is emptied</label>
                                            )}
                                          </div>
                                        </div>

                                       
                                      </div>

                                    <div className="form-group">
                                        <label className="form-label">Comments:</label>
                                        <textarea
                                            className="form-control text-dark"
                                            value={description}           // your state variable
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={4}                   // number of visible rows
                                            placeholder="Enter your payment description here..."
                                        />
                                        {error && comments.length <= 0 && (
                                            <label className="text-danger mt-2">Comments field is empty</label>
                                        )}
                                    </div>

                                   <div
                                      className="d-flex justify-content-center align-items-center"
                                    >
                                      {isLoading ? (
                                        <button type="button" className="btn btn-primary w-50">
                                          Processing....
                                        </button>
                                      ) : (
                                        typeArray === 'saving' ?
                                        <button
                                          type="button"
                                          onClick={() => handlePayment()}
                                          className="btn btn-primary w-50"
                                        >
                                          Add Saving
                                        </button>:
                                        <button
                                          type="button"
                                          onClick={() => fundWallet()}
                                          className="btn btn-primary w-50"
                                        >
                                          Fund Wallet
                                        </button>
                                      )}
                                    </div>

                                      


                                  </div>
                              </div>
                          </div>
                      
                        
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

   



  // =====================================================
  // ========== EXIT EARLY IF LOADING (SAFE NOW) ==========
  // =====================================================
  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <ClipLoader color={Colors.WHITE} size={50} />
  //     </div>
  //   );
  // }



  return (
    <>
    {PaymentDetailModal()}
    {AddModalPayment()}




<ContainerTitle title={'Add Fund'}>


          <div className="row g-3 mb-2">

              <div className="col-3">
              <VirtualAccountCard
                account_number={virtualdata?.account_number}
                account_name={virtualdata?.account_name}
                bank={virtualdata?.bank_name}
                
              />
              
            </div>
              
          
            <p>Welcome, {profiledata?.first_name} </p>
        </div>
        <div className="row g-3">

            <div className="col-lg-9 col-md-8 col-sm-12"> 

              <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      Add Funds
                  </button>
              </div>
              <div className="col-sm-12 mb-5 mt-5">
                <div className="card shadow-sm rounded-4 border-0">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">e-Saving Receipts</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                          <tr>
                            <th>Full Name</th>
                            <th>Amount</th>
                            <th>Status </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(savingPaymentData) && savingPaymentData.length > 0 ? (
                            savingPaymentData.map((item, idx) => (
                              <tr key={idx}>
                                <td>{item?.user?.first_name} {item?.user?.last_name} </td>
                                <td>{currencyFormat(item?.amount)}</td>
                                <td>{item?.verified === true ? "Payment Successful" : "Payment Failed" }</td>

                                <td>
                                  <div className="d-flex gap-2">
                                    
                                    <button className="btn btn-primary">
                                      <i className="fa fa-eye" 
                                          data-toggle="modal" 
                                          data-target="#bookDetailModal" 
                                          onClick={() => setPaymentItem(item)} 
                                      ></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center text-muted">
                                No lecturer users found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                        
                    </div>
                  </div>
                </div>
              </div>

            </div>

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
                    📥 My Digial ID
                  </button>

                  

                  


                

                </div>
              </div>

            </ul>
          </div>

        </div>

</ContainerTitle>




    </>

  )
}

export default AddSaving