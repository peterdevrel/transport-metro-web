import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from '../Contexts/UserContextProvider'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import CountDownTimerForgotPassword from './CountDownTimerForgotPassword'
import { ContainerTitle } from '../Components/ContainerTitle'





const ForgotPassword = () => {



   const { t, i18n } = useTranslation();

  const navigate = useNavigate()

  const handleExpired = () => {
    toast.warn("OTP expired. Please request a new one.");
    // navigate(-1)
  };

  const {
    getOtpResponseByEmail, 
    resetPasswordWithOTP
  } = useAuthContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '','','']);

  // const handleChange = (e, index) => {
  //   const value = e.target.value;
  //   if (value.length <= 1) {
  //     const newOtp = [...otp];
  //     newOtp[index] = value;
  //     setOtp(newOtp);
  //     if (value && index < 5) {
  //       document.getElementById(`otp-${index + 1}`).focus();
  //     }
  //   }
  // };

  const handleChange = (e, index) => {
  const value = e.target.value;

  if (!/^[0-9]?$/.test(value)) return; // allow only numbers

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // move forward
  if (value && index < 5) {
    document.getElementById(`otp-${index + 1}`).focus();
  }

  // move backward on delete
  if (!value && index > 0) {
    document.getElementById(`otp-${index - 1}`).focus();
  }
};

 
  const handleOtpSent = () => {
    try{
      const otpdata = {
        'email':email
      }
      if(email === ""){
        toast.warn("Email field is empty")
      }else{
        setIsLoading(true)
        setTimeout(() => {
          getOtpResponseByEmail(otpdata)
          .then(resp => resp.json())
          .then(data => {
            console.log(data.detail)
            if(data.detail === 'Success Message'){
              toast.success(data.detail)
              setOtpSent(true)
              setIsLoading(false)
            }
          })
        }, 3000)
      }

    }catch(error){
      setIsLoading(false)
      console.log("Error sending OTP", error)
    }
  }

  // const handleVerifyandChangePassword = () => {
  //   try{
  //     const resetData = {
  //       email,
  //       password,
  //       otp: otp.join('')
  //     }
  //     if (joinedOtp.length !== 6 || password === "" || confirmPassword === "") {
  //       toast.warn("All fields are required");
  //       return;
  //     }else if(password !== confirmPassword){
  //       alert("Password do not match")
  //     }
  //     else{
  //       setIsLoading(true)
  //       setTimeout(() => {
  //         resetPasswordWithOTP(resetData)
  //         .then(resp => resp.json())
  //         .then(data => {
  //           if(data.success){
  //             alert(data.success)
  //             navigate('/')
  //             setEmail("")
  //             setOtp(['', '', '', '', '', '']);
  //             setPassword("")
  //             setConfirmPassword("")
  //             setIsLoading(false)
  //           }else if(data.notmatch){
  //             toast.warn(data.notmatch)
  //             setIsLoading(false)
  //           }else if(data.detail){
  //             alert(data.detail)
  //             setIsLoading(false)
  //           }
            
  //         })
  //       }, 1000)
        
  //     }

  //   }catch(error){
  //     if(error){
  //       setIsLoading(false)
  //       console.log("Error sending OTP", error)
  //     }
  //   }
  // }


  const handleVerifyandChangePassword = async () => {
  const joinedOtp = otp.join('');

  if (joinedOtp.length !== 6 || !password || !confirmPassword) {
    toast.warn("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    toast.warn("Passwords do not match");
    return;
  }

  try {
    setIsLoading(true);

    const resetData = {
      email,
      password,
      otp: joinedOtp
    };

    const resp = await resetPasswordWithOTP(resetData);
    const data = await resp.json();

    if (data.success) {
      toast.success(data.success);
      navigate('/');
      setEmail("");
      setOtp(['','','','','','']);
      setPassword("");
      setConfirmPassword("");
    } else if (data.notmatch) {
      toast.warn(data.notmatch);
    } else if (data.detail) {
      toast.warn(data.detail);
    }

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  
const isDisabled = email.length === 0;
const isDisabledOTP =
  otp.join('').length !== 6 ||
  password.length === 0 ||
  confirmPassword.length === 0;

  return (
    <>

<ContainerTitle>
  <div className="authincation w-100" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-5">
            <h4 className="text-center mb-4 fw-bold">Forgot Password?</h4>

            {!otpSent && (
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h6 className="font-weight-light">{t('enterotp')}</h6>
                <form method="POST" className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={t('email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {isLoading ? (
                    <div className="mt-3">
                      <a className="btn btn-primary w-100">
                        REQUESTING & SENDING...
                      </a>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <button disabled={isDisabled} onClick={() => handleOtpSent()} className="btn btn-primary w-100">
                        {t('sendotp')}
                      </button>
                    </div>
                  )}

                  <div className="text-center mt-4 font-weight-light">
                    <Link to="/" className="btn btn-block btn-facebook auth-form-btn">
                      {t('registered')}
                    </Link>
                  </div>
                </form>
              </div>
            )}

            {otpSent && (
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h6 className="font-weight-light">
                  Enter OTP sent to your email or phone no. & Change Password Respectively.
                </h6>
                <form method="POST" className="pt-3">
                  <div className="d-flex justify-content-between gap-2 mb-4">
                    {otp.map((val, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={val}
                        onChange={(e) => handleChange(e, index)}
                        maxLength={1}
                        className="form-control text-center fw-bold"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          fontSize: "1.5rem",
                          borderRadius: "10px"
                        }}
                      />
                    ))}
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control "
                      placeholder="Enter New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <CountDownTimerForgotPassword email={email} />
                  </div>

                  {isLoading ? (
                    <div className="mt-3">
                      <a className="btn btn-primary w-100">
                        CONNECTING TO SERVICE...
                      </a>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <button
                        disabled={isDisabledOTP}
                        onClick={handleVerifyandChangePassword}
                        className="btn btn-primary w-100"
                      >
                        CONFIRM & CHANGE
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</ContainerTitle>
    </>
  )
}


export default ForgotPassword