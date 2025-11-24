import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const ExternalClientContext = createContext()


const ExternalClientContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

    
    const [clientType, setClientType]= useState("")
    const [externalAppData, setExternalAppData]= useState("")
    const [client, setClient]= useState([])
    const [clientTypeData, setClientTypeData]= useState([])
    const [docs, setDocs] = useState([]);
    const [developer, setDeveloper] = useState("")
    const [yearsExp, setYearExp] = useState("")
    const [studId, setStudId] = useState("")
    const [busName, setBusName] = useState("")
    const [busId, setBusId] = useState("")
    const [purpose, setPurpose] = useState("")

    const createAPIClient = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/create_verify_external_client/`,{
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

    const LoginUser = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/call_external_login/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            alert('Low Network connection', error)
        }
    }


      const getClientTypeData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/api/client/type/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                var count = Object.keys(res).length;
                let subArray = []
                for (var i = 0; i < count; i++){
                    subArray.push({
                    value: res[i].name,
                    label: res[i].name,
                    id: res[i].id,
                    subaccount: res[i].subaccount,
                    amount: res[i].amount
                  })
                }
                setClientTypeData(subArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
  
      const getExternalAppInfomationData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/api/external/api/access/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setExternalAppData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
      const getExternalStatus = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/status_check/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // setExternalAppData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
  
    
      const getDocumentation = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}documentation/apidocs/`)
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Failed to fetch API docs');
                    }
                    return response.json();
                })
                .then(data => setDocs(data))
                .catch(error => console.error('Error fetching docs:', error))
                
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
  
    
   
  return (
    <ExternalClientContext.Provider value={{
       createAPIClient,
       client, setClient,
       clientType, setClientType,
       clientTypeData,setClientTypeData,
       getClientTypeData,
       externalAppData, setExternalAppData,
       getExternalAppInfomationData,
       getExternalStatus,
       LoginUser,
       docs, setDocs,
       getDocumentation,
       developer, setDeveloper,
       yearsExp, setYearExp,
       studId, setStudId,
       busName, setBusName,
       busId, setBusId,
       purpose, setPurpose
    }}>

      {children}

    </ExternalClientContext.Provider>
  )
}

export default ExternalClientContextProvider

export const useExternalClient = () => useContext(ExternalClientContext)
