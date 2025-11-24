import React, { useEffect, useState } from 'react'
import Body from '../../Components/Body'
import WelcomeGreetingHeader from '../../Components/WelcomeGreetingHeader'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useDedicatedVirtualContext } from '../../Contexts/DedicatedVirtualAccountContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
// import PaystackPop from '@paystack/inline-js'
import { toast } from 'react-toastify'
import Dropdown from '../../Components/Dropdown'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../Components/HeaderTitle'
import RecipientList from '../../Components/RecipientList'
import Colors from '../../Utils/Colors'
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../components/WalletCard'





const TransportRecipientAccount = () => {

      const { t, i18n } = useTranslation();

    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access')

    const {profiledata, getProfileUser, sendMessageTransaction} = useAuthContext()
 
    const { 
      formatTimeStamp, currencyFormat
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
        createTransportRecipientTransferBackend,
        getTransportRecipientTransferInformation,
        transportRecipientData,
        reason, setReason,
        amount, setAmount,
        transferFund,
        getPinBackend,
        patchUserWallet,
        userwalletamount,
        getUserWallet,
        getUserWalletDetail,
        userwalletdetaildata,
        TransactionReciept
    } = useCustomer()
    
    const {getAccountBalance,balance} = useDedicatedVirtualContext()
 
    const [isVisible, setIsVisible] = useState(false)
    const [successtransfer, setSuccessTransfer] = useState(false)
    const [otp, setOtp] = useState("")
    const [otpVisible, setOtpVisible] = useState(false)
    const [error, setError] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [transferdata, setTranferData] = useState(false)
    const [receiptdata, setRecieptData] = useState(false)
    const [currencyTag, setCurrencyTag] = useState('NGN');
    
     const [searchQuery, setSearchQuery] = useState('')
      const searchTransfer = (data) => {
        return data.filter((item) =>
            item?.account_number.toLowerCase().includes(searchQuery.toLowerCase())||
            item?.name.toLowerCase().includes(searchQuery.toLowerCase())
           
        )}


useEffect(() => {
  const fetchData = async () => {
    try {
      if (!userId || !access) {
        navigate('/unathorised');
        return;
      }

      // Run parallel requests for speed
      await Promise.all([
        getProfileUser(userId),
        getListBanksType(),
        getListBanksCurrency(),
        getTransportRecipientTransferInformation(),
        getUserWallet(),
        getUserWalletDetail(profiledata?.id, 'NGN'),
        getAccountBalance(),
      ]);

     

      await getListAllBanks(currencyTag);

      if (!bankTypedata && currencydata) return;
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };
  getListAllBanks(currencyTag)
  fetchData();
}, []);


  // console.log('balancetransfer', balance)
    const recipient = Array.from(transportRecipientData)


  
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
  

  // console.log(resolvedata)
  



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
        const resp = await createTransportRecipientTransferBackend(payload);  // API call to Django
        const response = await resp.json();
    
        if (response.status === true) {
          // toast.success(response.message || "Recipient created successfully");
          alert(response.message || "Recipient created successfully");
    
          // Reset UI state
          setResolveData([]);
          setListBankData([]);
          setAccountNumber("");
    
          // Refresh recipient list
           getTransportRecipientTransferInformation()
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

    // console.log(amount)


  
    const makeFinalTransfer = () => {
      const data={ 
          "reason": reason, 
          "amount": amount * 100, 
          "recipient": transferdata?.recipient_code,
          "metadata": {
            "user_id": profiledata.id,
            "transaction_type": "withdrawal",
            "initiated_by": "api"
          }
        }
      if (otp === "") {
        alert("PIN cannot be empty");
      } else {
        getPinBackend(otp) // 🔹 call backend verify endpoint
          .then((result) => {
            if (result.status === "success") {
              // ✅ PIN is valid → continue your existing transfer flow
              setIsLoading(true);
              transferFund(data)
                .then((resp) => resp.json())
                .then((response) => {
                  console.log(response);
                  setRecieptData(response);

                  const amt = response?.data?.amount;
                  const amount = amt ? amt / 100 : 0;
                  const totalamount = amount;

                  if (response.status === true) {
                    patchUserWallet(profiledata.id, currency, {
                      balance: userwalletdetaildata?.balance - amount,
                      total_withdraw: userwalletdetaildata?.total_withdraw + amount,
                    });

                   sendMessageTransaction({
                    "email": profiledata?.email,
                    "subject": `eGov Transaction Alert Debit [${currencyFormat(totalamount)}]`,
                    "message": `<pre> We wish to inform you that a Debit transaction</pre>
                                <pre> occurred on your account</pre>
                                <pre> The details of this transaction are shown below</pre>
                                <pre></pre>
                                <pre> Transaction Notification</pre>
                                <pre></pre>
                                <pre> Sender: ${profiledata?.first_name} ${profiledata?.middle_name} ${profiledata?.last_name}</pre> 
                                <pre> Reference Number: ${response.data.reference}</pre> 
                                <pre> Amount: NGN ${currencyFormat(totalamount)}</pre>
                                <pre> Currency: ${response.data.currency}</pre>
                                <pre> Domain: ${response.data.domain}</pre>
                                <pre> Trans ID: ${response.data.id}</pre>
                                <pre> Reasons: ${response.data.reason}</pre>
                                <pre> Failures: ${response.data.failures}</pre>
                                <pre> Beneficiary: ${transferdata?.name}</pre>
                                <pre> Beneficiary Account: ${transferdata?.account_number}</pre>
                                <pre> Beneficiary Bank: ${transferdata?.bank_name}</pre>
                                <pre> Recipient: ${response.data.recipient}</pre>
                                <pre> Status: ${response.data.status}</pre>
                                <pre> Code: ${response.data.transfer_code}</pre>
                                <pre> Created : ${formatTimeStamp(response.data.createdAt)}</pre>
                                <pre> Updated : ${formatTimeStamp(response.data.updatedAt)}</pre>
                               `

                  })
                  TransactionReciept({
                      "sender_id": `${profiledata?.first_name} ${profiledata?.middle_name} ${profiledata?.last_name}`,
                      "transfer_id": response.data.transfer_id,
                      "message": response.data.message,
                      "integration": response.data.integration,
                      "domain": response.data.domain,
                      "receiver_id": transferdata?.name,
                      "account_number": transferdata?.account_number,
                      "bank_name": transferdata?.bank_name,
                      "amount": response.data.amount,
                      "currency": response.data.currency,
                      "reason": response.data.reason,
                      "recipient": response.data.recipient,
                      "status": response.data.status,
                      "transfer_code": response.data.transfer_code,
                      "createdAt": `${formatTimeStamp(response.data.createdAt)}`,
                      "updatedAt": `${formatTimeStamp(response.data.updatedAt)}`,
                      "admin": userId
                    })
               
                    setSuccessTransfer(true);
                    toast.success(response.message);
                    setOtp("");
                    setAmount("");
                    setReason("");
                  } else if (response.status === false) {
                    toast.warn(response.message);
                  } else {
                    alert("Your transaction could not be processed");
                  }

                  setIsLoading(false);
                })
                .catch((error) => {
                  toast.warn(error.message);
                  setIsLoading(false);
                });
            } else {
              alert("Your PIN is not valid, create a new one");
              navigate(-1);
              setAmount("");
              setReason("");
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.error(err);
            toast.warn("Error verifying PIN");
            setIsLoading(false);
          });
      }

    }



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
                              className="form-control" 
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
                        
                        <div className="d-flex flex-row justify-content-between align-items-center">
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

                        <div className="form-group mb-4">
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
                        <div className="d-flex form-group">              
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
                              className="form-control" 
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
                              <button  type="button" className="btn btn-success">Please wait while your transaction is processing...</button>
                            </div>:
                            <div className="d-flex justify-content-end"> 
                              <button onClick={() => {
                                makeFinalTransfer()
                              }} type="button" className="btn btn-success">Transfer</button>
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
    <ContainerTitle title={'Transport Recipient'}>
              <div className="row g-3 mb-4">
                <div className="col-3">
                  <WalletCard title="Terminal Recipient Account"/>
                </div>
                
             
                <p>Welcome, {profiledata?.first_name} </p>
              </div>
    
      
      
            <div className="row g-3">
      
              <div className="col-lg-9 col-md-8 col-sm-12"> 

                  <div style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                      <div className='d-flex flex-row justify-content-between justify-items-center align-items-center'>
                            <p className="fs-30">{t('transfer')}</p>           
                          <button 
                              type="button" 
                              className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          >
                                Create Recipient
                          </button>
                      </div>
                      <hr/>


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
                              { searchTransfer(recipient)?.map((item, index) => (                       
                                  <RecipientList 
                                    item={item} key={item.id} 
                                    onClickOpenTransferModal={() => setTranferData(item)}
                                  /> 
                                ))          
                              }
                      </div>: 
                          <p className='text-center' style={{fontSize: 20 + 'px'}}>
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
                      onClick={() => navigate('/qr/payment/transaction')}
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

export default TransportRecipientAccount