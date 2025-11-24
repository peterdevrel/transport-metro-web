import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const SchoolContext = createContext()

const SchoolContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')
    const userId = localStorage.getItem('userId')

    const [schoolname, setSchoolName] = useState('')
    const [finished, setFinished] = useState('')
    const [presently, setPresently] = useState('')
    const [schoollga, setSchoolLGA ] = useState('')
    const [level, setLevel] = useState('')
    const [schoolId, setSchoolId] = useState('')

   
   const [schooldata, setSchoolData] = useState([])
   const [schooldetaildata, setSchoolDetailData] = useState([])
   const [loanapplicantschooldata, setLoanApplicantSchoolData] = useState([])
   const [payinstitutiondata, setPayInstitutionData] = useState([])
   const [educationPaymentDetailData,setEducationPaymentDetailData] = useState([])

   const [generalServiceInfoData,setGeneralServiceInfoData] = useState([])
   const [generalServicePaymentDetailData,setGeneralServicePaymentDetailData] = useState([])
   const [generalservicePaymentData,setGeneralServicePaymentData] = useState([])
  

    const addSchoolToDB = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/school/`,{
                method: 'POST',
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


    const updateSchoolToDB = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/school/${id}/`,{
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

    const getAllSchoolByUser = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/school/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setSchoolData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const getSchoolById = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/school/${id}/`,{
                method: 'GET',
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

    const getALoanApplicantSchoolUserId = (user_id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/school/${user_id}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('school', data)
                setLoanApplicantSchoolData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
  


    const deleteSchool = (id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/school/${id}/`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(data => {
                getAllSchoolByUser()
            })
        } catch (error) {
            console.log(error)
        }
    }



    const getPayInstitutionData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/pay/institution/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(res => {
                // console.log('school', res)
                var count = Object.keys(res).length;
                let institutionArray = []
                for (var i = 0; i < count; i++){
                    institutionArray.push({
                    value: res[i].name,
                    label: res[i].name,
                    id:  res[i].id,
                    level:  res[i].level,
                    amount:  res[i].amount,
                    subaccount:  res[i].subaccount,
                    fees_type:  res[i].fees_type,
                  })
                }               
                setPayInstitutionData(institutionArray)
            })
        } catch (error) {
            console.log(error)
        }
    }


    
    const CreateEducationPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/pay/education/account/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }


    
    const getVerifyEducationPaymentRef = (ref)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/ref/institution/payment/${ref}/`,{
                method: 'GET',
            })
        } catch (error) {
            console.log(error)
        }
    }


    const getGeneralServiceInfoData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/general/service/info/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(res => {
                // console.log('school', res)
                var count = Object.keys(res).length;
                let generalInfoArray = []
                for (var i = 0; i < count; i++){
                    generalInfoArray.push({
                    value: res[i].name,
                    label: res[i].name,
                    id: res[i].id,
                    plan:  res[i].plan,
                    amount:  res[i].amount,
                    subaccount:  res[i].subaccount,
                    fees_type:  res[i].fees_type,
                  })
                }               
                setGeneralServiceInfoData(generalInfoArray)
            })
        } catch (error) {
            console.log(error)
        }
    }


    
    const CreateGeneralServicePayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/cafe/service/payment/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    

    const getVerifyGeneralServicePaymentRef = (ref)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/service/${ref}/`,{
                method: 'GET',
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


    const getGeneralServicePayment = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/cafe/service/payment/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
                
            }).then(resp => resp.json())
            .then(data => {
                // console.log('school', res)
                setGeneralServicePaymentData(data)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SchoolContext.Provider value={{
            addSchoolToDB,
            updateSchoolToDB,
            schooldata, setSchoolData,
            schoolname, setSchoolName,
            finished, setFinished,
            presently, setPresently,
            schoollga,setSchoolLGA,
            level, setLevel,
            getAllSchoolByUser,
            deleteSchool,
            getSchoolById,
            schooldetaildata, setSchoolDetailData,
            schoolId, setSchoolId,
            loanapplicantschooldata, setLoanApplicantSchoolData,
            getALoanApplicantSchoolUserId,
            getPayInstitutionData,
            payinstitutiondata, setPayInstitutionData,
            CreateEducationPayment,
            educationPaymentDetailData,setEducationPaymentDetailData,
            getVerifyEducationPaymentRef,
            getGeneralServiceInfoData,
            generalServiceInfoData,setGeneralServiceInfoData,
            generalServicePaymentDetailData,setGeneralServicePaymentDetailData,
            CreateGeneralServicePayment,
            getVerifyGeneralServicePaymentRef,
            getGeneralServicePayment,
            generalservicePaymentData,setGeneralServicePaymentData
        }}>
            {children}
        </SchoolContext.Provider>
    )
}


export default SchoolContextProvider

export const useSchool = () => useContext(SchoolContext)