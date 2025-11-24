import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const NextContext = createContext()


const NextContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access')
    const nextid = localStorage.getItem('nextid')

    const [fullname, setFullName] = useState('')
    const [relationship, setRelationShip] = useState('')
    const [addressnext, setAddressNext] = useState('')
    const [telephonenext, setTelephoneNext] = useState('')



    const [nextdata, setNextData] = useState([])



    const getNextDetail = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/nextofkin/${nextid}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setNextData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateNextDetail = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/nextofkin/${id}/`,{
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
    
   
  return (
    <NextContext.Provider value={{
        fullname, setFullName,
        relationship, setRelationShip,
        addressnext, setAddressNext,
        telephonenext, setTelephoneNext,
        nextdata, setNextData,getNextDetail,
        updateNextDetail
    }}>

      {children}

    </NextContext.Provider>
  )
}

export default NextContextProvider

export const useNextContext = () => useContext(NextContext)
