import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
// import {createHmac} from 'crypto'

const ElectricityContext = createContext()


const ElectricityContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

    const [service, setService] = useState('')
    const [billercodeNumber, setBillerCodeNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [amount, setAmount] = useState('')
    const [name, setName] = useState('')
   
    
    const [ type, setType] = useState('')
    const [VerifyElectricityData, setVerifyElectricityData] = useState([])
    const [ServiceElectricityData, setServiceElectricityData] = useState([])
    const [verifyingData, setVerifyingData] = useState([])
    const [commission, setCommission] = useState([])
    const [querydata, setQueryData] = useState([])
    const [requestIddata, setRequestIdData] = useState("")
    const [billdata, setBillData] = useState([])
  
  
   
   
   
    const CreateUtilityInvoice = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/api/utility/invoice/`,{
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
          body: JSON.stringify(body)
        })
      }catch(error){
        console.log(error)
      }
    }

    
    const getUtilityPaymentByUserId = (userId) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/get/bill/invoice/${userId}/`,{
          method: 'GET',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        }
        }).then(response => response.json())
        .then(data => { 
            setBillData(data)
        })
      }catch(error){
        console.log(error)
      }
    }

   
    const CreateUtilityPayment = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/api/utility/bill/payment/`,{
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
          body: JSON.stringify(body)
        })
      }catch(error){
        console.log(error)
      }
    }


    const getVerifyElectricityMerchant = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/verify-electricity-merchant/`,{
          method: 'POST',
          credentials: 'include',      
          headers:{
            // 'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(body)
        })
      }catch(error){
        console.log(error)
      }
    }


  const purchaseElectricity = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/purchase/electricity/`,{
          method: 'POST',
          credentials: 'include', 
          headers:{
              // 'Authorization': `Bearer ${access}`,
              'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(body)
        })
      }catch(error){
        console.log(error)
      }
    }


    const getQueryBillerByRequestId = (request_id) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/query/electricity/${request_id}/`,{
          method: 'POST',
          credentials: 'include',
          headers:{
              // 'Authorization': `Bearer ${access}`,
              'Content-Type': 'application/json'
          }, 
        })
        .then(response => response.json())
        .then(res => {
          console.log('data', res.data)
          console.log(Array.isArray(res))
          setQueryData(res.data)
        })
      }catch(error){
        console.log(error)
      }
    }

    
    const getElectricityServiceData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/electricity/service/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => { 
                // console.log(res)
                var count = Object.keys(res).length;
                let currencyArray = []
                for (var i = 0; i < count; i++){
                    currencyArray.push({
                    value: res[i].service_id,
                    label: res[i].name,
                    subaccount: res[1].subaccount
                  })
                }               
                setServiceElectricityData(currencyArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getCommission = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/commission/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => { 
                // console.log(res)
                var count = Object.keys(res).length;
                let commissionArray = []
                for (var i = 0; i < count; i++){
                  commissionArray.push({
                    id: res[i].commission,
                    commission: res[i].commission,
                  })
                }               
                setCommission(commissionArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    
    const getBillerRequestId = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/biller/request/id`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => { 
                // console.log(res)     
                setRequestIdData(res)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const generateRequestId = () => {
        const now = new Date();
      
        // Format date-time in YYYYMMDDHHII
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
      
        const dateTimeString = `${year}${month}${day}${hours}${minutes}`;
      
        // Generate a random alphanumeric string (e.g., 12 characters)
        const randomString = Math.random().toString(36).substring(2, 14);
      
        // Concatenate to form the Request ID
        return `${dateTimeString}${randomString}`;
      };

      const getVerifyElectricityPaymentRef = (ref)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/electricity/payment/${ref}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
        } catch (error) {
            console.log(error)
        }
      }

   
  return (
    <ElectricityContext.Provider value={{
      CreateUtilityPayment,
       CreateUtilityInvoice,
        VerifyElectricityData, 
        setVerifyElectricityData,
        getVerifyElectricityMerchant,
        ServiceElectricityData, setServiceElectricityData,
        getElectricityServiceData,
        service, setService,
        billercodeNumber, setBillerCodeNumber,
        type, setType,
        verifyingData, setVerifyingData,
        purchaseElectricity,
        getBillerRequestId,
        requestIddata, setRequestIdData,
        phone, setPhone,
        amount, setAmount,
        generateRequestId,
        querydata, setQueryData,
        getQueryBillerByRequestId,
        name, setName,
        getVerifyElectricityPaymentRef,
        billdata, setBillData,
        getUtilityPaymentByUserId,
        getCommission,
        commission, setCommission
    }}>

      {children}

    </ElectricityContext.Provider>
  )
}

export default ElectricityContextProvider

export const useElectricity = () => useContext(ElectricityContext)
