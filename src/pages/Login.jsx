import { useTranslation } from "react-i18next";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from '../Contexts/UserContextProvider'
import { toast } from 'react-toastify'
import Colors from '../Utils/Colors'
import Translate from '../Components/Translate'
import { useEffect } from 'react'
import { ClipLoader } from "react-spinners";



export default function Login() {

 


  const { t, i18n } = useTranslation();

  
  const navigate = useNavigate()

  const {
    email, 
    setEmail, 
    password, 
    setPassword, 
    setIsLoggedIn, AuthenticateUser,
    setUserData,
    getProfileUser,
    profiledata,
    getAccessStatus,
    accessPage,
  } = useAuthContext()

  const [isLoading, setIsLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true);
  

  const handleFinish = () => {
    setShowOnboarding(false);
  };
 

  // if (!fullName.trim() || !email.trim()) {
  //   alert("Name or Email is invalid");
  //   return;
  // }

  useEffect(() => {
  getAccessStatus()
},[])




  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={Colors.WHITE} size={50} />
      </div>
    );
  }


const onLogin = () => { 
  const userData = { email, password };

  try {
    if(email === "" || password === ""){
      alert("Email and password field is empty");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      AuthenticateUser(userData)
        .then(resp => resp.json())
        .then(async data => {  // 🌟 Make this async so we can await getProfileUser
          setUserData(data);

          // 🌟 Save to localStorage BEFORE getProfileUser
          localStorage.setItem('userId', data.user_id);
          localStorage.setItem('access', data.access);
          localStorage.setItem('user_option', data.user_option);

          // 🌟 Wait for profile to load
          await getProfileUser(data.user_id);

          // 🌟 Then handle navigation and toast
          setIsLoggedIn(true);

          if(data.user_option === 'terminal' || data.user_option === 'commuter' || data.user_option === 'staff' || data.user_option === 'admin') {
            setIsLoading(true)
            toast.success('You have successfully login');
            navigate(`/protected/dashboard`);
          } else if(data.email !== email || data.password !== password){
            toast.warn(`${email} and ${password} do not match any record`);
            setIsLoggedIn(false);
          } else {
            toast.warn('You are not authorised to use this app');
            setIsLoggedIn(false);
          }

          setIsLoading(false);
          setEmail("");
          setPassword("");
        })
        .catch(error => {
          toast.warn("Check your Internet connection...", error);
          setIsLoading(false);
          setIsLoggedIn(false);
        });
    }, 500);

  } catch (error) {
    toast.warn("Check your connection");
    setIsLoading(false);
    setIsLoggedIn(false);
  }
};


 // =====================================================
  // ========== EXIT EARLY IF LOADING (SAFE NOW) ==========
  // =====================================================
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={Colors.WHITE} size={50} />
      </div>
    );
  }


  const isDisabled = email.length === 0 || password.length === 0;



  return (
   <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
  <div className="card p-4 shadow-sm" style={{ width: '350px', borderRadius: '12px' }}>
    <h2 className="text-center mb-4 text-primary">Login</h2>
     <form method='POST' onSubmit={(e) => {
            e.preventDefault(); // ⛔ prevent page reload
            onLogin();
          }} className="pt-3"
        >
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <a href="/forgot/password" className="text-decoration-none small">
          Forgot Password?
        </a>
        <a href="/create/user/home" className="text-decoration-none small">
          Sign Up
        </a>
      </div>
     
            <button disabled={isDisabled} onClick={() => onLogin()} type="submit" className="btn btn-primary w-100">
              Login
            </button>
        
    </form>

    
  </div>
</div>

  );
}
