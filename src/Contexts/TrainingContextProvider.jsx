import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
import { toast } from 'react-toastify'


const TrainingContext = createContext()

const TrainingContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

    const [instistution, setInstitution] = useState('')
    const [address, setAddress] = useState('')
    const [datefrom, setDateFrom] = useState(new Date().toISOString().split('T')[0])
    const [dateto, setDateTo ] = useState(new Date().toISOString().split('T')[0])
    const [certificateobtain, setCertificateObtain] = useState('')

   
   const [trainingdata, setTrainingData] = useState([])
   const [trainingdetaildata, setTrainingDetailDate] = useState([])
  

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

    const updateTrainingToDB = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/${id}/`,{
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
        <TrainingContext.Provider value={{
            addTrainingToDB,
            instistution, setInstitution,
            address, setAddress,
            datefrom, setDateFrom,
            dateto, setDateTo, 
            certificateobtain, setCertificateObtain,
            trainingdata, setTrainingData,
            trainingdetaildata, setTrainingDetailDate,
            getAllTrainingByUser,
            deleteTraining,
            getTrainingById,
            updateTrainingToDB
        }}>
            {children}
        </TrainingContext.Provider>
    )
}


export default TrainingContextProvider

export const useTraining = () => useContext(TrainingContext)