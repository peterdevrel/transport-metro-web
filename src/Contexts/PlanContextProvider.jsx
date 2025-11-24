import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const PlanContext = createContext()


const PlanContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

    
    const [plandata, setPlanData]= useState([])
  
    const getAllPlan = () => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/plan/`,{
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

  
    
   
  return (
    <PlanContext.Provider value={{
        getAllPlan,
        plandata, setPlanData
    }}>

      {children}

    </PlanContext.Provider>
  )
}

export default PlanContextProvider

export const usePlan = () => useContext(PlanContext)
