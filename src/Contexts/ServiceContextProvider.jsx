import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const ServiceContext = createContext()

const ServiceContextProvider = ({children}) => {

    const {userdata}  = useAuthContext()
    const access  =  localStorage.getItem('access')

    const [nimcno, setNimc,] = useState('')
    const [cardnumberonetime, setCardNumberOneTime] = useState('')
    const [cvvonetime, setCvvOneTime] = useState('')
    const [expirymonthonetime, setExpiryMonthOneTime] = useState('')
    const [expiryyearonetime, setExpiryYearOneTime] = useState('')
    
    const [cardnumberauto, setCardNumberAuto] = useState('')
    const [cvvauto, setCvvAuto] = useState('')
    const [expirymonthauto, setExpiryMonthAuto] = useState('')
    const [expiryyearauto, setExpiryYearAuto] = useState('')
    const [failed, setFailed] = useState("")
    const [taxino, setTaxiNo] = useState("")
    const [mobile, setMobile ] = useState("")


    const [isPaymentVisible, setIsPaymentVisible] = useState(false)
    const [message, setMessage] = useState('Search for Neighbourhood Number')
    
    
    // data
    const [servicedata, setServiceData] = useState([])
    const [nimcdata, setNimcData] = useState([])
    const [paymentdata, setPaymentData] = useState([])
    const [pay4medata, setPay4MeData] = useState([])
    const [paydata, setPayData] = useState([])
    const [plans, setPlans] = useState([])
    const [pay4mechanneldata, setPay4MeChannelData] = useState([])
    const [parkInformationData, setParkInformationData] = useState([])
    const [parkPaymentDetailData,setParkPaymentDetailData] = useState([])
    const [parkPaymentInformationData,setParkPaymentInformationData] = useState([])
    const [eduPaymentInformationData,setEduPaymentInformationData] = useState([])
    const [loandurationdata, setLoanDurationData] = useState([])
    const [lgaPaymentDetailData, setLgaPaymentDetailData] = useState([])
    const [lgaPaymentInformationData, setLGAPaymentInformationData] = useState([])
    const [LgaPaymentInformationUserIdData, setLGAPaymentInformationUserIdData] = useState([])
    const [certDurationData, setCertDurationData] = useState([])
    const [AllLinkedAccountData, setAllLinkedAccountData] = useState([])
    const [UserLinkedAccountData, setUserLinkedAccountData] = useState([])
    const [allRemittanceData, setAllRemittanceData] = useState([])
    const [adsDurationData, setAdsDurationData] = useState([])
    const [advertisementdata, setAdvertisementData] = useState([])
    const [remittancepaymentdata, setRemittancePaymentData] = useState([])
    const [unionremittancedata, setUnionRemittancePaymentData] = useState([])
    const [lgaCertUserPaymentInformationData, setLGACertUserPaymentInformationData] = useState([])
    const [advertisementPaymentData, setAdvertisementPaymentData] = useState([])
    const [fineData, setFineData] = useState([])
    const [finePaymentManagerData, setFinePaymentManagerData] = useState([])
    const [cardApplication, setCardApplication] = useState([])
    const [posMerchantData, setPosMerchantData] = useState([])
    const [allCardApplication, setAllCardApplication] = useState([])
    
   


  
    const getService = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/services/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(res => {
                // console.log(data)
                 // console.log('school', res)
                var count = Object.keys(res).length;
                let dataArray = []
                for (var i = 0; i < count; i++){
                    dataArray.push({
                    id: res[i].id,
                    category:  res[i].category,
                    house_type:  res[i].house_type,
                    plan_name:  res[i].plan_name,
                    subaccount:  res[i].subaccount,
                    company_name:  res[i].company_name,
                  })
                }               
                setServiceData(dataArray)
            })
        } catch (error) {
            alert(error)
        }
    }

    const getNimcData = (nimc_no) => {
    if(!nimc_no){
        console.log('Searching or no Neighborhood number supply')
        return
    }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/getnimc/${nimc_no}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setNimcData(data)     
               
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
        }
    }

    const getAllPayment = (admin,service_category) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/payments/${admin}/${service_category}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setPaymentData(data)
            })
        } catch (error) {
            
        }
    }

    const getAllPay4MePayment = (nimc_no, channel) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/pay/4/${nimc_no}/${channel}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setPay4MeData(data)
            })
        } catch (error) {
            
        }
    }


    const getAllPayChannelPayment = (channel) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/pay/channel/${channel}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('pay', data)
                setPay4MeChannelData(data)
            })
        } catch (error) {
            
        }
    }

    const sharePayment = async (id) => {
        try {
            await Share.share(`${import.meta.env.VITE_BASE_URL}/v/api/payment/${id}/`,{
                message: id
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
      };
    

    const makePayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/initialise/payment/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    // "Content-Type": "application/json",
                },
                body: body
            })
        } catch (error) {
            
        }
    }

    const verifyPaymentOneTime = (ref)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/one/time/${ref}/`,{
                method:'GET',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    "Content-Type": "application/json",
                },       
            })
        } catch (error) {
            
        }
    }

    const verifyPaymentAutoRenewal = (ref)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/auto/renewal/${ref}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            })
        } catch (error) {
            
        }
    }


    const retrieveAllAutoRenewalData = ()=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/plans/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(data => {
                setPlans(data)
            })
        } catch (error) {
            
        }
    }


    const formatTimeStamp = (timestamp) => {
        const date = new Date(Date.parse(timestamp));
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true})
        return `${formattedDate} at ${formattedTime}`
      }

    const currencyFormat = (value) => {
        return new Intl.NumberFormat('en-NG', {
             style:'currency',
             currency: 'NGN'
         }).format(value)
     }
 

     
    const getParkInformationData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/park/information/`,{
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
                let parkArray = []
                for (var i = 0; i < count; i++){
                    parkArray.push({
                    value: res[i].name,
                    label: res[i].name,
                    id:  res[i].id,
                    amount:res[i].amount,
                    subaccount:  res[i].subaccount,
                    plan:  res[i].plan,
                    plan_name:  res[i].plan_name,
                    fees_type:  res[i].fees_type,
                  })
                }               
                setParkInformationData(parkArray)
            })
        } catch (error) {
            console.log(error)
        }
    }


    
    const CreateParkPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/park/payment/`,{
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


    
    const getVerifyParkPaymentRef = (ref)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/park/${ref}/`,{
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



     const getParkPaymentData = (userId) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/get/park/payment/${userId}/`,{
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
                    let parkArray = []
                    for (var i = 0; i < count; i++){
                        parkArray.push({
                        serv_id: res[i].serv_id,
                        first_name: res[i].admin.first_name,
                        last_name: res[i].admin.last_name,
                        email: res[i].admin.email,
                        nimc_no: res[i].admin.nimc_no,
                        park_name: res[i].park_name,
                        taxi_no: res[i].taxi_no,
                        lga: res[i].lga,
                        phone: res[i].phone,
                        fees_type: res[i].fees_type,
                        pay_mode: res[i].pay_mode,
                        plan_name: res[i].plan_name,
                        amount: res[i].amount,
                        ref: res[i].ref,
                        verified: res[i].verified,
                        made_at: res[i].made_at,
                        updated_at: res[i].updated_at
                      })
                    }               
                    setParkPaymentInformationData(parkArray)
                })
            } catch (error) {
                console.log(error)
            }
        }

     const getEduPaymentData = (userId) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/get/edu/payment/${userId}/`,{
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
                    let parkArray = []
                    for (var i = 0; i < count; i++){
                        parkArray.push({
                        serv_id: res[i].serv_id,
                        first_name: res[i].admin.first_name,
                        last_name: res[i].admin.last_name,
                        email: res[i].admin.email,
                        nimc_no: res[i].admin.nimc_no,
                        school: res[i].school,
                        matric_no: res[i].matric_no,
                        phone: res[i].phone,
                        level: res[i].level,
                        fees_type: res[i].fees_type,
                        amount: res[i].amount,
                        ref: res[i].ref,
                        verified: res[i].verified,
                        made_at: res[i].made_at,
                        updated_at: res[i].updated_at
                      })
                    }               
                    setEduPaymentInformationData(parkArray)
                })
            } catch (error) {
                console.log(error)
            }
        }


        const getLoanDuration = ()=> {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/duration/loan/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    setLoanDurationData(data)
                })
            } catch (error) {
                
            }
        }


       

        const CreateLGAApplicationCertificate = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/api/lga/certificate/`,{
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
    


        const verifyLgaCertificate = (ref)=> {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/lga/cert/${ref}/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        // Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                })
            } catch (error) {
                
            }
        }

    
    

        const getLGACertPaymentData = () => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/lga/cert/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        // Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    var count = Object.keys(data).length;
                    let lgaPayArray = []
                    for (var i = 0; i < count; i++){
                        lgaPayArray.push({
                         
                                id: data[i].id,
                                
                                admin_id: data[i].admin.id,
                                profile_pic: data[i].admin.profile_pic,
                                first_name: data[i].admin.first_name,
                                last_name: data[i].admin.last_name,
                                cid: data[i].admin.cid,
                                nimc_no: data[i].admin.nimc_no,
                                email: data[i].admin.email,
                                title: data[i].admin.title,
                                middle_name: data[i].admin.middle_name,
                                dob: data[i].admin.dob,
                                place_of_birth: data[i].admin.place_of_birth,
                                mobile: data[i].admin.mobile,
                                address: data[i].admin.address,
                                marital_status: data[i].admin.marital_status,
                                sex: data[i].admin.sex,
                            
                            
                                lga_name: data[i].lga?.name,
                                chairman: data[i].lga?.chairman,
                                secretary: data[i].lga?.secretary,
                                secretary_phone: data[i].lga?.secretary_phone,
                                subAccount: data[i].lga?.subAccount,
                                plan: data[i].lga?.plan,
                                
                                owner_fullname: data[i].owner_fullname,
                                amount: data[i].amount,
                                owner_address:data[i].owner_address,
                                owner_mother:data[i].owner_mother,
                                owner_father:data[i].owner_father,
                                owner_were_born:data[i].owner_were_born,
                                issued:data[i].issued,
                                delivered:data[i].delivered,
                                delivered_through:data[i].delivered_through,
                                ref: data[i].ref,
                                verified: data[i].verified,
                                made_at: data[i].made_at,
                                updated_at: data[i].updated_at
                              
                      })
                    }               
                    setLGAPaymentInformationData(lgaPayArray)
                })
            } catch (error) {
                console.log(error)
            }
        }


        const getLGACertPaymentByUserIdData = (userId) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/user/lgacert/${userId}/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        // Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    var count = Object.keys(data).length;
                    let lgaPayArray = []
                    for (var i = 0; i < count; i++){
                        lgaPayArray.push({
                         
                                id: data[i].id,
                                
                                admin_id: data[i].admin.id,
                                profile_pic: data[i].admin.profile_pic,
                                first_name: data[i].admin.first_name,
                                last_name: data[i].admin.last_name,
                                cid: data[i].admin.cid,
                                nimc_no: data[i].admin.nimc_no,
                                email: data[i].admin.email,
                                title: data[i].admin.title,
                                middle_name: data[i].admin.middle_name,
                                dob: data[i].admin.dob,
                                place_of_birth: data[i].admin.place_of_birth,
                                mobile: data[i].admin.mobile,
                                address: data[i].admin.address,
                                marital_status: data[i].admin.marital_status,
                                sex: data[i].admin.sex,
                            
                            
                                lga_name: data[i].lga.name,
                                chairman: data[i].lga.chairman,
                                secretary: data[i].lga.secretary,
                                secretary_phone: data[i].lga.secretary_phone,
                                subAccount: data[i].lga.subAccount,
                                plan: data[i].lga.plan,
                                
                                owner_fullname: data[i].owner_fullname,
                                owner: data[i].owner,
                                amount: data[i].amount,
                                owner_address:data[i].owner_address,
                                owner_mother:data[i].owner_mother,
                                owner_father:data[i].owner_father,
                                owner_were_born:data[i].owner_were_born,
                                issued:data[i].issued,
                                delivered:data[i].delivered,
                                delivered_through:data[i].delivered_through,
                                delivered_phone:data[i].delivered_phone,
                                ref: data[i].ref,
                                verified: data[i].verified,
                                made_at: data[i].made_at,
                                updated_at: data[i].updated_at
                              
                      })
                    }               
                    setLGAPaymentInformationUserIdData(lgaPayArray)
                })
            } catch (error) {
                console.log(error)
            }
        }
        


        const getCertDuration = ()=> {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/cert/duration/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    setCertDurationData(data)
                })
            } catch (error) {
                
            }
        }

                  
    const getVerifyingLgaCertAndAddCard = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verifying/lga/cert/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const updateAndVerifyLgaCertAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update/lga/authorization/code/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }


      const repayLgaCertificate = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/certificate/repayment/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const updateLgaCertificateStatus = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update/certificate/status/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }



    const postMonoLinkinkingToRetrieveID = (code) => {
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}v/mono/exchange/code/`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
              });
            
        } catch (error) {
            console.log(error)
        }
       
      }

      
      const getAllLinkedAccount = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/all/linked/account/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                var count = Object.keys(data).length;
                let linkedArray = []
                for (var i = 0; i < count; i++){
                    linkedArray.push({
                     
                            id: data[i].id,
                            
                            admin_id: data[i].user.id,
                            profile_pic: data[i].user.profile_pic,
                            first_name: data[i].user.first_name,
                            last_name: data[i].user.last_name,
                            cid: data[i].user.cid,
                            nimc_no: data[i].user.nimc_no,
                            email: data[i].user.email,
                            title: data[i].user.title,
                            middle_name: data[i].user.middle_name,
                            dob: data[i].user.dob,
                            place_of_birth: data[i].user.place_of_birth,
                            mobile: data[i].user.mobile,
                            address: data[i].user.address,
                            marital_status: data[i].user.marital_status,
                            sex: data[i].user.sex,
                        
                            account_id:data[i].account_id,
                            account_name:data[i].account_name,
                            account_number:data[i].account_number,
                            account_type:data[i].account_type,
                            balance:data[i].balance,
                            bank_code:data[i].bank_code,
                            bank_name:data[i].bank_name,
                            bank_type:data[i].bank_type,
                            bvn:data[i].bvn,
                            
                         
                          
                  })
                }               
                setAllLinkedAccountData(linkedArray)
            })
        } catch (error) {
            console.log(error)
        }
    }


      const getUserIDLinkedAccount = (userId) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/linked/account/${userId}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                var count = Object.keys(data).length;
                let linkedArray = []
                for (var i = 0; i < count; i++){
                    linkedArray.push({
                     
                            id: data[i].id,
                            
                            admin_id: data[i].user.id,
                            profile_pic: data[i].user.profile_pic,
                            first_name: data[i].user.first_name,
                            last_name: data[i].user.last_name,
                            cid: data[i].user.cid,
                            nimc_no: data[i].user.nimc_no,
                            email: data[i].user.email,
                            title: data[i].user.title,
                            middle_name: data[i].user.middle_name,
                            dob: data[i].user.dob,
                            place_of_birth: data[i].user.place_of_birth,
                            mobile: data[i].user.mobile,
                            address: data[i].user.address,
                            marital_status: data[i].user.marital_status,
                            sex: data[i].user.sex,
                        
                            account_id:data[i].account_id,
                            account_name:data[i].account_name,
                            account_number:data[i].account_number,
                            account_type:data[i].account_type,
                            balance:data[i].balance,
                            bank_code:data[i].bank_code,
                            bank_name:data[i].bank_name,
                            bank_type:data[i].bank_type,
                            bvn:data[i].bvn,
                            
                         
                          
                  })
                }               
                setUserLinkedAccountData(linkedArray)
            })
        } catch (error) {
            console.log(error)
        }
    }
   

    const unlinkAccount = async (accountId) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}v/unlink/account/${accountId}/`, {
          method: "DELETE",
          credentials: 'include',
          headers: {
            // Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });
      
        return response.json();
      };


      const getAllRemittanceInfo = async () => {
        try {
            return await fetch(`${import.meta.env.VITE_BASE_URL}v/api/remittance/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                var count = Object.keys(data).length;
                let remittanceArray = []
                for (var i = 0; i < count; i++){
                    remittanceArray.push({
                        id: data[i].id,
                        code: data[i].code,
                        value: data[i].name,
                        label: data[i].name,
                        subaccount: data[i].subaccount,
                        subaccount_name: data[i].subaccount_name,
                        subaccount_bank: data[i].subaccount_bank,            
                  })
                }               
                setAllRemittanceData(remittanceArray)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const verifyRemittancePayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/remittance/payment/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }


      const getAdDuration = ()=> {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/add/duration/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    setAdsDurationData(data)
                })
            } catch (error) {
                
            }
        }


       const getVerifyingAdvertisement = (data) => {
            const formData = new FormData();

            formData.append('reference', data.reference);
            formData.append('image', new File([data.image], data.image.name, {
                type: data.image.type,
            }))

            // formData.append('image', data.image); // Make sure this is a File object (e.g. from <input type="file" />)
            // formData.append('title', data.title);
            // formData.append('amount', data.amount);
            // formData.append('user', data.user);
            // formData.append('link', data.link);
            // formData.append('durationDate', JSON.stringify(data.durationDate)); // Must be stringified for nested objects

            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/advertisement/payment/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${access}` // ✅ DO NOT manually add Content-Type
                },
                body: formData
            });
        };


         const getAllAdvertisement = ()=> {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/get/all/advertisement/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    setAdvertisementData(data)
                })
            } catch (error) {
                
            }
        }

    const getRemittancePayment = ()=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/remit/payment/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                setRemittancePaymentData(data)
            })
        } catch (error) {
            
        }
    }


    const updateAndVerifyRemittancePaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verify_remittance_payment_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const DeactivateRemittancePayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_remittance_payment_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const UpdateRemittanceAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_remittance_payment_amount/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const ChargeBackRemittancePayment = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/charge_remittance_payment_repayment/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


     const getUnionRemittancePayment = ()=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/unon/remittance/payment/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                setUnionRemittancePaymentData(data)
            })
        } catch (error) {
            
        }
    }

    

    const updateAndVerifyUnionRemittancePaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verify_union_remittance_payment_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const DeactivateUnionRemittancePayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_union_remittance_payment_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const UpdateUnionRemittanceAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_union_remittance_payment_amount/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const ChargeBackUnionRemittancePayment = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/charge_union_remittance_payment_repayment/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getLGACertByUserPaymentData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/lga/certificate/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    // Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                var count = Object.keys(data).length;
                let lgaPayArray = []
                for (var i = 0; i < count; i++){
                    lgaPayArray.push({
                        
                            id: data[i].id,
                            
                            admin_id: data[i].admin.id,
                            profile_pic: data[i].admin.profile_pic,
                            first_name: data[i].admin.first_name,
                            last_name: data[i].admin.last_name,
                            cid: data[i].admin.cid,
                            nimc_no: data[i].admin.nimc_no,
                            email: data[i].admin.email,
                            title: data[i].admin.title,
                            middle_name: data[i].admin.middle_name,
                            dob: data[i].admin.dob,
                            place_of_birth: data[i].admin.place_of_birth,
                            mobile: data[i].admin.mobile,
                            address: data[i].admin.address,
                            marital_status: data[i].admin.marital_status,
                            sex: data[i].admin.sex,
                        
                        
                            lga_name: data[i].lga?.name,
                            chairman: data[i].lga?.chairman,
                            secretary: data[i].lga?.secretary,
                            secretary_phone: data[i].lga?.secretary_phone,
                            subAccount: data[i].lga?.subAccount,
                            plan: data[i].lga?.plan,
                            
                            owner_fullname: data[i].owner_fullname,
                            amount: data[i].amount,
                            owner_address:data[i].owner_address,
                            owner_mother:data[i].owner_mother,
                            owner_father:data[i].owner_father,
                            owner_were_born:data[i].owner_were_born,
                            issued:data[i].issued,
                            delivered:data[i].delivered,
                            delivered_through:data[i].delivered_through,
                            ref: data[i].ref,
                            verified: data[i].verified,
                            made_at: data[i].made_at,
                            updated_at: data[i].updated_at
                            
                    })
                }               
                setLGACertUserPaymentInformationData(lgaPayArray)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateAndVerifyGeneralServicePaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verif_general_service_payment_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const DeactivateGeneralServicePayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_general_service_payment_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const UpdateGeneralServiceAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_general_service_payment_amount/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const ChargeBackGeneralServicePayment = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/charge_general_service_payment_repayment/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


     const getAdvertisementPayment = ()=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/advertisement/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            }).then(resp => resp.json())
            .then(data => {
                // console.log('data', data)
                setAdvertisementPaymentData(data)
            })
        } catch (error) {
            
        }
    }

    const updateAndVerifyAdvertisementPaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verify_advertisement_payment_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const DeactivateAdvertisementPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_advertisement_payment_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const UpdateAdvertisementAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_advertisement_payment_amount/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const ChargeBackAdvertisementPayment = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/charge_advertisement_payment_repayment/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const updateAndVerifyAppSubscriptionPaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verify_appsubscription_payment_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const DeactivateAppSubscriptionPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_appsubscription_payment_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const UpdateAppSubscriptionAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_appsubscription_payment_amount/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const ChargeBackAppSubscriptionPayment = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/charge_appsubscription_payment_repayment/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


   
    const updateAndVerifyExternalAppPaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/update_verify_externalapi_payment_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const DeactivateExternalAppPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/deactivate_externalapi_payment_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }


    const UpdateExternalAppAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/update_externalapi_payment_amount/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }

    const ChargeBackExternalAppPayment = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/charge_externalapi_payment_repayment/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


     const createFine = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/api/fine/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            
        }
    }

    const getFineData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/api/fine/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setFineData(data)     
               
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
        }
    }

    const getFinePaymentManagerData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/api/fine/payment/manager/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setFinePaymentManagerData(data)     
               
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
        }
    }


    
    const DeactivateDigitalCard = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/api/deactivate-digital-card/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }


async function bulkAssignLimits({ cardType = null, onlyNull = false }) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/bulk-assign-limits/`, {
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card_type: cardType,      // 'basic', 'gold', or 'diamond'
        only_null: onlyNull       // true or false
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Bulk assignment failed:', error);
      alert(`Error: ${error.message}`);
      return;
    }

    const result = await res.json();
    console.log('✅ Bulk assign result:', result);
    alert(`✅ ${result.updated_count} limits assigned successfully`);
  } catch (err) {
    console.error('Fetch error:', err);
    alert('Network or server error occurred.');
  }
}


  const getCardApplication = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/physical-card-applications/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setCardApplication(data)     
               
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
        }
    }


  const getPosMerchantData= () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/pos/merchant/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setPosMerchantData(data)     
               
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
        }
    }

    
    const updateAndVerifyPOSMerchantPaymentAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verify_pos_merchant_authorization_code/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const DeactivatePOSMerchantPayment = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_pos_merchant_is_active/`, {
                method: 'PATCH',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
       
      }


      
  const getAllCardApplication = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/all-physical-card-applications/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setAllCardApplication(data)     
               
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
        }
    }


  return (
    <ServiceContext.Provider value={{
        servicedata, setServiceData,
        getService,
        setNimcData,nimcdata,
        nimcno, setNimc,
        getNimcData,
        currencyFormat,
        formatTimeStamp,
        cardnumberonetime, setCardNumberOneTime,
        cvvonetime, setCvvOneTime,
        expirymonthonetime, setExpiryMonthOneTime,
        expiryyearonetime, setExpiryYearOneTime,
        cardnumberauto, setCardNumberAuto,
        cvvauto, setCvvAuto,
        expirymonthauto, setExpiryMonthAuto,
        expiryyearauto, setExpiryYearAuto,
        paymentdata, setPaymentData,
        getAllPayment,
        failed, setFailed,
        message, setMessage,
        pay4medata, setPay4MeData,
        getAllPay4MePayment,
        makePayment,
        paydata, setPayData,
        verifyPaymentOneTime,verifyPaymentAutoRenewal,
        isPaymentVisible, setIsPaymentVisible,
        retrieveAllAutoRenewalData,
        setPlans, plans,
        sharePayment,
        getAllPayChannelPayment,
        pay4mechanneldata, setPay4MeChannelData,
        getParkInformationData,
        parkInformationData, setParkInformationData,
        CreateParkPayment,
        getVerifyParkPaymentRef,
        parkPaymentDetailData,setParkPaymentDetailData,
        taxino, setTaxiNo,
        mobile, setMobile,
        getParkPaymentData,
        parkPaymentInformationData,setParkPaymentInformationData,
        getEduPaymentData,
        eduPaymentInformationData,setEduPaymentInformationData,
        getLoanDuration,
        loandurationdata, setLoanDurationData,
        CreateLGAApplicationCertificate,
        verifyLgaCertificate,
        lgaPaymentDetailData, setLgaPaymentDetailData,
        getLGACertPaymentData,
        lgaPaymentInformationData, setLGAPaymentInformationData,
        getLGACertPaymentByUserIdData,
        LgaPaymentInformationUserIdData, setLGAPaymentInformationUserIdData,
        getCertDuration,
        certDurationData, setCertDurationData,
        getVerifyingLgaCertAndAddCard,
        updateAndVerifyLgaCertAuthorization,
        repayLgaCertificate,
        updateLgaCertificateStatus,
        postMonoLinkinkingToRetrieveID,
        getAllLinkedAccount,
        AllLinkedAccountData, setAllLinkedAccountData,
        getUserIDLinkedAccount,
        UserLinkedAccountData, setUserLinkedAccountData,
        unlinkAccount,
        allRemittanceData, setAllRemittanceData,
        getAllRemittanceInfo,
        verifyRemittancePayment,
        getAdDuration,
        adsDurationData, setAdsDurationData,
        getVerifyingAdvertisement,
        getAllAdvertisement,
        advertisementdata, setAdvertisementData,
        getRemittancePayment,
        remittancepaymentdata, setRemittancePaymentData,
        updateAndVerifyRemittancePaymentAuthorization,
        DeactivateRemittancePayment,
        UpdateRemittanceAmount,
        ChargeBackRemittancePayment,
        getUnionRemittancePayment,
        unionremittancedata, setUnionRemittancePaymentData,
        updateAndVerifyUnionRemittancePaymentAuthorization,
        DeactivateUnionRemittancePayment,
        UpdateUnionRemittanceAmount,
        ChargeBackUnionRemittancePayment,
        getLGACertByUserPaymentData,
        lgaCertUserPaymentInformationData, setLGACertUserPaymentInformationData,
        updateAndVerifyGeneralServicePaymentAuthorization,
        DeactivateGeneralServicePayment,
        UpdateGeneralServiceAmount,
        ChargeBackGeneralServicePayment,
        getAdvertisementPayment,
        advertisementPaymentData, setAdvertisementPaymentData,
        updateAndVerifyAdvertisementPaymentAuthorization,
        DeactivateAdvertisementPayment,
        UpdateAdvertisementAmount,
        ChargeBackAdvertisementPayment,
        updateAndVerifyAppSubscriptionPaymentAuthorization,
        DeactivateAppSubscriptionPayment,
        UpdateAppSubscriptionAmount,
        ChargeBackAppSubscriptionPayment,
        updateAndVerifyExternalAppPaymentAuthorization,
        DeactivateExternalAppPayment,
        UpdateExternalAppAmount,
        ChargeBackExternalAppPayment,
        createFine,
        getFineData,
        fineData, setFineData,
        getFinePaymentManagerData,
        finePaymentManagerData, setFinePaymentManagerData,
        DeactivateDigitalCard,
        bulkAssignLimits,
        getCardApplication,
        cardApplication, setCardApplication,
        getPosMerchantData,
        posMerchantData, setPosMerchantData,
        updateAndVerifyPOSMerchantPaymentAuthorization,
        DeactivatePOSMerchantPayment,
        getAllCardApplication,
        allCardApplication, setAllCardApplication
    }}>
      {children}
    </ServiceContext.Provider>
  )
}

export default ServiceContextProvider

export const useServiceContext = () => useContext(ServiceContext)