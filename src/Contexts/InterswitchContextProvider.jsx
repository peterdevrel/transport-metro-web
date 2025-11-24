import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
import Swal from 'sweetalert2';




const interswitchContext = createContext()


const InterswitchContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')


    const [clientName, setClientName] = useState("")
    const [clientShortCode, setclientShortCode] = useState("")
    const [clientContact, setclientContact] = useState("")
    const [clientType, setclientType] = useState("")
    const [redirectUri, setredirectUri] = useState("")
    const [accountType, setaccountType] =useState("")
    const [accountId, setaccountId] =useState("")
    const [pin, setPin] =useState("")
    const [firstName, setFirstName] =useState("")
    const [nameOnCard, setNameOnCard] =useState("")
    const [lastName, setLastName] =useState("")
    const [mobileNr, setmobileNr] =useState("")
    const [emailAddress, setemailAddress] =useState("")
    const [streetAddress, setstreetAddress] =useState("")
    const [city, setCity] =useState("")
    const [state, setState] =useState("")
    const [countryCode, setCountryCode] =useState("")
    const [nin, setNin] =useState("")



    
    const [clientdata, setClientData]= useState([])
  
   const createInterswitchClient = async (body) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BASE_URL}switch/register_client/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}` // if needed
            },
            body: JSON.stringify(body)
            });

            // Check for HTTP errors
            if (!resp.ok) {
            const text = await resp.text();  // Use text() to see HTML error if json() fails
            throw new Error(`Request failed with status ${resp.status}: ${text}`);
            }

            const data = await resp.json();
            return data;

        } catch (error) {
            console.error("createInterswitchClient error:", error);
            throw error;
        }
        };


        const createInterswitchVirtualCard = async (body) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}switch/api/cards/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
            });

            return await response.json(); // Return parsed response
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
        };


   const verifyNIN = async (body) => {

     console.log("Payload to send:", body); // ✅ Add this
    console.log("JSON.stringify(body):", JSON.stringify(body)); 
        Swal.fire({
            title: 'Verifying NIN...',
            didOpen: () => Swal.showLoading(),
            allowOutsideClick: false,
        });

        try {
            const resp = await fetch(`${import.meta.env.VITE_BASE_URL}switch/verify/nin/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`,

                },
                body: JSON.stringify(body)  // Ensure body is an object, not undefined or null
            }
            );

            const contentType = resp.headers.get("content-type");
            if (!resp.ok) {
            if (contentType && contentType.includes("application/json")) {
                const errData = await resp.json();
                throw new Error(errData.error || "Request failed");
            } else {
                const text = await resp.text();
                throw new Error(`Request failed: ${text}`);
            }
            }

            const data = await resp.json();
            Swal.fire({
            title: 'NIN Verified!',
            text: JSON.stringify(data, null, 2),
            icon: 'success',
            confirmButtonText: 'OK',
            });

            return data;
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
            console.error("verifyNIN error:", error);
            throw error;
        }
        };



  
    
   
  return (
    <interswitchContext.Provider value={{
       createInterswitchClient,
       clientdata, setClientData,

       clientName, setClientName,
       clientShortCode, setclientShortCode,
       clientContact, setclientContact,
       clientType, setclientType,
       redirectUri, setredirectUri,

       createInterswitchVirtualCard,
       accountType, setaccountType,
       accountId, setaccountId,
       pin, setPin,
       firstName, setFirstName,
       nameOnCard, setNameOnCard,
       lastName, setLastName,
       mobileNr, setmobileNr,
       emailAddress, setemailAddress,
       streetAddress, setstreetAddress,
       city, setCity,
       state, setState,
       countryCode, setCountryCode,
       verifyNIN,
       nin, setNin
    }}>

      {children}

    </interswitchContext.Provider>
  )
}

export default InterswitchContextProvider

export const useInterswitch = () => useContext(interswitchContext)
