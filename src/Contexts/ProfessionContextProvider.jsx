import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
import { toast } from 'react-toastify'


const ProfessionContext = createContext()

const ProfessionContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')


    const [license, setLicense] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [cadre, setCadre] = useState("")


    const [professiondata, setProfessionData] = useState([])
    

    const addProfessionToDB = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/profession/license/`,{
                method: 'POST',
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

    const updateTrainingToDB = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/profession/license/${id}/`,{
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

    const getAllProfessionByUser = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/profession/license/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setProfessionData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const getTrainingById = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/profession/license/${id}/`,{
                method: 'GET',
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


    const deleteProfession = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/profession/license/${id}/`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            }).then(data => {
                toast.success("Deletion Successful")
                getAllProfessionByUser()
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ProfessionContext.Provider value={{
            addProfessionToDB,
            getAllProfessionByUser,
            license, setLicense,
            speciality, setSpeciality,
            cadre, setCadre,
            professiondata, setProfessionData,
            deleteProfession
        }}>
            {children}
        </ProfessionContext.Provider>
    )
}


export default ProfessionContextProvider

export const useProfession = () => useContext(ProfessionContext)