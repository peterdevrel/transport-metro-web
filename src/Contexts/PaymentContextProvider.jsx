import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const PaymentContext = createContext()

const PaymentContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    
     

    const [amount, setAmount ] = useState("")
    const [paymenttype, setPaymentType] = useState("")
    const [feestype, setFeesType] = useState("")
    const [description, setDescription ] = useState("")
    const [PaymentDetail, setPaymentDetail] = useState("")
    const [recievedby, setRecievedBy] = useState("")
    const [status, setStatus] = useState("")
    const [collectiondate, setCollectionDate] = useState("")
    const [feesData, setFeesData] = useState([])
    const [paymentTypeData, setPaymentTypeData] = useState([])
    const [mypaymentData, setMyPaymentData] = useState([])
    const [cashpaymentdata, setCashPaymentData ] = useState([])
    const [savingData, setSavingData ] = useState([])
    const [savingPaymentData, setSavingPaymentData, ] = useState([])


     const getAllFeeTypeData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/feetypes/`,{
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
                let feesArray = []
                for (var i = 0; i < count; i++){
                    feesArray.push({
                    id: res[i].id,
                    value: res[i].name,
                    label: res[i].name,
                    amount: res[i].amount,
                    subaccount: res[i].subaccount,
                  })
                }               
                setFeesData(feesArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

     const getAllMyPaymentData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/mypayments/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(data => { 
                // console.log(data)
                setMyPaymentData(data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

     const getAllCashPaymentData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/cash-payments/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(data => { 
                // console.log(data)
                setCashPaymentData(data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

  

     const getAllPaymentTypesData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/paymenttypes/`,{
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
                let feesArray = []
                for (var i = 0; i < count; i++){
                    feesArray.push({
                    id: res[i].id,
                    value: res[i].value,
                    label: res[i].name
                  })
                }               
                setPaymentTypeData(feesArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getDetailOfficeOfUser = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/office/information/${officeId}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setOfficeDetailData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const processCashPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/cash-payments/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateOfficeToDB = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/office/information/${id}/`,{
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: body
            })
        } catch (error) {
            console.log(error)
        }
    }


    const deleteResidential = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/profession/license/${id}/`,{
                method: 'DELETE',
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


       const getAllSavingPaymentData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/saving-payments/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(data => { 
                // console.log(data)
                setSavingPaymentData(data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

       const getAllSavingData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/savings/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(data => { 
                // console.log(data)
                setSavingData(data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }



     const currencyFormat = (value) => {
        return new Intl.NumberFormat('en-NG', {
             style:'currency',
             currency: 'NGN'
         }).format(value)
     }

    return (
        <PaymentContext.Provider value={{
            currencyFormat,
            amount, setAmount,
            paymenttype, setPaymentType,
            feestype, setFeesType,
            PaymentDetail, setPaymentDetail,
            getAllFeeTypeData,
            feesData, setFeesData,
            paymentTypeData, setPaymentTypeData,
            getAllPaymentTypesData,
             description, setDescription,
             getAllMyPaymentData, 
             mypaymentData, setMyPaymentData,
             processCashPayment,
             recievedby, setRecievedBy,
             status, setStatus,
             collectiondate, setCollectionDate,
             getAllCashPaymentData,
             cashpaymentdata, setCashPaymentData,
             getAllSavingPaymentData,
             savingPaymentData, setSavingPaymentData,
             savingData, setSavingData,
             getAllSavingData
        }}>
            {children}
        </PaymentContext.Provider>
    )
}


export default PaymentContextProvider

export const usePayment = () => useContext(PaymentContext)