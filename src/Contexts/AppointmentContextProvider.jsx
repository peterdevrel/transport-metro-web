import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'



const AppointmentContext = createContext()


const AppointmentContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')
    const appointmentId = localStorage.getItem('appointmentId')

    const [appointment, setAppointment] = useState('')
    const [rank, setRank] = useState('')
    const [currentgrade, setCurrentGrade] = useState('')
    const [psnumber, setPsNumber] = useState('')
    const [establishmentnumber, setEstablishmentNumber] = useState('')
    const [employmentnumber, setEmploymentNumber] = useState('')
    const [personalfilenumber, setPersonFileNumber] = useState('')
    const [dateofconfirmation, setDateOfConfirmation] = useState(new Date().toISOString().split('T')[0])
    const [dateofappointment, setDateOfAppointment] = useState(new Date().toISOString().split('T')[0])


    const [appointmentdata, setAppointmentData] = useState([])



    const getAppointmentDetail = async () => {
  
      
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}v/api/appointment/${appointmentId}/`,
            {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}` // Uncomment if you need token auth
              },
            }
          );
      
          if (response.status === 401) {
            console.error('Unauthorized: Please log in to view appointment details.');
            // setError('Unauthorized access. Please log in.');
            return; // Stop further execution
          }
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const data = await response.json();
          setAppointmentData(data);
        } catch (error) {
          console.log('Error fetching appointment detail:', error);
          // setError('An error occurred while loading the appointment.');
        }
      };
      
    
    const updateAppointmentDetail = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/appointment/${id}/`,{
                method: 'PATCH',
                credentials:'include',
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
    <AppointmentContext.Provider value={{
        appointment, setAppointment,
        rank, setRank,
        currentgrade, setCurrentGrade,
        appointmentdata, setAppointmentData,
        getAppointmentDetail,
        updateAppointmentDetail,
        dateofconfirmation, setDateOfConfirmation,
        dateofappointment, setDateOfAppointment,
        establishmentnumber, setEstablishmentNumber,
        employmentnumber, setEmploymentNumber,
        personalfilenumber, setPersonFileNumber,
        psnumber, setPsNumber

    }}>

      {children}

    </AppointmentContext.Provider>
  )
}

export default AppointmentContextProvider

export const useAppointmentContext = () => useContext(AppointmentContext)
