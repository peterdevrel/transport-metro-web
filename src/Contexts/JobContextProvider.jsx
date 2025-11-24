import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const JobContext = createContext()


const JobContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()

    const access = localStorage.getItem('access')

    const [amount, setAmount] = useState("")
    const [sector, setSector] = useState("")
    const [jobdescription, setJobDescription] = useState("")
    const [year, setYear] = useState("")
    const [projectimage, setProjectImage,] = useState(null)
    const [jobStatus, setJobStatus] = useState("")
    const [quizattempttime, setQuizAttemptTime] = useState('')

  
    // data
    const [sectordata, setSectorData] = useState([])
    const [jobdescriptiondata, setJobDescriptionData] = useState([])
    const [servicechargedata, setServiceChargeData] = useState([])
    const [jobapplicantdetail, setJobApplicantDetail] = useState([])
    const [applicantdata, setApplicantData] = useState([])
    const [applicantdocumentdata, setApplicantDocumentData] = useState([])
    const [applicantdocscrolldata, setApplicantDocScrollData] = useState([])
    const [applicantmanagerdata, setApplicantManagerData] = useState([])
    const [quizquestiondata, setQuizQuestionData] = useState([])
    const [sectorjobdescriptiondata, setSectorJobDescriptionData] = useState([])
    const [existingquizattemptdata, setExistingQuizAttemptData] = useState([])
    const [quizscoredata, setQuizScoreData] = useState([])




    const createApplication = (body) => {
      try {
          return fetch(`${import.meta.env.VITE_BASE_URL}job/api/application/`,{
              method: 'POST',
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


    const getAllSector = () => {
      try {
          return fetch(`${import.meta.env.VITE_BASE_URL}job/api/sector/`,{
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
              },
          })
          .then(response => response.json())
          .then(data => {
              // console.log('surveydata', data)
              setSectorData(data)
          })
      } catch (error) {
          console.log("Poor network connection", error)
      }
  }


    const getJobDescriptionData = (sector) => {
        
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}job/get/description/${sector}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                setJobDescriptionData(res)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    // const getJobDescriptionData = (sector) => {
    //     try {
    //         return fetch(`${import.meta.env.VITE_BASE_URL}job/get/description/${sector}/`,{
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${access}`
    //             },
    //         })
    //         .then(response => response.json())
    //         .then(res => {
    //             // console.log(res)
    //             var count = Object.keys(res).length;
    //             let statusArray = []
    //             for (var i = 0; i < count; i++){
    //                 statusArray.push({
    //                 value: res[i].id,
    //                 label: res[i].name,
    //               })
    //             }
    //             setJobDescriptionData(statusArray)
    //         })
    //     } catch (error) {
    //         console.log("Poor network connection", error)
    //     }
    // }
    


    const getServiceChargeAmountData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}job/api/job/service/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                var count = Object.keys(res).length;
                let statusArray = []
                for (var i = 0; i < count; i++){
                    statusArray.push({
                    value: res[i].amount,
                    label: res[i].amount
                  })
                }
                setServiceChargeData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getVerifyPaymentRef = (ref)=> {
      try {
          return fetch(`${import.meta.env.VITE_BASE_URL}job/verify/payment/${ref}/`,{
              method: 'GET',
              credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
          })
      } catch (error) {
          
      }
  }


  const getAllApplicantData = () => {
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/api/applicant/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log('applicant', data)
            setApplicantData(data)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}


const createApplicantDocument = (body) => {
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}job/api/document/application/`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
          },
          body: body
      })
  } catch (error) {
      console.log(error)
  }
}


const getApplicantDocumentByUserId = (userId) => {
    
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}job/get/applicant/doc/${userId}/`,{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
          },
      })
      .then(response => response.json())
      .then(data => {
          // console.log('surveydata', data)
          setApplicantDocumentData(data)
      })
  } catch (error) {
    console.log("Poor network connection", error)
  }
}

    
const getApplicantDocumentScrollData = (userId) => {
    
  try {
      return fetch(`${import.meta.env.VITE_BASE_URL}job/get/applicant/doc/${userId}/`,{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
          },
      })
      .then(response => response.json())
      .then(data => {
          // console.log('surveydata', data)
          setApplicantDocScrollData(data)
      })
  } catch (error) {
    console.log("Poor network connection", error)
  }
}


const getAllApplicantManagerData = () => {
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/all/applicant/manager/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log('applicant', data)
            setApplicantManagerData(data)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}


const patchApplicationStatus = (id, body) => {
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/api/application/${id}/`,{
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}
    

const getAllQuizQuestionData = (job_desc) => {
     
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/all/quiz/question/${job_desc}/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log('applicant', data)
            setQuizQuestionData(data)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}
    
const getJobDescriptionBySectorData = (sector) => {
     if (!sector) {
            console.error('Sector is null or undefined');
            return;
        }
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/description/${sector}/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log('applicant', data)
            setSectorJobDescriptionData(data)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}
    

const postQuizQuestion = (body) => {
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/create/submit/question/`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}


const updateApplicantSubmittedAnswerScore = (body) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}job/update/score/question/`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(body)
    })
    
        
}


const postQuizQuestionAttempt = (body) => {
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/api/quiz/attempt/`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}
    

const getExistingQuizAttempt = (applicant, sector, job_desc) => {
    
    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/get/existing/quiz/${applicant}/${sector}/${job_desc}/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log('applicant', data)
            setExistingQuizAttemptData(data)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}
    

const getQuizScoreByApplicantIdData = (applicant, job_desc) => {

    try {
        return fetch(`${import.meta.env.VITE_BASE_URL}job/filter/score/${applicant}/${job_desc}/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log('applicant', data)
            setQuizScoreData(data.qs)
        })
    } catch (error) {
        console.log("Poor network connection", error)
    }
}
    


   
  return (
    <JobContext.Provider value={{  
        createApplication,
        getAllSector,
        sectordata, setSectorData,
        amount, setAmount,
        sector, setSector,
        jobdescription, setJobDescription,
        year, setYear,
        getJobDescriptionData,
        jobdescriptiondata, setJobDescriptionData,
        getServiceChargeAmountData,
        servicechargedata, setServiceChargeData,
        getVerifyPaymentRef,
        jobapplicantdetail, setJobApplicantDetail,
        applicantdata, setApplicantData,
        getAllApplicantData,
        createApplicantDocument,
        projectimage, setProjectImage,
        getApplicantDocumentByUserId,
        applicantdocumentdata, setApplicantDocumentData,
        getApplicantDocumentScrollData,
        applicantdocscrolldata, setApplicantDocScrollData,
        applicantmanagerdata, setApplicantManagerData,
        getAllApplicantManagerData,
        jobStatus, setJobStatus,
        patchApplicationStatus,
        getAllQuizQuestionData,
        quizquestiondata, setQuizQuestionData,
        getJobDescriptionBySectorData,
        sectorjobdescriptiondata, setSectorJobDescriptionData,
        postQuizQuestion,
        postQuizQuestionAttempt,
        getExistingQuizAttempt,
        existingquizattemptdata, setExistingQuizAttemptData,
        quizattempttime, setQuizAttemptTime,
        updateApplicantSubmittedAnswerScore,
        quizscoredata, setQuizScoreData,
        getQuizScoreByApplicantIdData,
       
    }}>

      {children}

    </JobContext.Provider>
  )
}

export default JobContextProvider

export const useJobContext = () => useContext(JobContext)
