import React, { createContext, useContext, useState } from 'react'


const ReportingContext = createContext()


const ReportingContextProvider = ({children}) => {
    
    
    const access = localStorage.getItem('access')
    
    
    // Market Survey
    const [priceafter, setPriceAfter] = useState("")
    const [pricebefore, setPriceBefore] = useState("")
    const [description, setDescription] = useState("")
    const [pricecontrol, setPriceControl] = useState("")
    const [pricecontrolmeasure, setPriceControlMeasure] = useState("")
    const [interventionmeasure, setInterventionMeasure] = useState("")
    const [productname, setProductName] = useState("")
    const [year, setYear] = useState("")
    const [quarter, setQuarter] = useState("") 
    const [status, setStatus] = useState("") 
    const [ marketstatus,setMarketStatus] = useState("")


    // Case and Report
    const [casedescription, setCaseDescription] = useState("")
    const [reporter, setReporter] = useState("")
    const [casetype, setCaseType] = useState("")
    const [casestatus, setCaseStatus] = useState("")
    const [address, setAddress] = useState("")
    const [eyewitness, setEyeWitness] = useState("")
    const [eyewitnessphone, setEyeWitnessPhone] = useState("")


    // Project

    const [projecttype, setProjectType] = useState("")
    const [contractorname, setContractorName] = useState("")
    const [companyname, setCompanyName] = useState("")
    const [projectdescription, setProjectDescription] = useState("")
    const [projectreason, setProjectReason] = useState("")
    const [tobecompleted, setTobeCompleted] = useState("")
    const [projectstatus, setProjectStatus] = useState("")
    const [ projectname,setProjectName] = useState("")
    
    
    
    // Project Image
    const [imagestatus, setImageStatus] = useState("")
    const [projectimagename, setProjectImageName] = useState("")
    const [projectimage, setProjectImage] = useState(null)
    const [projectstatusdata, setProjectStatusData] = useState([])

 



    // data
    const [productdata, setProductData] = useState([])
    const [yeardata, setYearData] = useState([])
    const [marketsurveydata, setMarketSurveyData] = useState([])
    const [statusdata, setStatusData] = useState([])
    const [casereportdata, setCaseReportData] = useState([])
    const [casestatusdata, setCaseStatusData] = useState([])
    const [casetypedata, setCaseTypeData] = useState([])
    const [projectdata, setProjectData] = useState([])
    const [projecttypedata, setProjectTypeData] = useState([])
    const [projectimagedata, setProjectImageData] = useState([])
    const [projectimagescrolldata, setProjectImageScrollData] = useState([])
    const [projectbystatusdata, setProjectByStatusData] = useState([])
    const [projectbystatuscompleteddata, setProjectByStatusCompletedData] = useState([])
    const [projectdropdowndata, setProjectDropdownData] = useState([])
    const [marketstatusdata, setMarketStatusData] = useState([])




    const createMarketSurvey = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/market/`,{
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


    const patchMarketSurvey = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/market/${id}/`,{
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



    const getProductData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/product/`,{
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
                let productArray = []
                for (var i = 0; i < count; i++){
                    productArray.push({
                    value: res[i]?.id,
                    label: res[i]?.name,
                  })
                }
                setProductData(productArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getMarketSurveyData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/get/market/survey/`,{
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
                setMarketSurveyData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getYearData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/year/`,{
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
                let yearArray = []
                for (var i = 0; i < count; i++){
                    yearArray.push({
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }
                setYearData(yearArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getMarketStatus = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/status/`,{
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
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }
                setStatusData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const createCaseReport = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/case/`,{
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


    const patchCaseReport = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/case/${id}/`,{
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


    const getCaseReportData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/get/case/report/`,{
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
                setCaseReportData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getCaseStatusData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/status/case/`,{
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
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }
                setCaseStatusData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getCaseTypeData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/type/case/`,{
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
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }
                setCaseTypeData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
   
    const createProject = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/project/`,{
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


    const getProjectData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/project/`,{
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
                setProjectData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }



    const getProjectTypeData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/type/project/`,{
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
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }
                setProjectTypeData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }



    const getProjectImageData = (project_name) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/get/project/image/${project_name}/`,{
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
                setProjectImageData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getProjectImageScrollData = (project_name) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/get/project/image/${project_name}/`,{
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
                setProjectImageScrollData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getProjectByStatusData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/get/project/by/ongoing/`,{
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
                setProjectByStatusData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getProjectByStatusCompletedData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/get/project/by/completed/`,{
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
                setProjectByStatusCompletedData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const createProjectImage = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/image/project/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                },
                body: body
            })
        } catch (error) {
            console.log(error)
        }
    }


    const getProjectDropdownData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/project/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                //  console.log('res', res)
                 var count = Object.keys(res).length;
                 let statusArray = []
                 for (var i = 0; i < count; i++){
                     statusArray.push({
                     value: res[i]?.id,
                     label: res[i]?.project_name,
                   })
                 }
                 setProjectDropdownData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getProjectStatusData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/review/project/status/`,{
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
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }
                setProjectStatusData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const patchProject = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/project/${id}/`,{
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


    const getMarketStatusData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v1/api/market/status/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                var count = Object.keys(res).length;
                let statusArray = []
                for (var i = 0; i < count; i++){
                    statusArray.push({
                    value: res?.name,
                    label: res?.name,
                  })
                }
                setMarketStatusData(statusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


   
  return (
    <ReportingContext.Provider value={{
        createMarketSurvey,
        patchMarketSurvey,
        pricecontrol, setPriceControl,
        priceafter, setPriceAfter,
        pricebefore, setPriceBefore,
        description, setDescription,
        productname, setProductName,
        pricecontrolmeasure, setPriceControlMeasure,
        interventionmeasure, setInterventionMeasure,
        getProductData,
        productdata, setProductData,
        year, setYear,
        quarter, setQuarter,
        getYearData,
        yeardata, setYearData,
        getMarketSurveyData,
        marketsurveydata, setMarketSurveyData,
        getMarketStatus,
        statusdata, setStatusData,
        status, setStatus,
        address, setAddress,
        createCaseReport,
        patchCaseReport,
        casedescription, setCaseDescription,
        reporter, setReporter,
        casetype, setCaseType,
        eyewitness, setEyeWitness,
        casestatus, setCaseStatus,
        getCaseReportData,
        casereportdata, setCaseReportData,
        getCaseStatusData,
        casestatusdata, setCaseStatusData,
        getCaseTypeData,
        casetypedata, setCaseTypeData,
        eyewitnessphone, setEyeWitnessPhone,
        createProject,getProjectData,
        projectdata, setProjectData,
        projecttype, setProjectType,
        contractorname, setContractorName,
        companyname, setCompanyName,
        projectdescription, setProjectDescription,
        projectreason, setProjectReason,
        tobecompleted, setTobeCompleted,
        projectstatus, setProjectStatus,
        projectname, setProjectName,
        getProjectTypeData,
        projecttypedata, setProjectTypeData,
        getProjectImageData,
        projectimagedata, setProjectImageData,
        getProjectImageScrollData,
        projectimagescrolldata, setProjectImageScrollData,
        getProjectByStatusData,
        projectbystatusdata, setProjectByStatusData,
        getProjectByStatusCompletedData,
        projectbystatuscompleteddata, setProjectByStatusCompletedData,
        createProjectImage,
        imagestatus, setImageStatus,
        projectimagename, setProjectImageName,
        getProjectDropdownData,
        projectdropdowndata, setProjectDropdownData,
        projectimage, setProjectImage,
        getProjectStatusData,
        projectstatusdata, setProjectStatusData,
        patchProject,
        marketstatusdata, setMarketStatusData,
        getMarketStatusData,
        marketstatus,setMarketStatus

    

    }}>

      {children}

    </ReportingContext.Provider>
  )
}

export default ReportingContextProvider

export const useReportingContext = () => useContext(ReportingContext)
