import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const TerminalContext = createContext()


const TerminalContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

   

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [ terminalType, setTerminalType] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [terminalState, setTerminalState] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    
    const [plandata, setPlanData]= useState([])
    const [statesData, setStatesData]= useState([])
  
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


    const createTerminal = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}terminal/terminals/`,{
                credentials:'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
      
        } catch (error) {
            alert('Low Network connection', error)
        }
    }


// const fetchStates = () => {
//   return fetch(`${import.meta.env.VITE_BASE_URL}terminal/api/states/?limit=15`, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(resp => resp.json())
//     .then(data => {
//       const statesArray = data?.data?.states?.data || [];
//       const formattedStates = statesArray.map(state => ({
//         value: state._id,
//         label: state.name,
//       }));
//       setStatesData(formattedStates);
//     })
//     .catch(error => console.log(error));
// };



// const fetchStates = () => {
//   return fetch(`${import.meta.env.VITE_BASE_URL}terminal/api/states/?limit=50`, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(resp => resp.json())
//     .then(data => {
//       // Extract the array safely
//       const statesArray = data?.data?.states?.data || [];

//       // Map to { value, label } for dropdown
//       const formattedStates = statesArray.map(state => ({
//         value: state._id,
//         label: state.name,
//       }));

//       setStatesData(formattedStates);
//       console.log('States fetched:', formattedStates.length); // should be 36
//     })
//     .catch(error => console.log('Error fetching states:', error));
// };


const fetchStates = async () => {
  let url = `${import.meta.env.VITE_BASE_URL}terminal/api/states/`;
  let allStates = [];

  try {
    while (url) {
      const resp = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await resp.json();

      // Correct path to the array
      const currentPageStates = data?.data?.states?.data || [];
      allStates = [...allStates, ...currentPageStates];

      // Correct path to next_page_url
      url = data?.data?.next_page_url; // <- this was likely the problem
    }

    // console.log('Total states fetched:', allStates.length); // should be 36
    const formattedStates = allStates.map(state => ({
      value: state._id,
      label: state.name,
    }));
    setStatesData(formattedStates);
  } catch (err) {
    console.error('Error fetching states:', err);
  }
};

   
  return (
    <TerminalContext.Provider value={{
        createTerminal,
        name, setName,
        code, setCode,
        terminalType, setTerminalType,
        address, setAddress,
        city, setCity,
        terminalState, setTerminalState,
        latitude, setLatitude,
        longitude, setLongitude,
        fetchStates, statesData, setStatesData

    
    }}>

      {children}

    </TerminalContext.Provider>
  )
}

export default TerminalContextProvider

export const useTerminal = () => useContext(TerminalContext)
