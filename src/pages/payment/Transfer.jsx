import React, { useEffect, useState } from 'react'
import Body from '../../Components/Body'
import HeaderTitle from '../../Components/HeaderTitle'
import { useRegister } from '../../Contexts/RegistrationContextProvider'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../../Components/Dropdown'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { toast } from 'react-toastify'
import { usePayment } from '../../Contexts/PaymentContextProvider'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import RecipientList from '../../Components/RecipientList'
import { useDedicatedVirtualContext } from '../../Contexts/DedicatedVirtualAccountContextProvider'
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../Components/WalletCard'




const Transfer = () => {

               
           
    const navigate = useNavigate()
           

      const {
        userdata, 
        profiledata,
        isLoggedIn, 
        setIsLoggedIn, 
        getProfileUser,
        sendMessageTransaction
      } = useAuthContext()
 
    const { 
      formatTimeStamp
    } = useServiceContext()


      const {
        createRecipient,
        accountNumber, setAccountNumber,
        currency, setCurrency,
        bankCode, setBankCode,
        bankType, setBankType,
        accountfullname, setAccountFullname,
        currencydata, 
        bankCodedata, 
        bankTypedata, 
        getListAllBanks,
        listbank, setListBank,
        listbankdata, setListBankData,
        getListBanksCurrency,
        getListBanksType,
        getAccountResolveDetail, 
        resolvedata, setResolveData,
        receipientdata,
        createRecipientTransferBackend,
        getRecipientTransferInformation,
        reason, setReason,
        amount, setAmount,
        transferFund,
        getReceiptTransfer,
        finalTransfer,
        pindata, setPinData,
        getPinBackend,
        patchUserWallet,
        userwalletamount,
        getUserWallet,
        getUserWalletDetail,
        userwalletdetaildata,
        TransactionReciept
    } = useCustomer()
    

    
    


    const {
      currencyFormat,
    } = usePayment()
    const {getAccountBalance,balance} = useDedicatedVirtualContext ()
    const userId = localStorage.getItem('userId');
    const access = localStorage.getItem('access');
    const [successtransfer, setSuccessTransfer] = useState(false)
    const [otp, setOtp] = useState("")
    const [otpVisible, setOtpVisible] = useState(false)
    const [error, setError] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [transferdata, setTranferData] = useState(false)
    const [currencyTag, setCurrencyTag] = useState('NGN');

     const [modalForm, setModalForm] = useState({
        title: "",
        author: "",
        description: "",
        category_id: "",     // boolean
        available_copies: "",     // boolean
        cover_image: "",     // boolean
    })

    

    useEffect(() => {
      if(!userId || !access){
          navigate('/unathorised')
      }
    }, [])
    
    
        
    
  useEffect(() => {
  const fetchData = async () => {
    if (profiledata) {
      try {
        await Promise.all([
          getProfileUser(userdata?.user_id, userdata?.access),
          getListBanksType(),
          getListBanksCurrency(),
          getRecipientTransferInformation(),
          getUserWallet(),
          getUserWalletDetail(profiledata?.customer_code),
          getAccountResolveDetail(),
          getAccountBalance()
        ]);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }finally{
        setIsLoading(false)
      }
    } else {
      return;
    }

    try {
      await getListAllBanks(currencyTag);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }

    if (!bankTypedata && currencydata) return;
  };

  fetchData();
}, []);
      
   const recipient = Array.from(receipientdata)

   const clearSearch = () => {
    setAccountNumber("")
    setBankCode("")
    setResolveData([])
  }

  const clearTransferData = () => {
    setAmount("")
    setReason("")
    setIsLoading(false)
  }

const createTransferRecipient = async () => {
  const payload = { 
    type: bankType,
    name: resolvedata?.account_name,
    account_number: resolvedata?.account_number,
    bank_code: bankCode,
    currency: currency,
  };

  setIsLoading(true);

  try {
    const resp = await createRecipient(payload);  // API call to Django
    const response = await resp.json();

    if (response.status === true) {
      toast.success(response.message || "Recipient created successfully");

      // Reset UI state
      setResolveData([]);
      setListBankData([]);
      setAccountNumber("");

      // Refresh recipient list
      getRecipientTransferInformation();
    }
  } 
  catch (error) {
    console.error("Error creating transfer recipient:", error);
    toast.error("Something went wrong. Try again.");
  } 
  finally {
    setIsLoading(false);
  }
};


   const [searchQuery, setSearchQuery] = useState('')
      const searchTransfer = (data) => {
        return data.filter((item) =>
            item?.account_number?.toLowerCase().includes(searchQuery.toLowerCase())||
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
           
        )}

  
    
    const makeTransfer = () => {      
      try {
        if(amount <= 0){
          alert('Amount cannot be less than zero or zero, please top up your wallet')
          setIsLoading(false)
          setAmount('')
          setReason('')
          return          
        }else if(amount <= 90){
          alert('You can only transfer above 100')
          setIsLoading(false)
          setAmount('')
          setReason('')
          return
        }else if(balance <= 0){
          alert('Insufficient fund! Unable to dispense transfer')
          setIsLoading(false)
          setAmount('')
          setReason('')
          return
        }else if(amount >= balance){
          alert('Insufficient fund! Unable to dispense transfer')
          setIsLoading(false)
          setAmount('')
          setReason('')
          return
        }
        else if(amount > userwalletamount[0].balance){
          alert('Insufficient fund')
          setIsLoading(false)
          setAmount('')
          setReason('')
          return
        }else if(userwalletamount[0].balance >= amount){
              setOtpVisible(true)
        }else{
          alert('Please check your input')
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

   
const makeFinalTransfer = () => {
  if (!otp) {
    alert("PIN cannot be empty");
    return;
  }

  if (!transferdata || !transferdata.recipient_code) {
    alert("Recipient data is missing");
    return;
  }

  const payload = { 
    pin: otp,
    reason: reason || "",
    amount: Number(amount),
    recipient: transferdata.recipient_code,
    transferdata: {
      name: transferdata.name,
      account_number: transferdata.account_number,
      bank_name: transferdata.bank_name,
    },
  };

  console.log("Transfer Payload:", payload);

  setIsLoading(true);

  getPinBackend(payload)
    .then(result => {  // ✅ already parsed JSON
      setIsLoading(false);
      if (result.status === "success") {
        console.log("Transfer Response:", result.transfer_data);
        alert("Transfer Successful!");
      } else {
        alert(result.message || "Something went wrong");
      }
    })
    .catch(err => {
      setIsLoading(false);
      console.error(err);
      toast.warn("Network error. Try again.");
    });
};



    const Modal = () => {
      return (
      <>      
  
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Recipient Account</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>                    
                  <div className="modal-body">


                        <div className="form-group mb-4">
                          <label htmlFor="" className='text-dark'>Account Number</label> 
                          <input 
                              type="text" 
                              className="form-control text-dark" 
                              value={accountNumber}
                              onChange={(e) => {
                                setAccountNumber(e.target.value)                                
                              }}
                          />
                          {error && accountNumber.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>Account Number field is emptied</label> : ""}                                              
                        </div>
                    

                    <div className="form-group mb-4">
                        <Dropdown
                            label="Select Bank"
                            className={'form-control'}
                            width={60} 
                            options={listbankdata}
                            value={bankCode}
                            onChange={(e) => {
                              setBankCode(e.target.value)
                                     
                              getAccountResolveDetail(accountNumber, e.target.value)
                            }}
                            placeholder={!isFocus ? 'Bank name' : '...'}
                        />
                    </div>

                    {
                      accountNumber.length === 0 ? 
                      <p>No account detail to diplay</p>
                      :
                        <>                         
                        
                        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                            <label htmlFor="" className='text-dark'>{resolvedata?.account_name}</label>                                                   
                            <button onClick={() => clearSearch() } type="button" className="btn btn-success">Clear</button>
                        </div>
                      
                        <div className="form-group mb-4">
                              <Dropdown
                                  label="Select Type"
                                  className={'form-control'}
                                  width={60} 
                                  options={bankTypedata}
                                  value={bankType}
                                  onChange={(e) => {
                                    setBankType(e.target.value)
                                    
                                  }}
                                  placeholder={!isFocus ? 'Bank Type' : '...'}
                              />
                        </div> 

                        <div className="form-group">
                            <Dropdown
                                label="Select Currency"
                                className={'form-control'}
                                width={60} 
                                options={currencydata}
                                value={currency}
                                onChange={(e) => {
                                  setCurrency(e.target.value)
                                }}
                                placeholder={!isFocus ? 'Currency' : '...'}
                            />
                        </div>
                        </>

                    } 
                    
                    

  
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        { isLoading ?
                          <button  type="button" className="btn btn-success">CREATING RECIPIENT</button>:
                          <button onClick={() => createTransferRecipient() } type="button" className="btn btn-success">Create</button>
                          
                        }
                        
                    </div>
                  
                  </div>
              </div>
          </div>
  
  
  
      </>
      )
  }

    const ModalTranferModal = () => {
      return (
      <>      
  
          <div className="modal fade" id="staticBackdropOpenTranferModal" data-bs-backdrop="false" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropOpenTranferModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropOpenTranferModalLabel">Send Money</h1>
                        { successtransfer ?
                          <button 
                            type="button" 
                            className="btn-close btn btn-danger" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"  
                            onClick={() => {
                              clearTransferData()
                              setSuccessTransfer(false)
                              setOtp("")
                              setOtpVisible(false)
                            }} 
                          />:
                          <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"  
                          />
                        }
                    </div>                    
                    <div className="modal-body">
                    
                    { 
                      !otpVisible &&
                      (
                      <>
                       <div className="form-group mb-4">
                            <label htmlFor="" className='text-dark'>Reason for sending the money?</label> 
                            <Dropdown
                                label="Select Currency"
                                className={'form-control'}
                                width={60} 
                                options={currencydata}
                                value={currency}
                                onChange={(e) => {
                                  setCurrency(e.target.value)
                                }}
                                placeholder={!isFocus ? 'Currency' : '...'}
                            />
                        </div> 
                        {currency === 'NGN' &&
                        <>
                        
                        <div className="d-flex form-group">                     
                          Transferring to: <b>{transferdata?.name}</b>
                        </div>
                        <div className="d-flex form-group mb-2">              
                          Amount: <b>{currencyFormat(amount)}</b>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="" className='text-dark'>Amount to Send</label> 
                          <input 
                              type="text" 
                              className="form-control text-dark rounded" 
                              value={amount}
                              onChange={(e) => {
                                setAmount(e.target.value)                                
                              }}
                          />
                          {error && amount.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>Input an Amount</label> : ""}                                              
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="" className='text-dark'>Reason for sending the money?</label> 
                          <input 
                              type="text" 
                              className="form-control text-dark rounded" 
                              value={reason}
                              onChange={(e) => {
                                setReason(e.target.value)                                 
                              }}
                          />
                            {error && reason.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>Please add a reason</label> : ""}                                              
                          </div>  
                          { isLoading ?
                            <div className="d-flex justify-content-end"> 
                              <button  type="button" className="btn btn-success">INITIALISING...</button>
                            </div>           :            
                            <div className="d-flex justify-content-end">                        
                              <button onClick={() => makeTransfer() } type="button" className="btn btn-success">SEND</button>
                            </div>
                          }
                          </>
                        }

                          

                        </>
                      )
                    }

                    { 
                      otpVisible && !successtransfer &&
                      (
                      <>
                        <div className="form-group mb-4">                     
                          Transferring to: <b>{transferdata?.name}</b>
                        </div>
                        <div className="d-flex form-group">              
                          Amount: <b>{currencyFormat(amount)}</b>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="" className='text-dark text-center'>Enter Pin to proceed</label> 
                          <input 
                              type="password" 
                              className="form-control form-control-sm text-dark  text-center" 
                              style={{letterSpacing: 20 + 'px'}}
                              maxLength={4}
                              minLength={4}
                              value={otp}
                              onChange={(e) => {
                                setOtp(e.target.value)                                
                              }}
                          />
                          {error && otp.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>PIN Number field is emptied</label> : ""}                                              
                        </div>


                        { otp.length == 4 && (

                          isLoading ?
                            <div className="d-flex justify-content-center align-items-center"> 
                              <button  type="button" className="btn btn-success w-100">transferring in progress...</button>
                            </div>:
                            <div className="d-flex justify-content-end"> 
                              <button onClick={() => {
                                makeFinalTransfer()
                              }} type="button" className="btn btn-success w-100">Transfer</button>
                            </div>

                        )
                        }
                        </>
                      )
                    }

                    {
                      successtransfer &&
                      <div className='d-flex flex-column justify-content-center align-items-center m-3'>                      
                        <i className='fa fa-thumbup mb-3'>Transfer Successfully</i>
                        <button onClick={() => {
                            clearTransferData()
                            setSuccessTransfer(false)
                            setOtp("")
                            setOtpVisible(false)
                            }} 
                            type="button" 
                            className="btn btn-secondary" 
                            data-bs-dismiss="modal">
                            Close
                        </button>                                              

                      </div>                        
                      
                    }


                  
                  </div>
                  {/* <div className="modal-footer">
                      <button onClick={() => clearTransferData()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>                                              
                  </div> */}
                </div>
              </div>
          </div>
  
  
  
      </>
      )
  }




  return (
    <>
    {Modal()}
    {ModalTranferModal()}
   
   <ContainerTitle title={'Transfer'}>

        <div className="row g-3 mb-4">
            <div className="col-3">
              <WalletCard title="Transfer"/>
            </div>
            
        
            <p>Welcome, {profiledata?.first_name} </p>
          </div>



      <div className="row g-3">

        <div className="col-lg-9 col-md-8 col-sm-12"> 
    
        <div className="d-flex justify-content-end">
            <button 
                  type="button" 
                  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
              >
                Create Recipient
            </button>
        </div>

         <div style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
    
              <div className='d-flex justify-content-end align-items-end mb-3'> 
                  <input 
                      placeholder='Search by Account Name || Number'
                      type="text" 
                      className="form-control text-dark col-12" 
                      onChange={(e) => setSearchQuery(e.target.value)}                                        
                  />
              </div>

              {recipient ? 
                  <div className="row">
                      {searchTransfer(recipient)?.map((item, index) => (                       
                          <RecipientList 
                              item={item}
                              key={item.id}
                              onClickOpenTransferModal={() => setTranferData(item)}
                          /> 
                      ))}    
                  </div>
              : 
                  <p className='text-center' style={{ fontSize: 20 }}>
                      No recipient added yet
                  </p>
              }

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
                      onClick={() => navigate('/transport/recipient')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Transport Recipient
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

export default Transfer