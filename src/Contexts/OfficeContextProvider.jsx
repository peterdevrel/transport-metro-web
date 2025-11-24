import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const OfficeContext = createContext()

const OfficeContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')
    const officeId = localStorage.getItem('officeId')
    
     

    const [officename, setOfficeName] = useState("")
    const [officelocation, setOfficeLocation] = useState("")
    const [officemobile, setOfficeMobile] = useState("")


    const [officedetaildata, setOfficeDetailData] = useState([])
    


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


    return (
        <OfficeContext.Provider value={{
            officename, setOfficeName,
            officelocation, setOfficeLocation,
            officemobile, setOfficeMobile,
            officedetaildata, setOfficeDetailData,
            getDetailOfficeOfUser,
            updateOfficeToDB
        }}>
            {children}
        </OfficeContext.Provider>
    )
}


export default OfficeContextProvider

export const useOffice = () => useContext(OfficeContext)