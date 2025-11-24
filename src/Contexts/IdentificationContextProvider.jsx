import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const IndentificationContext = createContext()

const IdentificationContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')
    const appointmentId = localStorage.getItem('appointmentId')

    const [identificationtype, setIdentificationType] = useState('')
    const [idnumber, setIdNumber] = useState('')
    const [issuingauthority, setIssuingAuthority] = useState('')
    const [dateofissue, setDateOfIssue] = useState(new Date().toISOString().split('T')[0])
    const [expirydate, setExpiryDate] = useState(new Date().toISOString().split('T')[0])


   const [identificationdata, setIdentificationData] = useState([])
  

    const getIdentificationDetail = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/identification/${appointmentId}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setIdentificationData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const updateIdentificationDetail = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/identification/${id}/`,{
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
        <IndentificationContext.Provider value={{
            getIdentificationDetail,
            identificationtype, setIdentificationType,
            idnumber, setIdNumber,
            issuingauthority, setIssuingAuthority,
            dateofissue, setDateOfIssue,
            expirydate, setExpiryDate,
            updateIdentificationDetail,
            identificationdata, setIdentificationData

        }}>
            {children}
        </IndentificationContext.Provider>
    )
}


export default IdentificationContextProvider

export const useIndentification = () => useContext(IndentificationContext)