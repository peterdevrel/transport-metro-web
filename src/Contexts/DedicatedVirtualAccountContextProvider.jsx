import React, { createContext, useContext, useState } from 'react'


const DedicatedVirtualContext = createContext()


const DedicatedVirtualAccountContextProvider = ({children}) => {




    const access = localStorage.getItem('access')
    //array list
    const [provider, setProvider,] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    

    // Data
    const [virtualaccountdata, setVirtualAccountData] = useState([])
    const [listproviderdata, setListProviderData] = useState([])
    const [balance, setBalance] = useState([])
    const [transaction, setTransaction] = useState([])
    const [queryaccountbalance, setQueryAccountBalance] = useState([])
    const [dedicatedaccounttransaction, setDedicatedAccountTransaction] = useState([])
    const [transactionstatus, setTransactionStatus] = useState([])
    const [transactionchannel, setTransactionChannel] = useState([])    
    const [totalVolume, setTotalVolume] = useState([])




    const DedicatedAccountRegistration = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/create-dva/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getAccountBalance = () => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/balance`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },               
            }).then(resp => resp.json())
            .then(response => {
                // console.log('balance', response)
                setBalance(response.data[0].balance)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getQueryAccountBalance = (accountNumber,providerSlug) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/dedicated_account/requery?account_number=${accountNumber}&provider_slug=${providerSlug}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },               
            }).then(resp => resp.json())
            .then(response => {
                // console.log("Query Account >>", response)
                setQueryAccountBalance(response)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    const getDedicatedAccountTransaction = (dedicated_account_id) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/dedicated_account/${dedicated_account_id}/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },               
            }).then(resp => resp.json())
            .then(response => {
                // console.log("Dedicated Account >>", response)
                setDedicatedAccountTransaction(response)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }
    
    const getTransactionBalance = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/transaction?customer=${id}&channel=dedicated_nuban`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },               
            }).then(resp => resp.json())
            .then(response => {
                // console.log('transaction new >>', response)
                // console.log('meta new >>', response.meta)
                setTransactionStatus(response?.data?.status === "success")
                setTransactionChannel(response?.data?.channel === "dedicated_nuban")
                setTotalVolume(response?.meta?.total_volume)
                setTransaction(response?.data || {})
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }
    
    
    const getCustomerDedicatedAccount = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/api/dedicated-accounts/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('all >>', data)
                // console.log('dedicated >>>', response?.data?.dedicated_account || {})
                // setFirstName(response?.data?.first_name)
                // setLastName(response?.data?.last_name)
                // setVirtualAccountData(response?.data?.dedicated_accounts || {})
                setVirtualAccountData(data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const listAllVirtualAccountProvider = () => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/dedicated_account/available_providers/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res.data)
                var count = Object.keys(res.data).length;
                let providerArray = []
                for (var i = 0; i < count; i++){
                    providerArray.push({
                    value: res.data[i].provider_slug,
                    label: res.data[i].bank_name,
                  })
                }
                setListProviderData(providerArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

   

    
    
  
    
   
  return (
    <DedicatedVirtualContext.Provider value={{
        DedicatedAccountRegistration,
        getCustomerDedicatedAccount,
        virtualaccountdata, setVirtualAccountData,
        listAllVirtualAccountProvider,
        listproviderdata, setListProviderData,
        provider, setProvider,
        firstname, setFirstName,
        lastname, setLastName,
        getAccountBalance, setBalance, balance,
        transaction, setTransaction, getTransactionBalance,
        queryaccountbalance,setQueryAccountBalance,
        getQueryAccountBalance,
        getDedicatedAccountTransaction,
        dedicatedaccounttransaction, setDedicatedAccountTransaction,
        setTransactionStatus, transactionstatus,
        transactionchannel, setTransactionChannel,
        totalVolume, setTotalVolume,
        
     }}>

      {children}

    </DedicatedVirtualContext.Provider>
  )
}

export default DedicatedVirtualAccountContextProvider

export const useDedicatedVirtualContext = () => useContext(DedicatedVirtualContext)
