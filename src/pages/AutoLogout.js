import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/UserContextProvider";
import { useJobContext } from "../Contexts/JobContextProvider";
import { toast } from "react-toastify";

const AutoLogout = ({ timeout = 600000 }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData, setProfileData, logout } = useAuthContext();
  const { setQuizAttemptTime } = useJobContext();

  const timeoutRef = useRef(null);

  const logOut = () => {
    toast.success("You have been logged out due to inactivity.");
    localStorage.clear();
    setQuizAttemptTime("");
    setUserData("");
    setProfileData("");
    setIsLoggedIn(false);
    navigate("/");
    logout();
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logOut, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeout]);

  return null;
};

export default AutoLogout;
