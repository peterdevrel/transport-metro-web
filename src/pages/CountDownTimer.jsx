import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/UserContextProvider";

const CountdownTimer = ({ onExpire }) => {


    const {
      resendOtp
    } = useAuthContext()


  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes = 300 seconds
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExpired(true);
      onExpire?.(); // Call optional callback if OTP expires
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Clean up
  }, [secondsLeft, onExpire]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60).toString().padStart(2, "0");
    const sec = (secs % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

const sendOtp = async () => {
    try {
      const res = await resendOtp(); // ✅ call context method
      const data = await res.json();

      if (res.ok) {
        alert(data.success || "New OTP sent.");
        setSecondsLeft(300); // Reset countdown
        setExpired(false);   // Hide resend button
      } else {
        alert(data.error || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("OTP resend error:", err);
      alert("Network error. Please try again.");
    }
  };
 

  return (
    <div className="flex items-center justify-between text-lg font-semibold text-red-600">
  <span>OTP expires in: {formatTime(secondsLeft)}</span>

  {expired && (
    <button onClick={sendOtp} type="button" className="btn btn-success ml-4">
      Resend OTP
    </button>
  )}
</div>
  );
};

export default CountdownTimer;
