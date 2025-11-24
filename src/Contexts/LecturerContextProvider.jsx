import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
import { toast } from 'react-toastify'



const LecturerContext = createContext()

const LecturerContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

    const [instistution, setInstitution] = useState('')
    const [lecturerdata, setLecturerData] = useState([])





     const getAllLecturerByOption = (user_option) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/get/option/${user_option}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setLecturerData(data)
                // console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const addTrainingToDB = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/`,{
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

    const updateUser = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/api/users/${id}/`,{
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

    const getAllTrainingByUser = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setTrainingData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const getTrainingById = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/${id}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    const deleteTraining = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/${id}/`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            }).then(data => {
                toast.success('Deletion successful')
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <LecturerContext.Provider value={{
            lecturerdata,
            getAllLecturerByOption,
            updateUser,setLecturerData
        }}>
            {children}
        </LecturerContext.Provider>
    )
}


export default LecturerContextProvider

export const useLecturer = () => useContext(LecturerContext)