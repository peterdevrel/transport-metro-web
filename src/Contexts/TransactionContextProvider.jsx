import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
// import {createHmac} from 'crypto'

const TransactionContext = createContext()


const TransactionContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()

    const [webhookdata, setWebhookData] = useState([])
  
  
   
    const webhookNotification = () => {
      try{
        return fetch(`${import.meta.env.VITE_BASE_URL}v/process/webhook/`,{
          method: 'POST',
          headers:{
              'Content-Type': "application/json",
          }
        })
        .then(res => res.json())
        .then(req => {    
          console.log(req)
          setWebhookData(req)
          // const hash = createHmac('sha512', SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
          // if (hash == req.headers["HTTP_X_PAYSTACK_SIGNATURE"]) {
          // // Retrieve the request's body
          // const event = req.body;
          // console.log("event", event)


          // }
        })
      }catch(error){
        console.log(error)
      }
    }
   
  return (
    <TransactionContext.Provider value={{
      
    }}>

      {children}

    </TransactionContext.Provider>
  )
}

export default TransactionContextProvider

export const useTransaction = () => useContext(TransactionContext)
