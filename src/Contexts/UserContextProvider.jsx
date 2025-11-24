import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import axiosInstance from './axiosInstance'; // your interceptor setup file


const AuthContext = createContext()

const UserContextProvider = ({children}) => {
  

  

  const userId = localStorage.getItem('userId')
  const access = localStorage.getItem('access')
  const usercid = localStorage.getItem('usercid')

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [loggedIn, setIsLoggedIn] = useState(false)

  // data
  const [userdata, setUserData] = useState([])
  const [profiledata, setProfileData] = useState([])

  const [totalwalletbalanceinvault, setTotalWalletBalanceInVault] = useState([])
  const [page, setPage] = useState([])
  const [paymentDetailData, setPaymentDetailData] = useState([])
  const [accessPage, setAccessPage] = useState([])
  const [userCounts, setUserCounts] = useState({});







const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

  const AuthenticateUser = (body) => {
    try {
      return fetch(`${import.meta.env.VITE_BASE_URL}auth/token/`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(body)
      })
    } catch (error) {
      alert('Check your network connection')
    }
  }

const getProfileUser = async () => {
  if (!userId) {
    console.warn("UserId missing, skipping fetch.");
    return null;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}user/get/profile/${userId}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.status === 401) {
      console.log("Access token expired, refreshing...");
      const refreshed = await refreshAccessToken();

      if (refreshed) return getProfileUser();
      
      alert("Your session has expired. Please sign in again.");
      redirectToLogin();
      return null;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile fetch failed:", response.status, errorText);
      throw new Error("Error fetching profile");
    }

    const data = await response.json();
    setProfileData(data);
    return data;

  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("An error occurred while fetching your profile.");
    throw error;
  }
};

  

// const getProfileUser = async () => {
//   if (!userId) {
//     console.warn("UserId is loading!");
//     return;
//   }

//   try {
//     const response = await axiosInstance.get(`v/user/profile/${userId}/`);
//     setProfileData(response.data);
//     return response.data; // for Promise.all
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     throw error;
//   }
// };



  const sendMessageTransaction = (body) => {
    try {
      return fetch(`${import.meta.env.VITE_BASE_URL}user/send/message/`,{
        method: 'POST',
        credentials: 'include',
        headers:{
          'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
          // setProfileData(data)
      })
    } catch (error) {
      
    }
  }

  const getOtpResponseByEmail = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/get/otp/by/email/`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    
        
}

const resetPasswordWithOTP = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/reset/password/`,{
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    
        
}

  const getOtpPin = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/get/otp/pin/reset/`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    })
    
        
}

const resetPinWithOTP = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/reset/pin/access/`,{
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Content-Type': "application/json",
            // 'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(body)
    })
    
        
}




const getTotalWalletInVault = () => {
  try {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/total/wallet/balance/`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${access}`
      },
    }).then(resp => resp.json())
    .then(data => {
      // console.log(data)
      setTotalWalletBalanceInVault(data?.total_balance)
    })
  } catch (error) {
    alert('Check your network connection')
  }
}



const getPageStatus = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}user/api/page/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setPage(data);  // ✅ make sure this is correct
  } catch (error) {
    console.error("Failed to fetch page status", error);
  }
};



const getStateCategoryChartFromDB = () => {
  try {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/chart/category/`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${access}`
      },
    })
  } catch (error) {
    alert('Check your network connection')
  }
}


const getGenderChartFromDB = () => {
  try {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/gender/chart/`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${access}`
      },
    })
  } catch (error) {
    alert('Check your network connection')
  }
}


const getLoanStatusChart = (year) => {
  try {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/total/loan/chart/${year}/`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${access}`
      },
    })
  } catch (error) {
    alert('Check your network connection')
  }
}

const getStipendStatusChart = (year) => {
  try {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/total/stipend/chart/${year}`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${access}`
      },
    })
  } catch (error) {
    alert('Check your network connection')
  }
}





const sendSms = (body)=> {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}v/send/sms/`,{
          method: 'POST',
          // credentials: 'include',
          headers: {
              'Content-type': 'application/json',
              // 'Authorization': `Bearer ${access}`
          },
          body: JSON.stringify(body)
      })
  } catch (error) {
      console.log(error)
  }
}



function maskEmail(email) {
  if (!email || !email.includes('@')) return ''; // or return email if you want to show it as-is

  const [name, domain] = email.split('@');
  const maskedName = name.length <= 2 
    ? name[0] + '*'.repeat(name.length - 1) 
    : name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];

  return `${maskedName}@${domain}`;
}


const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}user/auth/logout/`, {
      method: "POST",             // 🔥 Required: Django expects POST
      credentials: "include",     // 🔥 Required: send cookies
    });

    if (response.ok) {
      console.log("Logged out");
      // Clear user context or redirect
    } else {
      console.error("Logout failed with status:", response.status);
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


  const refreshAccessToken = async () => {
  try {
    console.log("Attempting to refresh access token...");
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}user/auth/refresh/token/`, {
      method: 'POST',
      credentials: 'include',
    });

    console.log("Refresh token response status:", response.status);

    if (!response.ok) {
      throw new Error('Refresh token failed');
    }

    const data = await response.json();
    console.log("New access token received");

    // No need to save access token locally if you're using HttpOnly cookie,
    // but if you do, handle here.

    return true;
  } catch (error) {
    console.error('Refresh token error:', error);
    return false;
  }
};


  const formatMoney = (currency) => {
    // const dollars = cents / 100;
    return currency.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  const resendOtp = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/resend_otp/`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': "application/json",
            // 'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(body)
    })
}

  const resendForgotPasswordOtp = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/resend_otp_forgot_password/`,{
        method: 'POST',
        headers:{
            'Content-Type': "application/json",
            // 'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(body)
    })
    
        
}



  
      const getAccessStatus = () => {
        try {
          return fetch(`${import.meta.env.VITE_BASE_URL}user/api/login-access-views/`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(resp => resp.json())
          .then(data => {
            // console.log('page',data)
            setAccessPage(data)
          })
        } catch (error) {
          alert('Check your network connection')
          console.log(error.message)
        }
      }


  const fetchUserCounts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}user/api/user-counts/`,{
          credentials:'include'
        }); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data)
        setUserCounts(data); // set state with API data
      } catch (err) {
        setError('Failed to fetch user counts');
      } 
    };


  return (
    <AuthContext.Provider value={{ 
        email, setEmail,
        password, setPassword,
        userdata, setUserData,
        AuthenticateUser,
        loggedIn, setIsLoggedIn,
        logout,
        getProfileUser,
        profiledata, setProfileData,
        getOtpResponseByEmail,
        resetPasswordWithOTP,
        getOtpPin,
        resetPinWithOTP,
        sendMessageTransaction,
        totalwalletbalanceinvault, setTotalWalletBalanceInVault,
        getTotalWalletInVault,
        getPageStatus,
        page, setPage,
        getStateCategoryChartFromDB,
        getGenderChartFromDB,
        getLoanStatusChart,
        getStipendStatusChart,
        paymentDetailData, setPaymentDetailData,
        maskEmail,
        sendSms,
        refreshAccessToken,
        formatMoney,
         getAccessStatus,
        accessPage, setAccessPage,
        resendOtp,
        resendForgotPasswordOtp,
        fetchUserCounts,
        userCounts, setUserCounts
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default UserContextProvider

export const useAuthContext = () => useContext(AuthContext)