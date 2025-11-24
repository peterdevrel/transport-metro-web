import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const FarmContext = createContext()


const FarmContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

       
    const [farmName, setFarmName] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [acreage, setAcreage] = useState("")

    const [farmdata, setFarmData]= useState([])
    const [farmerFarmData, setFarmerFarmData]= useState([])
    const [farmerLoanData, setFarmerLoanData]= useState([])
    const [farmerFarmManagerData, setFarmerFarmManagerData]= useState([])
    const [myFarmLoanData, setMyFarmLoanData]= useState([])
    const [FarmArrayData, setFarmArrayData]= useState([])
    const [FarmVisitData, setFarmVisitData]= useState([])





     const createFarm = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/api/farms/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            alert('Low Network connection', error)
        }
    }
  

    const getAllFarm = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/api/farms/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            }).then(resp => resp.json())
            .then(response => {
                // console.log(response)
                if(response){
                    setPlanData(response.data)
                }else{
                    alert("Network Error...")
                }
            })
        } catch (error) {
            alert('Low Network connection', error)
        }
    }

     const updateFarmEnrollmentStatus = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/farm/enroll/status/`, {
                    method: 'PATCH',
                    credentials:'include',
                    headers: {
                        // 'Authorization': `Bearer ${access}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                
            } catch (error) {
                console.log(error)
            }
           
          }

    const getFarmerFarm = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/api/farms/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log(response)
                setFarmerFarmData(data)
                
            })
        } catch (error) {
            alert('Low Network connection', error)
        }
    }

    // const getMyFarmLoan = () => {
    //     try {
    //         return fetch(`${import.meta.env.VITE_BASE_URL}f/api/loans/`,{
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         }).then(resp => resp.json())
    //         .then(data => {
    //             // console.log(response)
    //             setFarmMyLoanData(data)
                
    //         })
    //     } catch (error) {
    //         alert('Low Network connection', error)
    //     }
    // }

  const getVerifyFarmLoanAuthorizationCard = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/verify/farmer/loan/authorization/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    const patchFarmerLoan= (id, body) => {
        if (!id) {
                console.error(' ID is null or undefined');
                return
             }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/api/loans/${id}/`,{
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    


        const getFarmerLoan = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/get_farmer_loan/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    purpose: data[i].reason,
                    disburse: data[i].disburse,
                    approved_balance: data[i].approved_balance,
                    loan_year: data[i].loan_year,
                    amount: data[i].amount,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    authorization_code: data[i].authorization_code,
                    created_at: data[i].created_at,
                    farmer_id : data[i].farmer?.id,
                    farm:{
                        id: data[i].farm?.id,
                        farmer: data[i].farm?.farmer,
                        name: data[i].farm?.name,
                        latitude: data[i].farm?.latitude,
                        longitude: data[i].farm?.longitude,
                        acreage: data[i].farm?.acreage,
                    },
                    farmer : {
                        id: data[i].farmer?.id,
                        profile_pic: data[i].farmer?.profile_pic,
                        first_name: data[i].farmer?.first_name,
                        last_name: data[i].farmer?.last_name,
                        nimc_no: data[i].farmer?.nimc_no,
                        email: data[i].farmer?.email,
                        title: data[i].farmer?.title,
                        middle_name: data[i].farmer?.middle_name,
                        dob: data[i].farmer?.dob,
                        place_of_birth: data[i].farmer?.place_of_birth,
                        mobile: data[i].farmer?.mobile,
                        address: data[i].farmer?.address,
                        customer_id: data[i].farmer?.customer_id,
                        customer_code: data[i].farmer?.customer_code,                      
                        marital_status: data[i].farmer?.marital_status,
                        sex: data[i].farmer?.sex,
                        category: data[i].farmer?.category,
                        country: data[i].farmer?.country,
                        state: data[i].farmer?.state,
                        lga: data[i].farmer?.lga,
                        ward: data[i].farmer?.ward
                    }
                  })
                }         
                setFarmerLoanData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const updateAndVerifyFarmerLoanAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/update_verify_farmer_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }


    const repayFarmerLoan = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/process_farmer_loan_repayment/`,{
                method: 'POST',
                credentials:'include',
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


     const getFarmerFarmManager = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/get_farmer_farm/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    name: data[i].name,
                    latitude: data[i].latitude,
                    longitude: data[i].longitude,
                    acreage: data[i].acreage,
                    created_at: data[i].created_at,
                    farmer : {
                        id: data[i].farmer?.id,
                        profile_pic: data[i].farmer?.profile_pic,
                        first_name: data[i].farmer?.first_name,
                        last_name: data[i].farmer?.last_name,
                        nimc_no: data[i].farmer?.nimc_no,
                        email: data[i].farmer?.email,
                        title: data[i].farmer?.title,
                        middle_name: data[i].farmer?.middle_name,
                        dob: data[i].farmer?.dob,
                        place_of_birth: data[i].farmer?.place_of_birth,
                        mobile: data[i].farmer?.mobile,
                        address: data[i].farmer?.address,
                        customer_id: data[i].farmer?.customer_id,
                        customer_code: data[i].farmer?.customer_code,                      
                        marital_status: data[i].farmer?.marital_status,
                        sex: data[i].farmer?.sex,
                        category: data[i].farmer?.category,
                        country: data[i].farmer?.country,
                        state: data[i].farmer?.state,
                        lga: data[i].farmer?.lga,
                        ward: data[i].farmer?.ward
                    }
                  })
                }         
                setFarmerFarmManagerData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

           const getMyFarmLoan = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/api/my/farm/loan/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    purpose: data[i].reason,
                    disburse: data[i].disburse,
                    approved_balance: data[i].approved_balance,
                    loan_year: data[i].loan_year,
                    amount: data[i].amount,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    authorization_code: data[i].authorization_code,
                    created_at: data[i].created_at,
                    farmer_id : data[i].farmer?.id,
                    farm:{
                        id: data[i].farm?.id,
                        farmer: data[i].farm?.farmer,
                        name: data[i].farm?.name,
                        latitude: data[i].farm?.latitude,
                        longitude: data[i].farm?.longitude,
                        acreage: data[i].farm?.acreage,
                    },
                    farmer : {
                        id: data[i].farmer?.id,
                        profile_pic: data[i].farmer?.profile_pic,
                        first_name: data[i].farmer?.first_name,
                        last_name: data[i].farmer?.last_name,
                        nimc_no: data[i].farmer?.nimc_no,
                        email: data[i].farmer?.email,
                        title: data[i].farmer?.title,
                        middle_name: data[i].farmer?.middle_name,
                        dob: data[i].farmer?.dob,
                        place_of_birth: data[i].farmer?.place_of_birth,
                        mobile: data[i].farmer?.mobile,
                        address: data[i].farmer?.address,
                        customer_id: data[i].farmer?.customer_id,
                        customer_code: data[i].farmer?.customer_code,                      
                        marital_status: data[i].farmer?.marital_status,
                        sex: data[i].farmer?.sex,
                        category: data[i].farmer?.category,
                        country: data[i].farmer?.country,
                        state: data[i].farmer?.state,
                        lga: data[i].farmer?.lga,
                        ward: data[i].farmer?.ward
                    }
                  })
                }         
                setMyFarmLoanData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
   
     const addFarmVisit = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/api/visits/`,{
                method: 'POST',
                credentials:'include',
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


     const getFarmForVisit = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/get_farmer_farm/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let farmArray = []
                for (var i = 0; i < count; i++){
                    farmArray.push({
                    value: data[i].id,
                    label: data[i].name,
                    
                  })
                }         
                setFarmArrayData(farmArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

     const getFarmAllVisit = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}f/get_location_farm_visit/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                 var count = Object.keys(data).length;
                let farmArray = []
                for (var i = 0; i < count; i++){
                  farmArray.push({
                    id: data[i].id,
                    latitude: data[i].latitude,
                    longitude: data[i].longitude,
                    created_at: data[i].created_at,
                    farm:{
                        id: data[i].farm?.id,
                        farmer: data[i].farm?.farmer,
                        name: data[i].farm?.name,
                        latitude: data[i].farm?.latitude,
                        longitude: data[i].farm?.longitude,
                        acreage: data[i].farm?.acreage,
                    },
                    officer : {
                        id: data[i].officer?.id,
                        profile_pic: data[i].officer?.profile_pic,
                        first_name: data[i].officer?.first_name,
                        last_name: data[i].officer?.last_name,
                        nimc_no: data[i].officer?.nimc_no,
                        email: data[i].officer?.email,
                        title: data[i].officer?.title,
                        middle_name: data[i].officer?.middle_name,
                        dob: data[i].officer?.dob,
                        place_of_birth: data[i].officer?.place_of_birth,
                        mobile: data[i].officer?.mobile,
                        address: data[i].officer?.address,                
                        sex: data[i].officer?.sex,
                        category: data[i].officer?.category,
                        country: data[i].officer?.country,
                        state: data[i].officer?.state,
                        lga: data[i].officer?.lga,
                        ward: data[i].officer?.ward
                    }
                  })
                }
                setFarmVisitData(farmArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

  return (
    <FarmContext.Provider value={{
        createFarm,
        getAllFarm,
        farmdata, setFarmData,
        farmName, setFarmName,
        latitude, setLatitude,
        longitude, setLongitude,
        acreage, setAcreage,
        updateFarmEnrollmentStatus,
        farmerFarmData, setFarmerFarmData,
        getFarmerFarm,
        getVerifyFarmLoanAuthorizationCard,
        farmerLoanData, setFarmerLoanData,
        getFarmerLoan,
        patchFarmerLoan,
        updateAndVerifyFarmerLoanAuthorization,
        repayFarmerLoan,
        getFarmerFarmManager,
        farmerFarmManagerData, setFarmerFarmManagerData,
        myFarmLoanData, setMyFarmLoanData,
        getMyFarmLoan,
        addFarmVisit,
        getFarmForVisit,
        FarmArrayData, setFarmArrayData,
        getFarmAllVisit,
        FarmVisitData, setFarmVisitData

    }}>

      {children}

    </FarmContext.Provider>
  )
}

export default FarmContextProvider

export const useFarm = () => useContext(FarmContext)
