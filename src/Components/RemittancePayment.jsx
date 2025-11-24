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
import { useSchool } from '../../Contexts/SchoolContextProvider'
import Dropdown from '../../Components/Dropdown'
import { toast } from 'react-toastify'
import DropdownRemittance from '../../Components/DropDownRemittance'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import Sizes from '../../Utils/Sizes'
import { useTranslation } from 'react-i18next';





const RemittancePayment = () => {

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


    const [paymentVisible, setPaymentVisible] = useState(false)
    const [institution, setInstitution] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [matric, setMatric] = useState("")
    const [remittance, setRemittance] = useState("")
    const [company, setCompany] = useState("")
    const [amount, setAmount] = useState("")
    const [itemdata, setItemData] = useState("")
    

    const {
        getPayInstitutionData,
    } = useSchool()


    const { 
      formatTimeStamp, currencyFormat,
      allRemittanceData, setAllRemittanceData,
      getAllRemittanceInfo,
      verifyRemittancePayment,
      getRemittancePayment,
      remittancepaymentdata,
      updateAndVerifyRemittancePaymentAuthorization,
      DeactivateRemittancePayment,
      UpdateRemittanceAmount,
      ChargeBackRemittancePayment
    } = useServiceContext()


    const {
        subscriptiondurationdata, setSubscriptionDurationData,
        getSubscriptionDuration,
        addDuration,
        getDurationBreakdown
    } = useCustomer()

    useEffect(() => {
    if(!userId || !access){
        navigate('/unathorised')
    }
   
    }, [])


    const {userdata, profiledata, getProfileUser} = useAuthContext()
    const [duration, setDuration] = useState(true);
    const now = new Date();
    const nextDue = addDuration(now, duration);

    if (isNaN(nextDue.getTime())) {
        console.error("❌ Invalid nextDue date from duration:", duration);
        throw new Error("Invalid duration: could not calculate next due date.");
    }


  
    useEffect(() => {
      getPayInstitutionData()
      getAllRemittanceInfo()
      getSubscriptionDuration()
      getRemittancePayment()
    },[profiledata])

    const handleChange = (event) => {
        const selected = allRemittanceData.find(option => option.value === event.target.value);
        setRemittance(selected)
        // getAmountByCategoryData(event.target.value)
    }

    // console.log(profiledata)
    // console.log(institution.value)

    const clear = () =>{
      setCompany("")
      setDuration("")
      setRemittance("")
      setAmount("")
    }
    


    const baseAmount = Number(amount); // the amount you want subaccount to get
    let transactionCharge = Math.round(baseAmount * 0.02 + 150);

    // Cap if over ₦200,000
    if (baseAmount >= 200000) {
        transactionCharge = 3000;
    }

    // ✅ Convert each value INDIVIDUALLY to kobo
    const transactionChargeKobo = transactionCharge * 100;
    const totalAmountKobo = (baseAmount + transactionCharge) * 100;


    const makePayment = () => {  
        if (company.length === 0 || amount.length === 0 || remittance.subaccount_bank === "" || remittance.subaccount_name === "") {
          toast.warn('Some fields are empty or there is a network issue.');
          return;
        } 

         if (!duration || Object.keys(duration).length === 0) {
            toast.warn('Subscription Duration is empty');
            return;
          }

        
        try { 
          setTimeout(() => {
            setIsLoading(true);
            const paystack = new PaystackPop();
            paystack.newTransaction({
              key: import.meta.env.VITE_PUBLICK_KEY,
              email: profiledata.email,
              amount:totalAmountKobo,  // Convert amount to kobo
              subaccount: remittance.subaccount || "", 
              channels: ["card"],
              transaction_charge: transactionChargeKobo,
              label: 'Neighbourhood Checkout',
              metadata: {
                    email: profiledata.email,
                    custom_remittance: true,
                    user_id: profiledata.id,
                    subaccount: remittance.subaccount,
                    remittance:remittance.id,
                    amount:amount,
                    subaccount_name:remittance?.subaccount_name,
                    subaccount_bank:remittance.subaccount_bank,
                    company:company,
                    last_payment_date: now.toISOString(),
                    next_due_date: nextDue.toISOString(),  // ✅ now safe
                },   
              onSuccess: (transaction) => {
                toast.success(`Transaction Successful, RefId: ${transaction.reference}`);
                if (transaction.reference) {
                    toast.success('Transaction Successful');
                    // Reset form
                    setIsLoading(false);
                    getAllRemittanceInfo()
                    getRemittancePayment()
                    clear()
                    setOtpSent(false);
                  } 
                // Call backend to verify payment after success
                
              },
              onCancel: () => {
                // User closed the Paystack popup
                toast.warn('Payment Popup Closed');
                setIsLoading(false);
              }
            });
          }, 2000);
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      };
      

    const ChargeMySubscriptionAuthorizationPayment = () => {  

        setIsLoading(true)
        setTimeout(() => {
                
            const paystack = new PaystackPop();
            paystack.newTransaction({
            key: import.meta.env.VITE_PUBLICK_KEY,
            email: profiledata.email,
            amount: 50 * 100,
            channels: ["card"],
            label: 'Neighbourhood Checkout',
            onSuccess: (transaction) => { 
                setIsLoading(true)
                //   console.log(transaction)
                //   console.log(transaction.reference)
                
                toast.success(`Transaction Successful, RefId: ${transaction.reference}`)
                updateAndVerifyRemittancePaymentAuthorization({
                    id: itemdata.id,
                    reference: transaction.reference,
                }) 
                .then(response => response.json())  
                .then((data) => {
                    // console.log(data)
                    if(data && data.message){
                        toast.success(`${data.message}`) 
                        setIsLoading(false)
                        // navigate(-1)
                    }else if(data && data.error){
                        // console.log(data.failed)
                        setIsLoading(false)
                        
                    }
                })  .catch(error => {
                    console.log(error)
                    setIsLoading(false)
                })

                    
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

    const ActivateAndDeactivateAccountIsActive = (id) => {  
      setTimeout(() => {
            DeactivateRemittancePayment({id}) 
            .then(response => response.json())  
            .then((data) => {
                // console.log(data)
                if(data && data.message){
                    toast.success(`${data.message}`) 
                    setIsLoading(false)
                    getRemittancePayment()
                    setIsLoading(false)
                    // navigate(-1)
                }else if(data && data.error){
                    // console.log(data.failed)
                    setIsLoading(false)
                    
                }
            })  .catch(error => {
                console.log(error)
                setIsLoading(false)
            }) 
        }, 2000)  
    
    }

    const PayByChargeCard = () => {  
        if(itemdata.amount <= 0){
            toast.warn('Amount cannot be less than zero')
            return
        }
        if(!itemdata.id){
            toast.warn('ID cannot be none')
            return
        }
        const data = {
            "id": itemdata.id,
            "amount": itemdata.amount,
        }
        try{
            setIsLoading(true)
            ChargeBackRemittancePayment(data)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if(data && data.message){
                toast.success(data.message)
                setIsLoading(false)
                setAmount("")
                }else if(data && data.error){
                toast.warn(data.error)
                setIsLoading(false)
                }
            })
        
                
            }catch(error){
                setIsLoading(false)
                console.log(error)
            }
    }
          
    const UpdateSubscriptionAmountPayment = () => {  
    
        if(itemdata.amount <= 0){
            toast.warn('Amount cannot be less than zero')
            return
        }
        if(!itemdata.id){
            toast.warn('ID cannot be none')
            return
        }
        const data = {
            "id": itemdata.id,
            "amount": amount
        }
        try{
            setIsLoading(true)
            UpdateRemittanceAmount(data)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if(data && data.message){
                toast.success(data.message)
                setIsLoading(false)
                setAmount("")
                getRemittancePayment()
                }else if(data && data.error){
                toast.warn(data.error)
                setIsLoading(false)
                }
            })
        
                
            }catch(error){
                setIsLoading(false)
                console.log(error)
            }
        
        
    }
          
      
          
          
    const ModalChargeDirectDebit = () => {
        return (
        <>      
    
            <div className="modal fade" id="staticBackdropCharge" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropChargeLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropChargeLabel">Direct Debit Charge</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>                    
                    <div className="modal-body">
    
                        <div className="d-flex flex-column justify-content-between">
                            <div className="d-flex flex-column align-items-center">
                                <p className="card-title text-dark">Amount: {currencyFormat(itemdata.amount)}</p>
                                <p className="card-title text-dark">SubID:{itemdata?.id}</p>
                            </div>
                            
                                
                                                        
                                    {isLoading ?  
                                        <button 
                                            type="button" 
                                            className="btn btn-successs" 
                                            >
                                                Please wait...
                                        </button> 
                                        :

                                        <button 
                                            type="button" 
                                            onClick={() => PayByChargeCard()}
                                            className="btn btn-success" 
                                            >
                                                Direct Pay
                                        </button> 
                                    
                                    }

                            
                        </div>
    
                    </div>
                    
                    </div>
                </div>
            </div>
    
    
    
        </>
        )
    }


    const Modal = () => {
        return (
        <>      
    
            <div className="modal" id="staticBackdropUpdateMySub" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropUpdateMySubLabel">Update Card</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>                    
                    <div className="modal-body">
    
                        <div className="d-flex flex-column align-items-center m-2">
                            <p className="card-title text-dark">Note that updating card required a token of {currencyFormat(50)}</p>
                            <p className="card-title text-dark">SUB ID: {itemdata?.id}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-center mt-5">
                            
                        
                                    
                                    {isLoading ?  
                                        <button 
                                            type="button" 
                                            className="btn btn-successs" 
                                            >
                                                Please wait...
                                        </button> 
                                        :

                                        <button 
                                            type="button" 
                                            onClick={() => ChargeMySubscriptionAuthorizationPayment()}
                                            className="btn btn-success" 
                                            >
                                                Update Card
                                        </button> 
                                        
                                    }

                              

                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
    
    
    
        </>
        )
    }

    const ModalUpdateAmount = () => {
        return (
        <>      
    
            <div className="modal fade" id="staticBackdropAmount" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropAmountLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-6" id="staticBackdropAmountLabel">Kindly update amount before next payment due</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>                    
                    <div className="modal-body">
    
                        <div className="d-flex flex-column justify-content-between">
                            <div className="d-flex flex-column align-items-center">
                                <p className="card-title text-dark">Plan- {itemdata.plan}</p>
                                <p className="card-title text-dark">SubID:{itemdata?.id}</p>
                            </div>
                            
                                
                                      <div className="form-group">
                                        <label htmlFor="" className='text-dark'>Amount to Pay</label> 
                                        <input 
                                            type="text" 
                                            className="form-control text-dark" 
                                            value={amount}
                                            placeholder='Amount request'
                                            onChange={(e) => {
                                            setAmount(e.target.value)                                
                                            }}
                                        />
                                    </div>                            
                                    {isLoading ?  
                                        <button 
                                            type="button" 
                                            className="btn btn-successs" 
                                            >
                                                Please wait...
                                        </button> 
                                        :

                                        <button 
                                            type="button" 
                                            onClick={() => UpdateSubscriptionAmountPayment()}
                                            className="btn btn-success" 
                                            >
                                                Request to Pay
                                        </button> 
                                    
                                    }

                            
                        </div>
    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
    
    
    
        </>
        )
    }

    
  

return (
    <>
     {Modal()}
     {ModalChargeDirectDebit()}
     {ModalUpdateAmount()}
    <Body>
        <SettingsPanel />
        <SideNav />
        <Main>
            <div className="content-wrapper" style={{backgroundColor: Colors.WHITE}}>
                <WelcomeGreetingHeader name={profiledata?.last_name !== 'undefined' ? profiledata?.last_name : 'Guest' } icon={'fa fa-chevron-circle-left fs-30'} onClickBack={() => navigate(-1)} />
                <div className='d-flex flex-row justify-content-between justify-items-center align-items-center'>
                    <p className="fs-30">
                        {t('remittance')}
                    </p>
                    <div className='d-flex flex-row justify-content-between justify-items-center align-items-center'>
                       
                        <button className='w-30 btn btn-success' onClick={() => getRemittancePayment()}>
                            Refresh
                        </button>
                    </div>
                </div>
                <hr/>

                <div className="d-flex flex-row justify-content-between  justify-items-center align-items-center">
                  {/* Remittance Dropdown */}
                  <div className="form-group col-sm-3">
                    <DropdownRemittance
                      className="form-control text-dark form-control-lg"
                      width={60}
                      options={allRemittanceData}
                      value={remittance?.value}
                      onChange={handleChange}
                      // placeholder={'Remittance'}
                    />
                  </div>

                  {/* Company Name Input */}
                  <div className="form-group col-sm-4">
                    <input 
                      type="text" 
                      className="form-control " 
                      placeholder="Name, Property or Organisation" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  {/* Amount Input */}
                  <div className="form-group col-sm-3">
                    <input 
                      type="number" 
                      className="form-control form-control-lg" 
                      placeholder="₦ Amount" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-3">
                   {
                            isLoading ?
                            <button className="btn btn-warning">Processing...</button>:                   
                            // amount &&
                            
                            <button type='button' 
                            onClick={(e) =>{
                                e.preventDefault()
                                makePayment()
                                // handleUserPayment()
                            }}  className="btn btn-success">Process Payment {amount && currencyFormat(totalAmountKobo / 100)}</button>                            


                        }           

                    </div>
                </div>

                {remittance && 
                  <div className="d-flex flex-row justify-content-between ">
                    <div className="form-group col-sm-6">
                          <div>
                          <h3>Select recurring payment if any:</h3>
                          {/* <p><strong>ID:</strong> {remittance.id}</p> */}
                          {/* <p><strong>Code:</strong> {remittance.code}</p> */}
                          {/* <p><strong>Name:</strong> {remittance.value}</p> */}
                          {/* <p><strong>SubAccount:</strong> {remittance.subaccount}</p> */}
                          {/* <p><strong>Account Name:</strong> {remittance.subaccount_name}</p>
                          <p><strong>Account Bank:</strong> {remittance.subaccount_bank}</p> */}
                          {/* <p><strong>Account:</strong> {institution.subaccount}</p> */}
                          </div>
                
                      {/* <label htmlFor="" className='text-dark'>Duration</label>  */}
                      <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingBottom: 60,
                          }}
                          >
                          {subscriptiondurationdata.map((item, index) => (
                              <label
                              key={item.id}
                              style={{
                                  backgroundColor:
                                  duration?.id === item.id ? Colors.LIGHT_GREEN : Colors.WHITE,
                                  borderRadius: 10,
                                  margin: 5,
                                  padding: 10,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                              }}
                              >
                              <input
                                  type="radio"
                                  name="subscriptionDuration"
                                  value={item.id}
                                  checked={duration?.id === item.id}
                                  onChange={() => setDuration(item)}
                                  style={{ marginRight: 10 }}
                              />
                              <span style={{ fontSize: Sizes.h4 }}>{item?.specific}</span>
                              </label>
                          ))}
                      </div>


                      </div>
                   </div>
                }
                <hr/>
         

                <div className="col-sm-12 mb-3 mb-sm-0 mb-5 mt-5">
                      <h3>Remittance Bill Payment Confirmation</h3>
                      <hr/>
                <div className="card">
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                        <thead>
                            <tr>
                            <th>Subscriber Name</th>
                            <th>Reference.</th>
                            <th>Status.</th>
                            <th>Last Payment.</th>
                            <th>Next Due Date.</th>
                            <th>Amount.</th>
                            <th>Duration.</th>
                            <th>Processed At</th>
                            <th>Action</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(remittancepaymentdata) &&
                            remittancepaymentdata
                            .map((item, index) => (
                                
                                <tr key={index}>
                                    <td>{item?.email}</td>
                                    <td>{item?.reference}</td>
                                    <td>{item?.is_active ? 'Active' : 'InActive'}</td>
                                    <td>{formatTimeStamp(item.last_payment_date)}</td>
                                    <td>{formatTimeStamp(item.next_payment_date)}</td>
                                    <td>{currencyFormat(item.amount )}</td>
                                    <td>
                                        { getDurationBreakdown(item.last_payment_date, item.next_payment_date)}          
                                    </td>
                                    <td>{formatTimeStamp(item?.made_at)}</td>
                                    <td>
                        
                                        <div className='d-flex justify-items-center'>
                                            
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setItemData(item)}
                                                        className="btn btn-success mr-3" data-bs-toggle="modal" data-bs-target="#staticBackdropUpdateMySub"
                                                    >
                                                            <i className='fa fa-edit'></i>
                                                    </button>
                                                    {item.is_active ?
                                                      
                                                        <button 
                                                            type="button" 
                                                            onClick={() => ActivateAndDeactivateAccountIsActive(item.id)}
                                                            className="btn btn-danger mr-3"
                                                            // className="btn btn-danger mr-3" data-bs-toggle="modal" data-bs-target="#staticBackdropCancel"
                                                            >
                                                                  <i className='fa fa-times'> Deactivate</i>
                                                        </button>
                                                        :
                                                        <button 
                                                            type="button" 
                                                            onClick={() => ActivateAndDeactivateAccountIsActive(item.id)}
                                                            className="btn btn-success mr-3"
                                                            // className="btn btn-danger mr-3" data-bs-toggle="modal" data-bs-target="#staticBackdropCancel"
                                                            >
                                                                  <i className='fa fa-check-square-o'></i> Activate
                                                        </button>
                                                  
                                                    }
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setItemData(item)}
                                                        className="btn btn-secondary mr-3" data-bs-toggle="modal" data-bs-target="#staticBackdropCharge"
                                                        >
                                                            <i className='fa fa-dollar'></i> Direct Debit
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setItemData(item)}
                                                        className="btn btn-success mr-3" data-bs-toggle="modal" data-bs-target="#staticBackdropAmount"
                                                        >
                                                                <i className='fa fa-edit'></i> R2Pay
                                                    </button>
                                        
                                            
                                        
                                                </div>
                                            
                                    
                                    </td>
                                </tr>

                            ))
                        }
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
                </div>



  
        
          

            
            
            </div>
        </Main>
    </Body>
    </>
  )
}

export default RemittancePayment