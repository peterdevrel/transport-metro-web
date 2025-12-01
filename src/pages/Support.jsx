import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Contexts/UserContextProvider'
import Colors from '../Utils/Colors'
import { toast } from 'react-toastify'
import CountdownTimer from './CountDownTimer'
import { ContainerTitle } from '../Components/ContainerTitle'
import WalletCard from '../Components/WalletCard'
import { ClipLoader } from 'react-spinners'

const Support = () => {


  const navigate = useNavigate()


  const {
    userdata, 
    profiledata,
    isLoggedIn, 
    setIsLoggedIn, 
    getProfileUser,
    getOtpPin,
    resetPinWithOTP,
    resendOtp,
    logout
  } = useAuthContext()

  


const userId = localStorage.getItem('userId')
const access = localStorage.getItem('access')

const [otp, setOtp] = useState("")
const [emailotp, setEmailOtp] = useState("")
const [number, setNumber] = useState("")
const [confirmnumber, setConfirmNumber] = useState("")
const [otpVisible, setOtpVisible] = useState(false)
const [error, setError] = useState(false)
const [isFocus, setIsFocus] = useState(false)
const [isLoading, setIsLoading] = useState(true)
const [message, setMessage] = useState('')


  const handleExpired = () => {
    toast.warn("OTP expired. Please request a new one.");
    // navigate(-1)
  };


useEffect(() => {
  const fetchData = async () => {
    try {
      if (!userId || !access) {
        navigate('/unathorised');
        return;
      }

      await getProfileUser();
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  };

  fetchData();
}, []);

// console.log(profiledata?.email)


const requestOtp = () => {
  try{
    const otpdata = {'email':emailotp}
    if(emailotp === ""){
      toast.warn("Email field is empty")
      setIsLoading(false)
    }else if(emailotp !== profiledata.email){
      toast.warn("Email does not match ")
      setEmailOtp("")
      setIsLoading(false)
    } else{
      setIsLoading(true)
      setTimeout(() => {
        getOtpPin(otpdata)
        .then(resp => resp.json())
        .then(data => {
          if(data.detail === 'Success Message'){
            toast.success(data.detail)
            setMessage(data.detail)
            setOtpVisible(true)
            setIsLoading(false)
          }else if(data.detail === 'Some Error Message'){
            toast.warn('You are not authorized to perform this task')
            setIsLoading(false)
          }
        }).catch(error => {
          if(error){
            console.log('You are welcome', errror)
            setIsLoading(false)
          }
        })
      }, 3000)
    }

  }catch(error){
    if(error){
      setIsLoading(false)
      toast.warn("Check your internet connection", error)
    }
  }
}


const changePINWithOTP = () => {
  try{
    const resetData = {'email': emailotp, 'number': number, 'otp': otp}
    if(otp === "" || number === "" || confirmnumber === ""){
      alert("field is empty")
    }else if(number !== confirmnumber){
      alert("PIN do not match")
    }
    else{
      setIsLoading(true)
      setTimeout(() => {
        resetPinWithOTP(resetData)
        .then(resp => resp.json())
        .then(data => {
          if(data.success){
            toast.success(data.success)
            // navigate(-1)
            setEmailOtp("")
            setOtp("")
            setNumber("")
            setConfirmNumber("")
            setIsLoading(false)
          }else if(data.notmatch){
            toast.warn(data.notmatch)
            setIsLoading(false)
          }else if(data.detail){
            alert(data.detail)
            setIsLoading(false)
          }
          
        })
      }, 1000)
      
    }

  }catch(error){
    if(error){
      setIsLoading(false)
      console.log("Error sending OTP", error)
    }
  }
}




  
   const logOut = async () => {
    try {
        await logout();  // Wait for API logout to complete

        // Clear all client-side state and localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('access');
        localStorage.clear();

        navigate('/');    // Redirect after logout
        window.location.reload();  // Optional: reload page if you need fresh state
    } catch (error) {
        console.error("Logout failed:", error);
        // Optionally still clear local stuff and redirect on error
    }
    };



const Modal = () => {
  return (
  <>      

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Request for New PIN with OTP</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>                    
              <div className="modal-body">

                {
                    !otpVisible &&
                    <>
                    
                    
                    <div className="form-group">
                      <label htmlFor="" className='text-dark'>Register email is required!</label> 
                      <input 
                          type="text" 
                          className="form-control text-dark text-center" 
                          value={emailotp}
                          onChange={(e) => {
                            setEmailOtp(e.target.value)                                
                          }}
                      />
                      {error && emailotp.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>Email field is emptied</label> : ""}                                              
                    </div>

                      { !emailotp.length <= 0 ?
                        isLoading ?
                        <div className="modal-footer">                          
                          <button  type="button" className="btn btn-success">SENDING OTP...</button>
                        </div>:
                        <div className="modal-footer">                          
                          <button onClick={() => requestOtp() } type="button" className="btn btn-success">REQUEST OTP</button>
                        </div>: ""
                      }
                    </>
                }

                {
                    otpVisible &&
                    <>          
                      {
                        message ?
                        <p className='text-center text-success' style={{fontSize: 18 + 'px'}}>
                          Hurray!!! Check your email box for the OTP
                        </p> 
                        :""
                      }         
                      <div className="form-group">
                        <label htmlFor="" className='text-dark'>OTP Receive required!</label> 
                        <input 
                            type="password" 
                            className="form-control text-dark text-center" 
                            value={otp}                            
                            maxLength={6}
                            minLength={6}
                            onChange={(e) => {
                              setOtp(e.target.value)                                
                            }}
                        />
                        {error && otp.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>OTP field is emptied</label> : ""}                                              
                      </div>
                      <div className="form-group">
                        <label htmlFor="" className='text-dark'>Input new Pin!</label> 
                        <input 
                            type="password" 
                            className="form-control text-dark text-center" 
                            value={number}
                            maxLength={4}
                            minLength={4}
                            onChange={(e) => {
                              setNumber(e.target.value)                                
                            }}
                        />
                        {error && number.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>PIN Number field is emptied</label> : ""}                                              
                      </div>
                      <div className="form-group">
                        <label htmlFor="" className='text-dark'>Confirm new Pin!</label> 
                        <input 
                            type="password" 
                            className="form-control text-dark text-center" 
                            value={confirmnumber}
                            maxLength={4}
                            minLength={4}
                            onChange={(e) => {
                              setConfirmNumber(e.target.value)                                
                            }}
                        />
                        {error && confirmnumber.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>PIN Number field is emptied</label> : ""}                                              
                      </div>
                      
                       <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', margin:10}}>
                            <CountdownTimer />
                           

                        </div>  

                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={() => setOtpVisible(false)} data-bs-dismiss="modal">Close</button>
                          { isLoading ?
                            <button  type="button" className="btn btn-success">VERIFYING YOUR ACCOUNT...</button>:
                            <button onClick={() => changePINWithOTP() } type="button" className="btn btn-success">VERIFY & CHANGE</button>
                            
                          }
                          
                      </div>
                    </>
                }
                

              
                


                </div>
                
              
              </div>
          </div>
      </div>



  </>
  )
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
    {Modal()}
    <ContainerTitle title={'Support'}>
       
          <div className="row g-3 mb-4">
              <div className="col-3">
                <WalletCard title="Support Service"/>
              </div>
              
          
            <p>Welcome, {profiledata?.first_name} </p>
        </div>
        <div className="row g-3">
          <div className="col-lg-9 col-md-8 col-sm-12"> 
                    <div className="row">

                      <div className="col-md-3 mb-4 stretch-card transparent">
                        <div className="card card-dark-lightgreen" style={{backgroundColor: Colors.LIGHT_GRAY}}>
                          <div className="card-body">
                            <div className="d-flex flex-column align-items-center">                       
                                <button 
                                    type="button" 
                                    style={{backgroundColor: Colors.LIGHT_GRAY}}
                                    className="btn btn-success mb-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                >
                                  <i className="fa fa-unlock" style={{fontSize:36 + 'px', color: Colors.BLACK}}></i>                   
                                </button>                      
                                <p className="fs-30 mb-2"></p>
                              <p>Card Pin Request</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 stretch-card transparent">
                        <div className="card card-dark-lightgreen" style={{backgroundColor: Colors.LIGHT_GRAY}}>
                          <div className="card-body">
                          <div className="d-flex flex-column align-items-center">  
                            <button className="mb-4" style={{backgroundColor: Colors.LIGHT_GRAY}}>
                                <a type='button' className='text-white text-decoration-none' onClick={() => toast.success('Check back later')} > 
                                    <i className="fa fa-support" style={{fontSize:36 + 'px', color: Colors.BLACK}}></i>         
                                </a>  
                              </button>
                                <p className="fs-30 mb-2"></p>
                                <p>Transaction Complaints</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 stretch-card transparent">
                        <div className="card card-dark-lightgreen" style={{backgroundColor: Colors.LIGHT_GRAY}}>
                          <div className="card-body">
                            <div className="d-flex flex-column align-items-center">                  
                                <button className="mb-4" style={{backgroundColor: Colors.LIGHT_GRAY}}>
                                  <a type='button' className='text-white text-decoration-none' onClick={() => toast.success('Check back later')} > 
                                      <i className="fa fa-support" style={{fontSize:36 + 'px', color: Colors.BLACK}}></i>         
                                  </a>  
                                </button>
                                <p className="fs-30 mb-2"></p>
                                <p>Withdraw complaint</p>
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
                      onClick={() => navigate('/user/manager')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 User Manager
                    </button>


                    <button
                      onClick={() => logOut()}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Logout
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

export default Support