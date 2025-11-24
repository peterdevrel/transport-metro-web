import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Contexts/UserContextProvider";
import { useJobContext } from "./Contexts/JobContextProvider";

const AutoLogoutminutes = () => {
  const navigate = useNavigate();
    const {  
      setUserData, 
      setProfileData
  } = useAuthContext()
  
  
       const {
         setQuizAttemptTime
      } = useJobContext()
  const timeoutDuration = 2 * 60 * 1000; // 2 minutes
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Adjust this based on your authentication logic


  let timer;

  // Reset the timer on user activity
  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleLogout();
    }, timeoutDuration);
  };

  // Log the user out
  const handleLogout = () => {
    setIsLoggedIn(false); // Update state
    localStorage.removeItem('userId')
    localStorage.removeItem('access')
    localStorage.clear()
    setQuizAttemptTime("")
    setUserData("")
    setProfileData("")
    setIsLoggedIn(false)
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    // Set up event listeners for user activity
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start the timer
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  if (!isLoggedIn) {
    return <p>Logging out...</p>
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p>You will be logged out after 2 minutes of inactivity.</p>
    </div>
  );
};

export default AutoLogoutminutes;
