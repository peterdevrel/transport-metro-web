import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const ResidentContext = createContext()

const ResidentContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')
    const residentId = localStorage.getItem('residentId')

     

    const [residentaddress, setResidentAddress] = useState("")
    const [wardaddress, setWardAddress] = useState("")
    const [localaddress, setLocalAddress] = useState("")
    const [districtaddress, setDistrictAddress] = useState("")
    const [stateaddress, setStateAddress] = useState("")
    const [mobileaddress, setMobileAddress] = useState("")


    const [residentdetaildata, setResidentDetailData] = useState([])
    


    const getDetailResidentialOfUser = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/residential/contact/${residentId}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setResidentDetailData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateResidentialToDB = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/residential/contact/${id}/`,{
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    // "Content-Type": "application/json",
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
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ResidentContext.Provider value={{
            updateResidentialToDB,
            residentaddress, setResidentAddress,
            wardaddress, setWardAddress,
            localaddress, setLocalAddress,
            districtaddress, setDistrictAddress,
            stateaddress, setStateAddress,
            mobileaddress, setMobileAddress,
            residentdetaildata, setResidentDetailData,
            getDetailResidentialOfUser  
        }}>
            {children}
        </ResidentContext.Provider>
    )
}


export default ResidentContextProvider

export const useResident = () => useContext(ResidentContext)