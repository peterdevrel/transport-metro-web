import React, { createContext, useContext, useEffect, useState } from 'react'

const RegisterContext = createContext()

const RegistrationContextProvider = ({children}) => {


  const access = localStorage.getItem('access')
  
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ firstname, setFirstName] = useState('')
  const [ lastname, setLastName] = useState('')
  const [  username, setUsername,] = useState('')
  const [ title, setTitle] = useState('')
  const [ middlename, setMiddleName] = useState('')
  const [ dob, setDob] = useState('')
  const [ placeofbirth, setPlaceOfBirth] = useState('')
  const [ mobile, setMobile] = useState('')
  const [ phone, setPhone] = useState('')
  const [ address, setAddress] = useState('')
  const [ amount, setAmount] = useState('')
  const [ agreed, setAgreed] = useState(false)
  const [ maritalstatus, setMaritalStatus] = useState("")
  const [ sex, setSex] = useState("")
  const [ roletype, setRoleType] = useState("")
  const [ category, setCategory] = useState("")
  const [ country, setCountry] = useState("")
  const [ state, setState] = useState("")
  const [ mystate, setMyState] = useState("")
  const [ lga, setLga] = useState("")
  const [ ward, setWard] = useState("")
  const [ isRegister, setIsRegister] = useState("")
  const [ faculty, setFaculty] = useState("")
  const [ department, setDepartment] = useState("")
  const [ profileImage, setProfileImage] = useState("")
  const [ session, setSession] = useState("")
  const [ semester, setSemester] = useState("")
  const [level,setLevel ] = useState("")
  const [description, setDescription ] = useState("")
  const [endtime, setEndTime ] = useState("")
  const [starttime, setStartTime ] = useState("")
  const [startdate, setStartDate ] = useState("")
  const [enddate, setEndDate ] = useState("")
  const [maxscore, setMaxScore ] = useState("")
  const [airesearch, setAiResearch ] = useState("")

  const [showcomment, setShowComment] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const [problemsolving, setProblemSolving] = useState(false)
  const [semiformal, setSemiFormal] = useState(false)
  const [published, setPublished] = useState(false)
  const [talklecture, setTalkLecture] = useState(false)

  const [loggedIn, setIsLoggedIn] = useState(false)


  const [isBusiness, setIsBusiness] = useState(false)
  const [isUnion, setIsUnion] = useState(false)
  const [isTrader, setIsTrader] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [isResident, setIsResident] = useState(false)
  const [isCivilService, setIsCivilService] = useState(false)
  const [isVisitor, setIsVisitor] = useState(false)
  const [isFarmer, setIsFarmer] = useState(false)

  // data
  const [userdata, setUserData] = useState([])
  const [profiledata, setProfileData] = useState([])

  const [usercategorydata, setUserCategoryData] = useState([])
  const [usercategoryamount, setUserCategoryAmount] = useState([])

  const [sexdata, setSexData] = useState([])
  const [maritaldata, setMaritalData] = useState([])
  
  const [countrydata, setCountryData,] = useState([])
  const [statedata, setStateData] = useState([])
  const [localdata, setLocalData] = useState([])
  const [warddata, setWardData] = useState([])
  const [sessiondata, setSessionData] = useState([])
  const [semesterData, setSemesterData] = useState([])
  const [lgaforcertdata, setLgaForCertData] = useState([])
  const [facultydata, setFacultyData] = useState([])
  const [departmentdata, setDepartmentData] = useState(null)
  const [ activeSemesterData, setActiveSemesterData ] = useState([])
  const [ leveldata, setLevelData ] = useState([])


const userRegistration = (formData) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}user/create/user/`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      // Do NOT set 'Content-Type' manually
      // The browser will handle it correctly with multipart/form-data
    },
    body: formData
  }).catch((error) => {
    console.error('Network error:', error);
    throw new Error('Check your network connection');
  });
};

  const getAllMaritalData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/marital/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let maritalArray = []
        for (var i = 0; i < count; i++){
            maritalArray.push({
            value: data[i]?.name,
            label: data[i]?.name,
          })
        }
        setMaritalData(maritalArray)
    }).catch(error=> console.log(error)) 
}

  const getAllSexData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/sex/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let sexArray = []
        for (var i = 0; i < count; i++){
            sexArray.push({
            value: data[i]?.name,
            label: data[i]?.name,
          })
        }
        setSexData(sexArray)
    }).catch(error=> console.log(error)) 
}


  const getAllUserCategoryData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/api/user-categories/`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
        var count = Object.keys(data).length;
        let userCategoryArray = []
        for (var i = 0; i < count; i++){
            userCategoryArray.push({
            value: data[i]?.name,
            label: data[i]?.name,
            name:data[i]?.name,
            amount: data[i]?.amount,
            plan: data[i]?.plan,
            subaccount: data[i]?.subaccount,
          })
        }
        setUserCategoryData(userCategoryArray)
    }).catch(error=> console.log(error)) 
}

  const getAllFacultyData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/api/faculty_setup/`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
        var count = Object.keys(data).length;
        let facultyArray = []
        for (var i = 0; i < count; i++){
            facultyArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
            name:data[i]?.name,
          })
        }
        setFacultyData(facultyArray)
    }).catch(error=> console.log(error)) 
}

  
const getAllDepartmentData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/api/department_setup/`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
        var count = Object.keys(data).length;
        let departmentArray = []
        for (var i = 0; i < count; i++){
            departmentArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
          })
        }
        setDepartmentData(departmentArray)
    }).catch(error=> console.log(error)) 
}


  const getAmountByCategoryData = (name) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/${name}/by/category/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let AmountArray = []
        for (var i = 0; i < count; i++){
            AmountArray.push({
            value: data[i]?.amount,
            label: data[i]?.amount,
          })
        }
        setUserCategoryAmount(AmountArray)
    }).catch(error=> console.log(error)) 
}


  const getAllCountryData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/api/countries/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let countryArray = []
        for (var i = 0; i < count; i++){
            countryArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
          })
        }
        setCountryData(countryArray)
    }).catch(error=> console.log(error)) 
}

  const getAllStateByCountryData = (country) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/get/all/state/by/${country}/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let stateArray = []
        for (var i = 0; i < count; i++){
            stateArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
          })
        }
        setStateData(stateArray)
    }).catch(error=> console.log(error)) 
}

  const getAllLocalByStateData = (state) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/local/by/${state}/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let localArray = []
        for (var i = 0; i < count; i++){
          localArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
          })
        }
        setLocalData(localArray)
    }).catch(error=> console.log(error)) 
}

  const getAllWardByLocalData = (lga) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/ward/by/${lga}/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
    })
    .then(resp => resp.json())
    .then(data => {
        var count = Object.keys(data).length;
        let wardArray = []
        for (var i = 0; i < count; i++){
            wardArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
          })
        }
        setWardData(wardArray)
    }).catch(error=> console.log(error)) 
}


const CreateSubscriptionPayment = (body) => {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}v/api/category/payment/`, {
          method: 'POST',
          // credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${access}`
          },
          body: JSON.stringify(body)
      })
  } catch (error) {
      toast.warn(error)
  }
 
}


const getVerifyPaymentRef = (ref)=> {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/user/payment/${ref}/`,{
          method: 'GET',
          // credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${access}`
          },
      })
  } catch (error) {
      console.log(error)
  }
}


const updateUserPaymentStatus = (body) => {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}v/partial/status/update/`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${access}`
          },
          
          body: JSON.stringify(body)
      })
      
  } catch (error) {
      console.log(error)
  }
 
}

const updateUserCustCodeId = (body) => {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}v/partial/pay/customercode/`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`
          },
          body: JSON.stringify(body)
      })
      
  } catch (error) {
      console.log(error)
  }
 
}


const updateUserCafePaymentStatus = (body, access) => {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}v/cafe/payment/status/update/`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`
          },
          
          body: JSON.stringify(body)
      })
      
  } catch (error) {
      console.log(error)
  }
 
}


const getAllLocalStateData = () => {
  return fetch(`${import.meta.env.VITE_BASE_URL}v/get/local/area/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,  // Make sure 'access' contains a valid token
    },
  })
    .then((resp) => {
      if (resp.status === 401) {
        // Handle Unauthorized error
        console.error('Unauthorized: Please log in to continue.');
        // Optionally, you can redirect to the login page or show a login prompt
        // setError('Unauthorized: Please log in to access this resource.');
        throw new Error('Unauthorized'); // Stop the promise chain
      }
      return resp.json();
    })
    .then((data) => {
      var count = Object.keys(data).length;
      let localArray = [];
      for (var i = 0; i < count; i++) {
        localArray.push({
          value: data[i]?.id,
          label: data[i]?.name,
          amount: data[i]?.amount,
          chairman: data[i]?.chairman,
          plan: data[i]?.plan,
          secretary: data[i]?.secretary,
          secretary_phone: data[i]?.secretary_phone,
          subaccount: data[i]?.subAccount,
        });
      }
      setLgaForCertData(localArray);
    })
    .catch((error) => {
      if (error.message !== 'Unauthorized') {
        console.log('Error fetching local state data:', error);
        setError('An error occurred while fetching the data.');
      }
    });
};



  
const getSessionData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/api/sessions_year/`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
        var count = Object.keys(data).length;
        let sessionArray = []
        for (var i = 0; i < count; i++){
            sessionArray.push({
            value: data[i]?.id,
            label: data[i]?.session,
          })
        }
        setSessionData(sessionArray)
    }).catch(error=> console.log(error)) 
}

  
const getSemesterData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/api/semester_config/`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
        var count = Object.keys(data).length;
        let semesterArray = []
        for (var i = 0; i < count; i++){
            semesterArray.push({
            value: data[i]?.id,
            label: data[i]?.name,
          })
        }
        setSemesterData(semesterArray)
    }).catch(error=> console.log(error)) 
}


const getActiveSemesterData = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}user/active-semesters/`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
        var count = Object.keys(data).length;
        let activeSemesterArray = []
        for (var i = 0; i < count; i++){
            activeSemesterArray.push({
            value: data[i]?.id,
            label: data[i]?.display_name,
            session: data[i]?.session
          })
        }
        setActiveSemesterData(activeSemesterArray)
    }).catch(error=> console.log(error)) 
}


// const getLevelSetupData = () => {
//     return fetch(`${import.meta.env.VITE_BASE_URL}user/api/level_setup/`,{
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       // console.log('level', data)
//         var count = Object.keys(data).length;
//         let levelArray = []
//         for (var i = 0; i < count; i++){
//             levelArray.push({
//             id: data[i].id,
//             value: data[i]?.name,
//             label: data[i]?.name,
//           })
//         }
//         setLevelData(levelArray)
//     }).catch(error=> console.log(error)) 
// }



function addDuration(date, duration) {
    const d = new Date(date);

    const years = parseInt(duration.years || 0);
    const months = parseInt(duration.months || 0);
    const weeks = parseInt(duration.weeks || 0);
    const days = parseInt(duration.days || 0);

    if (!isNaN(years)) d.setFullYear(d.getFullYear() + years);
    if (!isNaN(months)) d.setMonth(d.getMonth() + months);
    if (!isNaN(weeks)) d.setDate(d.getDate() + weeks * 7);
    if (!isNaN(days)) d.setDate(d.getDate() + days);

    return d;
   }


  return (
    <RegisterContext.Provider value={{ 
        email, setEmail,
        password, setPassword,
        username, setUsername,
        firstname, setFirstName,
        lastname, setLastName,
        title, setTitle,
        middlename, setMiddleName,
        dob, setDob,
        placeofbirth, setPlaceOfBirth,
        mobile, setMobile,
        address, setAddress,
        amount, setAmount,
        agreed, setAgreed,
        maritalstatus, setMaritalStatus,
        sex, setSex,
        roletype, setRoleType,
        category, setCategory,
        country, setCountry,
        state, setState,
        lga, setLga,
        ward, setWard,
        isRegister, setIsRegister,
        profiledata, setProfileData,
        userRegistration,
        profileImage, setProfileImage,
        usercategorydata,setUserCategoryData,
        getAllUserCategoryData,
        setUserCategoryAmount,usercategoryamount,
        getAmountByCategoryData,
        sexdata, setSexData,
        getAllSexData,
        maritaldata, setMaritalData,
        getAllMaritalData,
        countrydata, setCountryData,
        getAllCountryData,
        statedata, setStateData,
        getAllStateByCountryData,
        localdata, setLocalData,
        getAllLocalByStateData,
        warddata, setWardData,
        getAllWardByLocalData,
        isBusiness, setIsBusiness,
        isUnion, setIsUnion,
        isTrader, setIsTrader,
        isTeacher, setIsTeacher,
        isStudent, setIsStudent,
        isResident, setIsResident,
        isCivilService, setIsCivilService,
        isVisitor, setIsVisitor,
        isFarmer, setIsFarmer,
        mystate, setMyState,
        CreateSubscriptionPayment,
        getVerifyPaymentRef,
        updateUserPaymentStatus,
        updateUserCustCodeId,
        updateUserCafePaymentStatus,
        getAllLocalStateData,
        lgaforcertdata, setLgaForCertData,
        faculty,setFaculty,
        department,setDepartment,
        phone, setPhone,
        facultydata, setFacultyData,
        getAllFacultyData,
        departmentdata, setDepartmentData,
        getAllDepartmentData,
        getSessionData,sessiondata, setSessionData,
        setSession,session,
        semester, setSemester,
        getSemesterData, semesterData,
        getActiveSemesterData,
        activeSemesterData, setActiveSemesterData,
        leveldata, setLevelData,
        // getLevelSetupData,
        level,setLevel,
        description, setDescription,
        starttime, setStartTime,
        endtime, setEndTime,
        showcomment, setShowComment,
        visibility, setVisibility,
        problemsolving, setProblemSolving,
        semiformal, setSemiFormal,
        published, setPublished,
        talklecture, setTalkLecture,
        startdate, setStartDate,
        enddate, setEndDate,
        addDuration,
        airesearch, setAiResearch,
        maxscore, setMaxScore,
    }}>
      {children}
    </RegisterContext.Provider>
  )
}

export default RegistrationContextProvider

export const useRegister = () => useContext(RegisterContext)