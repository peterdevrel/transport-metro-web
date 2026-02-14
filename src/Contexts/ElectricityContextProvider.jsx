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
    const [ ServiceData, setServiceData,] = useState([])
    const [ ServiceElectricityData, setServiceElectricityData] = useState([])
    const [verifyingData, setVerifyingData] = useState([])
    const [commission, setCommission] = useState([])
    const [querydata, setQueryData] = useState([])
    const [requestIddata, setRequestIdData] = useState("")
    const [billdata, setBillData] = useState([])
    const [dataVariationData, setDataVariationData] = useState([])
    const [airtimeServiceData, setAirtimeServiceData] = useState([])
    const [educationServiceData, setEducationServiceData] = useState([])
    const [allCountryAirtimeData, setAllCountryAirtimeData] = useState([])
    const [productTypeData, setProductTypeData] = useState([])
    const [operatorData, setOperatorData] = useState([])
    const [internationalVariationData, setInternationalVariationData] = useState([])
    const [internationalServiceData, setInternationalServiceData] = useState([])

  
  
   
   
   
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
        return fetch(`${import.meta.env.VITE_BASE_URL}service/get/bill/invoice/${userId}/`,{
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
        return fetch(`${import.meta.env.VITE_BASE_URL}service/verify-electricity-merchant/`,{
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
        return fetch(`${import.meta.env.VITE_BASE_URL}service/purchase/electricity/`,{
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


  const purchaseData = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}service/purchase/data/`,{
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
        return fetch(`${import.meta.env.VITE_BASE_URL}service/query/electricity/${request_id}/`,{
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
            return fetch(`${import.meta.env.VITE_BASE_URL}service/electricity-services/`,{
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
                let serviceArray = []
                for (var i = 0; i < count; i++){
                    serviceArray.push({
                    value: res[i].serviceID,
                    label: res[i].serviceID,
                  })
                }               
                setServiceElectricityData(serviceArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    const getServiceData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}service/data-services/`,{
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
                let serviceArray = []
                for (var i = 0; i < count; i++){
                    serviceArray.push({
                    value: res[i].serviceID,
                    label: res[i].serviceID,
                  })
                }               
                setServiceData(serviceArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    const getAirtimeServiceData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}service/airtime-services/`,{
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
                let serviceArray = []
                for (var i = 0; i < count; i++){
                    serviceArray.push({
                    value: res[i].serviceID,
                    label: res[i].serviceID,
                  })
                }               
                setAirtimeServiceData(serviceArray)
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


const getDataVariation = (serviceID) => {
  try {
    return fetch(
      `${import.meta.env.VITE_BASE_URL}service/vtpass/data/variations/${serviceID}/`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("data", res.data);

        let serviceArray = res.data.map((item) => ({
          value: item?.variation_code,
          label: item?.name,
          amount: item?.amount,
        }));

        setDataVariationData(serviceArray);

         
      });
  } catch (error) {
    console.log(error);
  }
};

  const purchaseAirtime = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}service/purchase/airtime/`,{
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

      const getEducationServiceData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}service/educational-services/`,{
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
                let serviceArray = []
                for (var i = 0; i < count; i++){
                    serviceArray.push({
                    value: res[i].serviceID,
                    label: res[i].serviceID,
                  })
                }               
                setEducationServiceData(serviceArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

     const purchaseEducationalPin = (body) => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}service/purchase/education/`,{
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


  const getAllCountries = () => {
      fetch(`${import.meta.env.VITE_BASE_URL}service/airtime/countries/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res);

          const countries = res?.content?.countries || [];

          const serviceArray = countries.map((country) => ({
            value: country.code,
            label: `${country.name} (${country.currency})`,
            flag: country.flag,
            prefix: country.prefix,
            currency: country.currency,
          }));

          setAllCountryAirtimeData(serviceArray);
        })
        .catch((error) => {
          console.log("Poor network connection", error);
        });
  };


const getProductTypeData = async (countryCode) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}service/international/product-types/?code=${countryCode}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const res = await response.json();

    console.log("data", res);

    // Make sure res.content exists before mapping
    if (!res.content) return;

    const productTypes = res.content.map((item) => ({
      value: item.product_type_id,
      label: item.name,
    }));

    setProductTypeData(productTypes);
  } catch (error) {
    console.error("Error fetching product types:", error);
  }
};


const getOperatorData = async (countryCode, productTypeId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}service/international/operators/?code=${countryCode}&product_type_id=${productTypeId}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const res = await response.json();

    console.log("Operators API response:", res);

    // Make sure res.content exists and is an array
    if (!res.content || !Array.isArray(res.content)) {
      setOperatorData([]);
      return;
    }

    // Map to dropdown format
    const operators = res.content.map((item) => ({
      value: item.operator_id.toString(), // convert to string for <select>
      label: item.name,
    }));

    setOperatorData(operators);

  } catch (error) {
    console.error("Error fetching operators:", error);
    setOperatorData([]);
  }
};


const getVariationData = async (operatorId, productTypeId) => {
  try {
    if (!operatorId || !productTypeId) return;

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}service/international/variation-codes/?serviceID=foreign-airtime&operator_id=${operatorId}&product_type_id=${productTypeId}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const res = await response.json();
    console.log("Variation API response:", res);

    if (!res.content?.variations || !Array.isArray(res.content.variations)) {
      setInternationalVariationData([]);
      return;
    }

    // Map to dropdown format
    const variations = res.content.variations.map((item) => ({
      value: item.variation_code,   // required for purchase
      label: item.name,             // display name
      amount: item.variation_amount // optional for display
    }));

    setInternationalVariationData(variations);
  } catch (error) {
    console.error("Error fetching variations:", error);
    setInternationalVariationData([]);
  }
};


   const getInternationService = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}service/international-services/`,{
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
                let serviceArray = []
                for (var i = 0; i < count; i++){
                    serviceArray.push({
                    value: res[i].serviceID,
                    label: res[i].serviceID,
                  })
                }               
                setInternationalServiceData(serviceArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


  return (
    <ElectricityContext.Provider value={{
      CreateUtilityPayment,
       CreateUtilityInvoice,
        VerifyElectricityData, 
        setVerifyElectricityData,
        getVerifyElectricityMerchant,
        getElectricityServiceData,
        ServiceElectricityData, setServiceElectricityData,
        ServiceData, setServiceData,
        getServiceData,
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
        commission, setCommission,
        purchaseData,
        getDataVariation,
        dataVariationData, setDataVariationData,
        getAirtimeServiceData,
        airtimeServiceData, setAirtimeServiceData,
        purchaseAirtime,
        getEducationServiceData,
        educationServiceData, setEducationServiceData,
        purchaseEducationalPin,
        getAllCountries,
        allCountryAirtimeData, setAllCountryAirtimeData,
        getProductTypeData,
        productTypeData, setProductTypeData,
        getOperatorData,
        operatorData, setOperatorData,
        getVariationData,
        internationalVariationData, setInternationalVariationData,
        getInternationService,
        internationalServiceData, setInternationalServiceData

    }}>

      {children}

    </ElectricityContext.Provider>
  )
}

export default ElectricityContextProvider

export const useElectricity = () => useContext(ElectricityContext)
