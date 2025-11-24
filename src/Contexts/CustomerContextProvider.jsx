import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';

const CustomerContext = createContext()


const CustomerContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()

    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access')

    const [email, setEmail] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [listbank, setListBank] = useState('')
    const [accountNumber, setAccountNumber] = useState("")
    const [currency, setCurrency] = useState("")
    const [bankCode, setBankCode] = useState("")
    const [bankType, setBankType] = useState("")
    const [accountfullname, setAccountFullname] = useState("")
    const [reason, setReason] = useState("")
    const [amount, setAmount] = useState("")
    const [loanstatus, setLoanStatus] = useState("")
    const [userWalletWithdrawAmountData, setUserWalletWithdrawAmountData] = useState(0)

    const [socialaccount, setSocialAccount] = useState("")
    const [authorizationCode, setAuthorizationCode] = useState("")


    const [customerdata, setCustomerData] = useState([])
    const [transactiondata, setTransactionData] = useState([])
    const [subscriptiondata, setSubscriptionData] = useState([])
    const [enableData, setEnableData] = useState([])
    const [linkdata, setLinkData] = useState([])
    const [userwalletamount, setUserWalletAmountData] = useState([])
    const [listbankdata, setListBankData] = useState([])
    const [linkurl, setLinkUrl] = useState("")
    const [currencydata, setCurrencyData] = useState([])
    const [bankCodedata, setBankCodeData] = useState([])
    const [bankTypedata, setBankTypeData] = useState([])
    const [resolvedata, setResolveData] = useState([])
    const [receipientdata, setRecipientData] = useState([])
    const [pindata, setPinData] = useState([])
    const [userwalletdetaildata, setUserWalletDetailData] = useState([])
    const [transferreceiptdata, setTransferReceiptData] = useState([])
    const [userroledata, setUserRoleData] = useState([])
    const [loanreasondata, setLoanReasonData] = useState([])
    const [walletbycustomercodedata, setWalletByCustomerCodeData] = useState([])
    const [identificationbyuseriddata, setIdentificationByUserIdData] = useState([])
    const [nextofkinbyuseriddata, setNextOfKinByUserIdData] = useState([])
    const [residentialcontactbyuseriddata, setResidentialContactByUserIdData] = useState([])
    const [officeinformationbyuseriddata, setOfficeInformationByUserIdData] = useState([])
    const [socialaccountdata, setSocialAccountData] = useState([])
    const [socialaccountmanagerdata, setSocialAccountManagerData] = useState([])
    const [loanstatusdata, setLoanStatusData] = useState([])
    const [userloanwalletdata, setUserLoanWalletData] = useState([])
    
    const [loanapplicationapplydata, setLoanApplicationApplyData] = useState([])
    const [loanapplicationapproveddata, setLoanApplicationApprovedData] = useState([])
    const [loanapplicationRejecteddata, setLoanApplicationRejectedData] = useState([])
    const [loanapplicationcleareddata, setLoanApplicationClearedData] = useState([])
    const [loanapplicationinprogressdata, setLoanApplicationInProgressData] = useState([])

    const [loanapplicationmanagerapplydata, setLoanApplicationManagerApplyData] = useState([])
    const [loanapplicationmanagerapproveddata, setLoanApplicationManagerApprovedData] = useState([])
    const [loanapplicationmanagerRejecteddata, setLoanApplicationManagerRejectedData] = useState([])
    const [loanapplicationmanagercleareddata, setLoanApplicationManagerClearedData] = useState([])
    const [loanapplicationmanagerinprogressdata, setLoanApplicationManagerInProgressData] = useState([])
        

    const [stipendapplicationuserapplydata, setStipendApplicationUserApplyData] = useState([])
    const [stipendapplicationuserapprovedata, setStipendApplicationUserApproveData] = useState([])
    
    const [stipendapplicationmanagerapplydata, setStipendApplicationManagerApplyData] = useState([])
    const [stipendapplicationmanagerapprovedata, setStipendApplicationManagerApproveData] = useState([])
    
    const [userloanbyuseriddata, setUserLoanByUserIdData] = useState([])
    const [datasub, setDataSub] = useState(null)

  
    const [ transactionmanagerdata, setTransactionManagerData ]  = useState([])
    const [ transfertransactiondata, setTransferTransactionData ]  = useState([])

    const [ allsubscriptiondata, setAllSubscriptionData ]  = useState([])

    const [ totalloanissued, setTotalLoanIssuedData ]  = useState([])
    const [loanyeardata, setLoanYearData] = useState([])


    const [customeremail, setCustomerEmail] = useState([])
    const [usercategorydata, setUserCategoryData] = useState([])

    const [subAccountData, setSubAccountData] = useState([])
    const [userWalletFromLoan, setUserWalletFromLoan] = useState([])
    const [carddetaildata, setCardDetailData] = useState([])
    const [allcarddata, setAllCarddata] = useState([])
    const [usercarddata, setUserCarddata] = useState([])
    const [recipients, setRecipients] = useState([]);
    const [payerdata, setPayerdata] = useState([]);
    const [subscriptiondurationdata, setSubscriptionDurationData] = useState([]);
    const [mysubscriptiondata, setMySubscriptionData] = useState([]);
    const [totalVisit, setTotalVisit] = useState([]);
    const [todayVisit, setTodayVisit] = useState([]);
    const [requestParkData, setRequestParkData] = useState([]);
    const [parkTicketData, setParkTicketData] = useState([]);
    const [appSubscription, setAppSubscription] = useState([]);
    const [activeTotal, setActiveTotal] = useState(null);
    const [appSubActiveTotal, setAppSubActiveTotal] = useState(null);
    const [remittanceActiveTotal, setRemittanceActiveTotal] = useState(null);
    const [parkTicketActiveTotal, setParkTicketActiveTotal] = useState(null);
    const [transactionSuccessfulData, setTransactionSuccessfulData] = useState(null);
    const [totalStipendsData, setTotalStipendsData] = useState(null);
    const [totalLoanData, setTotalLoanData] = useState(null);
    const [webAndMobileAppData, setWebAndMobileAppData] = useState(null);
    const [connectedAppData, setConnectedAppData] = useState(null);
    const [singleAccount, setSingleAccount] = useState(null);
    const [cardSubAccountData, setCardSubAccountData] = useState([]);
    const [transportRecipientData, setTransportRecipientData] = useState([]);
    const [qrWalletTransactionData, setQrWalletTransactionData] = useState([]);
    const [recipientArrayData, setRecipientArrayData] = useState([]);
    const [QrUserWalletTransactionData, setQrUserWalletTransactionData] = useState([]);

    
    const [loadingList, setLoadingList] = useState(false);
    const [paying, setPaying] = useState(false);
    const [lat, setLat ] = useState("")
    const [lon, setLon ] = useState("")




        
//    fetch = (originalFetch => {
//     return (...arguments) => {
//         const result = originalFetch.apply(this, arguments);
//         return result.then(console.log('Request was sent'));
//     };
//    })(fetch);



 const getUserRole = () => {
        if (!userId) {
            console.error('Customer ID is null or undefined');
            return
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/get/user/role/${userId}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('userrole', data)
                setUserRoleData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const customerRegistrationBankend = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/customer/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                // setCustomerData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const customerWalletRegistration = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/wallet/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                // setCustomerData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    // const getUserWallet = () => {
    //      if (!userId) {
    //         console.error('Customer ID is null or undefined');
    //         return
    //     }
    //     try {
    //         return fetch(`${import.meta.env.VITE_BASE_URL}v/get/user/wallet/${userId}/`,{
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Authorization': `Bearer ${access}`
    //             },
    //         })
    //         .then(resp => resp.json())
    //         .then(data => {
    //             // console.log('wallet-id', data)
    //             setUserWalletAmountData(data[0]?.balance)
    //             setUserWalletWithdrawAmountData(data[0]?.total_withdraw)
    //         })
    //     } catch (error) {
    //         console.log("Poor network connection", error)
    //     }
    // }

    const getUserWallet = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/wallet/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('wallet-id', data)
                // setUserWalletAmountData(data[0]?.balance)
                setUserWalletAmountData(data)
                // setUserWalletWithdrawAmountData(data[0]?.total_withdraw)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
   
    const getUserWalletDetail = (admin_id, currency_code) => {
        if(!admin_id || !currency_code){
            console.log('User ID not found')
            return
        }
        try {
            // return fetch(`${import.meta.env.VITE_BASE_URL}v/api/wallet/${admin_id}/`,{
            return fetch(`${import.meta.env.VITE_BASE_URL}v/wallets/${admin_id}/${currency_code}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('userwalletdetail>>>', data)
                setUserWalletDetailData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


const patchUserWallet = async (admin_id, country_currency, updateData) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}v/wallet/currency/${admin_id}/${country_currency}/`,
            {
                method: 'PATCH',
                credentials: 'include', // Important for cookie authentication
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to update wallet');
        }

        return await response.json();
    } catch (error) {
        console.error("Wallet update error:", error);
        throw error;
    }
};



    const customerLoanWalletRegistration = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/loan/wallet/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                // setCustomerData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const patchUserLoanWallet = (admin, body) => {
        if (!admin) {
                console.error('Customer ID is null or undefined');
                return
             }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/loan/wallet/${admin}/`,{
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                // setUserWalletAmountData(data[0].balance)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getUserLoanWallet =  async (user_id) => {
       
        
        try {
           const response = await fetch(`${import.meta.env.VITE_BASE_URL}v/user/loan/wallet/${user_id}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })

             if (response.status === 401) {
            console.log("Access token expired, trying to refresh...");
            // const refreshed = await refreshAccessToken();
            // if (refreshed) {
            //     console.log("Token refreshed, retrying profile fetch");
            //     return getProfileUser();
            // } else {
            //     console.error("Refresh token failed, session expired");
            //     throw new Error("Session expired. Please log in again.");
            // }
            }
            
            const data = await response.json();
            setUserLoanWalletData(data)
        
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const pinRegistration = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/create/user/pin/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                // setPinData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    
    const TransactionReciept = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/transfer/reciept/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                // setPinData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const customerRegistration = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/customer/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    const getCustomerTransaction = (customer_id) => {
        if (!customer_id) {
                console.error('User ID is null or undefined');
                return
             }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/transactions/?customer_id=${customer_id}`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setTransactionData(data.transactions)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    
    const getCustomerTransactionManager = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/paystack/transactions/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('cust', data)
                setTransactionManagerData(data.data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const createRecipient = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/api/paystack/transferrecipient/`,{
                method: 'POST',
                credentials:'include',
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

    const createSubscription = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/subscription/`,{
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getCustomerSubscription = (customer_id) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/subscriptions/${customer_id}/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                    // 'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
            .then(resp => resp.json())
            .then(response => {
                // console.log('r', response.subscriptions)
                setSubscriptionData(response.subscriptions)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }

    }


    const getCustomerSubscriptionByExpire = (id) => {
       
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/subscription?customer=${id}/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
              setDataSub(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getCustomerSubscriptionByEmail = (email) => {
        if (!email) {
                console.error('Email is null or undefined');
                return
             }
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/subscription?q=${email}/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('Email', data)
              setCustomerEmail(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const enableSubscription = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/subscription/enable/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const updateCardOnSubscription = (code) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/subscription/${code}/manage/link/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    const disableSubscription = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/subscription/disable/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const sendMeLink = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/send/link/email/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


    
    
     const getAccountResolveDetail = async (account_number, bank_code) => {
         if(!accountNumber || !bank_code){
            console.log('Bank code could not be found')
            return
        }
     try {
         const response = await fetch(`${import.meta.env.VITE_HOST_NAME}/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, {
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
         },
         });
 
         const res = await response.json();
         console.log("Resolve API response:", res); // <-- check this
         setResolveData(res.data || {}); // or res if res.data doesn't exist
     } catch (error) {
         console.log("Poor network connection", error);
         setResolveData({});
     }
     };

    // const getAccountResolveDetail = (account_number, bank_code) => {
    //     if(!accountNumber || !bankCode){
    //         console.log('Bank code could not be found')
    //         return
    //     }
    //     try {
    //         return fetch(`${import.meta.env.VITE_HOST_NAME}/bank/resolve?account_number=${account_number}&&bank_code=${bank_code}`,{
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
    //             },
    //         })
    //         .then(response => response.json())
    //         .then(res => {       
    //             setResolveData(res?.data)             
    //         })
    //     } catch (error) {
    //         alert("Poor network connection", error)
    //     }
    // }

    const transferFund = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/paystack/transferfund/`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const finalTransfer = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/transfer/finalize_transfer`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getListAllBanks = (selectedCurrency) => {
        
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/api/banks?currency=${selectedCurrency}`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log('res', res)
                var count = Object.keys(res.data).length;
                let bankArray = []
                for (var i = 0; i < count; i++){
                    bankArray.push({
                    value: res.data[i].code,
                    label: res.data[i].name,
                  })
                }
                setListBankData(bankArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getListBanksType = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/bank/type/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => { 
                // console.log('res', res)
                var count = Object.keys(res).length;
                let typeArray = []
                for (var i = 0; i < count; i++){
                    typeArray.push({
                    value: res[i].type,
                    label: res[i].type,
                  })
                }               
                setBankTypeData(typeArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getListBanksCurrency = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/api/currency-types/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => { 
                // console.log('res',res)
                var count = Object.keys(res).length;
                let currencyArray = []
                for (var i = 0; i < count; i++){
                    currencyArray.push({
                    value: res[i].currency,
                    label: res[i].currency,
                  })
                }               
                setCurrencyData(currencyArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const createRecipientTransferBackend = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/recipient/transfer/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('recipient>>>>', data)               
                // setRecipientData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    const getRecipientTransferInformation = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/recipient/transfer/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('recipient>>>>', data)               
                setRecipientData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getReceiptTransfer = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/transfer/reciept/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('recipient>>>>', data) 
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getPinBackend = async (payload) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_BASE_URL}fee/get/pin/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access}`  // uncomment if you need token auth
        },
        body: JSON.stringify(payload), // send pin in body, not URL
        });

        const data = await resp.json();
        // console.log("pin>>>>", data);
        setPinData(data);
        return data;
    } catch (error) {
        console.error("Network error", error);
        alert("Poor network connection");
    }
    };

    const getTransferReceiptBackendData = () => {
         if(!userId){
            console.log('No UserID available')
            return
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/transfer/receipt/list/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                console.log('receipt>>>>', data) 
                setTransferReceiptData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getWalletByCustomerCode = (user_id, currency) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/user/wallet/${user_id}/${currency}/`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((resp) =>  resp.json())
            .then((data) => {
                // console.log('wallet>>>>', data);
                setWalletByCustomerCodeData(data);
                
            })
            .catch(error => {
                console.log('Network or parsing error', error);
            });
        } catch (error) {
            alert("Poor network connection", error);
        }
    }



    const getIdentificationByUserIdData = (user_id) => {
         if(!user_id){
            console.log('No UserID available')
            return
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/user/identification/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('wallet>>>>', data) 
                setIdentificationByUserIdData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    const getNextOfKinByUserIdData = (user_id) => {
         if(!user_id){
            console.log('No UserID available')
            return
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/user/nextofkin/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('wallet>>>>', data) 
                setNextOfKinByUserIdData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }
    
    const getResidentialContactByUserIdData = (user_id) => {
         if(!user_id){
            console.log('No UserID available')
            return
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/user/residential/contact/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('wallet>>>>', data) 
                setResidentialContactByUserIdData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getOfficeInformationByUserIdData = (user_id) => {
         if(!user_id){
            console.log('No UserID available')
            return
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/user/office/contact/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('wallet>>>>', data) 
                setOfficeInformationByUserIdData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    const LoanApplication = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/loan/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const patchLoanApplicationById = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/loan/${id}/`,{
                method: 'PATCH',
                credentials:'include',
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

    const getLoanApplicationByManagerApply = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/manager/apply/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    amount: data[i].amount,
                    loan_year: data[i].loan_year,
                    created_at: data[i].created_at,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    authorization_code: data[i].authorization_code,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setLoanApplicationManagerApplyData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    

    const getLoanApplicationByManagerApproved = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/manager/approved/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    loan_year: data[i].loan_year,
                    amount: data[i].amount,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    authorization_code: data[i].authorization_code,
                    created_at: data[i].created_at,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setLoanApplicationManagerApprovedData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    
    const getLoanApplicationByManagerRejected = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/manager/rejected/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    loan_year: data[i].loan_year,
                    amount: data[i].amount,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    created_at: data[i].created_at,
                    authorization_code: data[i].authorization_code,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setLoanApplicationManagerRejectedData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    const getLoanApplicationByManagerCleared = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/manager/cleared/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('cleared',data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    amount: data[i].amount,
                    loan_year: data[i].loan_year,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    created_at: data[i].created_at,
                    authorization_code: data[i].authorization_code,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setLoanApplicationManagerClearedData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
   
    const getLoanApplicationByManagerInProgress = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/manager/inprogress/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanArray = []
                for (var i = 0; i < count; i++){
                    loanArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    loan_year: data[i].loan_year,
                    amount: data[i].amount,
                    start_date: data[i].start_date,
                    due_date: data[i].due_date,
                    authorization_code: data[i].authorization_code,
                    created_at: data[i].created_at,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setLoanApplicationManagerInProgressData(loanArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    
    const getLoanApplicationByApply = () => {
         if (!userId) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/apply/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setLoanApplicationApplyData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getLoanApplicationByUserApproved = () => {
         if (!userId) {
            console.error('User ID is null or undefined');
                return;
            }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/approved/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setLoanApplicationApprovedData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
   
    const getLoanApplicationByUserRejected = () => {
         if (!userId) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/rejected/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setLoanApplicationRejectedData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    const getLoanApplicationByUserCleared = () => {
            if (!userId) {
                console.error('User ID is null or undefined');
                return;
            }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/cleared/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setLoanApplicationClearedData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    const getLoanApplicationByUserInProgress = () => {
         if (!userId) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/loan/inprogress/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setLoanApplicationInProgressData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getLoanData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/reason/loan/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => { 
                // console.log(res)
                var count = Object.keys(res).length;
                let loanreasonArray = []
                for (var i = 0; i < count; i++){
                    loanreasonArray.push({
                    value: res[i]?.name,
                    label: res[i]?.name,
                  })
                }               
                setLoanReasonData(loanreasonArray)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const addSocialMediaToDB = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/social/media/accounts/`,{
                method: 'POST',
                credentials:'include',
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


    const getAllSocialAccountByUser = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/social/media/accounts/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('socialaccount>>>>', data) 
                setSocialAccountData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    const getSocialMediaAccountByUserIdData = (user_id) => {
         if (!user_id) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/social/media/account/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('socialaccount>>>>', data) 
                setSocialAccountManagerData(data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getLoanStatus = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/loan/status/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let loanStatusArray = []
                for (var i = 0; i < count; i++){
                    loanStatusArray.push({
                    value: data[i].name,
                    label: data[i].name,
                  })
                }         
                setLoanStatusData(loanStatusArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


const stipendToDB = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/stipend/`,{
                method: 'POST',
                credentials:'include',
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

    const getStipendApplicationByUserApply = () => {
         if (!userId) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/stipend/apply/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setStipendApplicationUserApplyData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getStipendApplicationByUserApprove = () => {
         if (!userId) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/stipend/approve/${userId}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setStipendApplicationUserApproveData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getStipendApplicationByManagerApply = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/stipend/manager/apply/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let stipendArray = []
                for (var i = 0; i < count; i++){
                    stipendArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    stipend_year: data[i].stipend_year,
                    amount: data[i].amount,
                    created_at: data[i].created_at,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setStipendApplicationManagerApplyData(stipendArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getStipendApplicationByManagerApprove = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/stipend/manager/approve/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('dataapprove', data)
                var count = Object.keys(data).length;
                let stipendArray = []
                for (var i = 0; i < count; i++){
                    stipendArray.push({
                    id: data[i].id,
                    status: data[i].status,
                    reason: data[i].reason,
                    stipend_year: data[i].stipend_year,
                    amount: data[i].amount,
                    created_at: data[i].created_at,
                    admin_id : data[i].admin?.id,
                    admin : {
                        id: data[i].admin?.id,
                        profile_pic: data[i].admin?.profile_pic,
                        first_name: data[i].admin?.first_name,
                        last_name: data[i].admin?.last_name,
                        nimc_no: data[i].admin?.nimc_no,
                        email: data[i].admin?.email,
                        title: data[i].admin?.title,
                        middle_name: data[i].admin?.middle_name,
                        dob: data[i].admin?.dob,
                        place_of_birth: data[i].admin?.place_of_birth,
                        mobile: data[i].admin?.mobile,
                        address: data[i].admin?.address,
                        customer_id: data[i].admin?.customer_id,
                        customer_code: data[i].admin?.customer_code,                      
                        marital_status: data[i].admin?.marital_status,
                        sex: data[i].admin?.sex,
                        category: data[i].admin?.category,
                        country: data[i].admin?.country,
                        state: data[i].admin?.state,
                        lga: data[i].admin?.lga,
                        ward: data[i].admin?.ward
                    }
                  })
                }         
                setStipendApplicationManagerApproveData(stipendArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const patchStipendApplicationById = (id, body) => {
         if (!id && !body) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/stipend/${id}/`,{
                method: 'PATCH',
                credentials:'include',
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

    const getLoanDataByUserId = (user_id) => {
        if (!user_id) {
            console.error('User ID is null or undefined');
            return;  // Exit the function if userId is invalid
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/user/loan/data/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('landata>>>>', data) 
                setUserLoanByUserIdData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }
    
    // Business 
    const getUserManager = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/api/users/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('wallet-id', data)
                setUserCategoryData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getTransferTransanction = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_HOST_NAME}/transfer`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
                }
            }).then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setTransferTransactionData(data?.data)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const getAllSubscription = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/subscriptions/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(response => {
                // console.log('response-sub>>>>', response)
                setAllSubscriptionData(response.data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    

    const getTotalLoanIssued = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get/balance/loan/issued/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('wallet-id', data)
                setTotalLoanIssuedData(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }

    
    const getLoanYearData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/year/loan/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('dataapprove', data)
                var count = Object.keys(data).length;
                let loanYearArray = []
                for (var i = 0; i < count; i++){
                    loanYearArray.push({
                    value: data[i].name,
                    label: data[i].name
                  
                  })
                }         
                setLoanYearData(loanYearArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
   

    const getSubAccountData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/subaccount/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                var count = Object.keys(res).length;
                let subArray = []
                for (var i = 0; i < count; i++){
                    subArray.push({
                    value: res[i].name,
                    label: res[i].name,
                    id: res[i].id,
                    subaccount: res[i].subaccount,
                    initial_amount: res[i].initial_amount
                  })
                }
                setSubAccountData(subArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    

    const updatePaidOnlyUser = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/partial/payment/status/update/`, {
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
      
   
      const updateUserOption = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update/user/option/`, {
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

          
    const getVerifyAddCard = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify/transaction/loan/`,{
                method: 'POST',
                credentials:'include',
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

    
    const repayLoan = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/repay/`,{
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


    const updateAndVerifyLoanAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update/authorization/`, {
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

  
    const createBridgeCard = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/create/card/`,{
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

      const createBridgeCardHolder = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/create/card/holder/`,{
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


    const getAllCardData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get-all-card/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('card', data)
                setAllCarddata(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    
    
    const getCardDetailData = (card_id) => {
         if (!card_id) {
            console.error('Card ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get-card-details/${card_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    // 'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                    // 'token': `Bearer ${import.meta.env.VITE_BRIDGECARD_AUTHORIZATION_KEY}`
                },
            })
            .then(resp => resp.json())
            .then(resp => {
                // console.log('detail', resp.card_details)
                setCardDetailData(resp.card_details)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


    const getAllUserCardData = (user_id) => {
         if (!user_id) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/get-all-card/${user_id}/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log('wallet-id', data)
                setUserCarddata(data)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    

    const fundCard = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/fund_card/`,{
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

    const fundIssuingWallet = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/fund-issuing-wallet/`,{
                method: 'PATCH',
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


    const FreezeCard = (card_id)=> {
         if (!card_id) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/freeze-card/${card_id}/`,{
                method: 'PATCH',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
               
            })
        } catch (error) {
            console.log(error)
        }
    }

    const UnfreezeCard = (card_id)=> {
         if (!card_id) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/un/freeze-card/${card_id}/`,{
                method: 'PATCH',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
        } catch (error) {
            console.log(error)
        }
    }


    const VerifyCardTransactionBeforeFunding = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/verify_card_transaction/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const debitAndTransfer = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/debit_transfer/`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }



    const UpdateSubscriptionAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/update/subscriptions/auth_code/`, {
                method: 'PATCH',
                credentials:'include',
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
      

    const CreatePayrollRecipient = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/create-payroll-recipient/`, {
                method: 'POST',
                credentials:'include',
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
      

      const fetchPayrollRecipients = async () => {
        setLoadingList(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}v/recipients/`, {
            credentials:'include',
            // headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
          });
          const data = await res.json();
          if (res.ok) setRecipients(data);
          else toast.error("Failed to load recipients");
        } catch (e) {
          toast.error("Network error");
        }
        setLoadingList(false);
      };
    

      const payAllPayrollRecipient = async () => {
        setPaying(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}v/recipients/pay-all/`, {
            method: 'POST',
            credentials:'include',
            // headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
          });
          const { results } = await res.json();
          if (res.ok) {
            results.forEach(r => {
              if (r.status === 'paid') toast.success(`Paid user ${r.user}`);
              else toast.error(`${r.status}: ${r.detail}`);
            });
            // optionally refresh balances or list
          } else {
            toast.error("Failed to pay all");
          }
        } catch (e) {
          toast.error("Network error during payment");
        }
        setPaying(false);
      };
   

      const handleSinglePay = async (recipientId, accountNumber) => {
         if (!recipientId && !accountNumber) {
            console.error('User ID is null or undefined');
            return;
        }
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}v/payroll/pay/${recipientId}/`,
            {
              method: 'POST',
              credentials:'include',
              headers: {
                // 'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ account_number: accountNumber })
            }
          );
      
          // HTTP-level errors
          if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return toast.error(`Request failed: ${err.detail || response.statusText}`);
          }
      
          const data = await response.json();
      
          // Business-logic success/failure
          if (data.status === 'paid') {
            return toast.success(`Payment to user ${recipientId} was successful!`);
          }
      
          // Handle specific failure reason
          const errorDetail = data.detail || 'Unknown error';
          if (errorDetail === "You cannot initiate third party payouts at this time") {
            return toast.error(errorDetail);
          }
      
          // Generic failure
          toast.error(`Payment failed for user ${recipientId}: ${errorDetail}`);
        } catch (error) {
          console.error('Fetch exception:', error);
          toast.error(`Payment request failed: ${error.message}`);
        }
      };
      

        const CreatePayer = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/api/payer/`, {
                    method: 'POST',
                    credentials:'include',
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
          

          const fetchPayerData = async () => {
            setLoadingList(true);
            try {
              const res = await fetch(`${import.meta.env.VITE_BASE_URL}v/api/payer/`, {
                credentials:'include',
                headers: { 
                    // Authorization: `Bearer ${access}` 
                }
              });
              const data = await res.json();
            //   console.log('data', data)
              if (res.ok) setPayerdata(data);
              else console.log("Failed to load recipients");
            } catch (e) {
                console.log("Network error");
            }
            setLoadingList(false);
          };


          const updateAccountLinkStatus = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/account/link/status/`, {
                    method: 'PATCH',
                    credentials:'include',
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

          const updateCardEnrollmentStatus = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/card/enrollment/status/`, {
                    method: 'PATCH',
                    credentials:'include',
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
         
    

          const updateCustomerEmail = (customer_code, data) => {
             if (!customer_code) {
                console.error('User ID is null or undefined');
                return;
            }
            try {
                const { email } = data;
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/email/${customer_code}/`, {
                    method: 'PUT',
                    credentials:'include',
                    headers: {
                        // 'Authorization': `Bearer ${access}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
                
            } catch (error) {
                console.log(error)
            }
           
          }
    
          const updateCustomerPhone = (customer_code, phone) => {
             if (!customer_code && !phone) {
                console.error('User ID is null or undefined');
                return
             }
                
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/phone/${customer_code}/`, {
                    method: 'PUT',
                    credentials:'include',
                    headers: {
                        // 'Authorization': `Bearer ${access}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(phone)
                })
                
            } catch (error) {
                console.log(error)
            }
           
          }
    
          const updateCustomerFirstName = (customer_code, first_name) => {
            if (!customer_code && !first_name) {
                console.error('User ID is null or undefined');
                return
             }
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/firstname/${customer_code}/`, {
                    method: 'PUT',
                    // credentials:'include',
                    headers: {
                        // 'Authorization': `Bearer ${access}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(first_name)
                })
                
            } catch (error) {
                console.log(error)
            }
          }


          const updateCustomerLastName = (customer_code, last_name) => {
            if (!customer_code && !last_name) {
                console.error('User ID is null or undefined');
                return
             }
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/lastname/${customer_code}/`, {
                    method: 'PUT',
                    credentials:'include',
                    headers: {
                        // 'Authorization': `Bearer ${access}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(last_name)
                })
                
            } catch (error) {
                console.log(error)
            }
           
          }
         

        const updateProfilePic = (userId, file) => {
            const formData = new FormData();
            formData.append('id', userId);
            formData.append('profile_pic', file);
            try {

                return fetch(`${import.meta.env.VITE_BASE_URL}v/update/profile/image/`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        // 'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: formData
                })
                
            } catch (error) {
                console.log(error)
            }
            
        }


        const fetchCoordinates = async (address) => {
            
            if(!address){
                console.log('You Address is empty')
                return
            }
            try {
              const res = await fetch(`${import.meta.env.VITE_BASE_URL}v/geocode?q=${encodeURIComponent(address)}`);
              const data = await res.json();
              if (res.ok) {
                console.log("Coordinates:", data.lat, data.lon);
                setLat(data.lat)
                setLon(data.lon)
              } else {
                console.error("Error:", data.error);
              }
            } catch (err) {
              console.error("Network error", err);
            }
          };
    
          const reverseGeocode = async (lat, lon) => {

            if(!lat && !lon){
                console.log('You lat and lng is empty')
                return
            }
                Swal.fire({
                    title: 'Fetching address...',
                    didOpen: () => {
                        Swal.showLoading();
                },
                    allowOutsideClick: false,
                });

            try {
              const response = await fetch(`${import.meta.env.VITE_BASE_URL}v/reverse-geocode/?lat=${lat}&lon=${lon}`);
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
              if (data.display_name) {
                    Swal.fire({
                    title: 'Address Found',
                    text: data.display_name,
                    icon: 'info',
                    confirmButtonText: 'OK',
                    });
                } else {
                    Swal.fire('No address found.', '', 'warning');
                }
            //   if (data.display_name) {
            //     console.log("Reverse geocoded address:", data.display_name);
            //     alert(`Address: ${data.display_name}`);
            //   } else {
            //     console.warn("No address found:", data);
            //     console.log("No address found.");
            //   }
            } catch (error) {
              console.error("Error fetching reverse geocode:", error);
              console.log("Failed to get address.");
            }
          };
          
           const createCardPin = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/card/set-pin/`, {
                    method: 'POST',
                    credentials:'include',
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

    const MysubscriptionTransactionVerification = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/my_subscription_transaction_verification/`,{
                method: 'POST',
                credentials:'include',
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

     const getSubscriptionDuration = ()=> {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}fee/duration/subscription/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                }).then(resp => resp.json())
                .then(data => {
                    // console.log('data', data)
                    setSubscriptionDurationData(data)
                })
            } catch (error) {
                
            }
        }

        const getMySubscription = (userId) => {
            
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/get_my_subscription/${userId}/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                       
                    },
                })
                .then(resp => resp.json())
                .then(data => {
                    // console.log('r', data)
                    setMySubscriptionData(data)
                })
            } catch (error) {
                console.log("Poor network connection", error)
            }

        }


    const updateAndVerifyMySubscriptionAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_verify_my_subscription_authorization_code/`, {
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

    const DeactivateAccount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/deactivate_my_subscription_is_active/`, {
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

    const UpdateSubscriptionAccount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/update_my_subscription_amount/`, {
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

    const ChargeBackMySubscription = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/charge_my_subscription_repayment/`,{
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

   function addTwoMonthDuration(date, duration) {
    const d = new Date(date);

    const months = parseInt(duration.months || 0);
    const years = parseInt(duration.years || 0);
    const weeks = parseInt(duration.weeks || 0);
    const days = parseInt(duration.days || 0);

    const isExactlyTwoMonths =
        months === 2 && years === 0 && weeks === 0 && days === 0;

    // if (!isExactlyTwoMonths) {
    //     throw new Error("Only exact 2-month durations are supported.");
    // }

    d.setMonth(d.getMonth() + 2);
    return d;
    }



    function getDurationBreakdown(start, end) {
        if (!start || !end) return 'One-time payment';

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate) || isNaN(endDate)) return 'One-time payment';

        const msInDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round((endDate - startDate) / msInDay);

        const years = endDate.getFullYear() - startDate.getFullYear();
        const months = endDate.getMonth() - startDate.getMonth() + years * 12;

        // 🌟 Match known plans
        if (diffDays === 0) return 'One-time payment';
        if (diffDays === 1) return 'Daily Plan';
        if (diffDays === 7) return 'Weekly Plan';
        if (months === 1 && startDate.getDate() === endDate.getDate()) return 'Monthly Plan';
        if (months === 3 && startDate.getDate() === endDate.getDate()) return 'Quarterly Plan';
        if (months === 12 && startDate.getDate() === endDate.getDate()) return 'Yearly Plan';

        // 🧠 Fallback to duration in days
        return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }

    const getTrackVisitToSite = () => {
      
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}v/track_visit/`, {
                method: 'GET',
                credentials:'include'
            })
            .then(response => {
                if (!response.ok) throw new Error("Network error");
                return response.json();
            })
            .then(data => {
                // console.log("Visit data:", data);
                // Example: set state
                setTotalVisit(data.total_visits);
                setTodayVisit(data.today_visits);
            })
            .catch(error => {
                console.error("Error fetching visits:", error);
            });
            
        } catch (error) {
            console.log(error)
        }
        
    }


    const RequestForParkID = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/api/park/`,{
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

    const getRequestParkID = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/api/park/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('receipt>>>>', data) 
                setRequestParkData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    const getParkTicket = (userId) => {
            
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}p/get_park_ticket/${userId}/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                       
                    },
                })
                .then(resp => resp.json())
                .then(data => {
                    // console.log('r', data)
                    setParkTicketData(data)
                })
            } catch (error) {
                console.log("Poor network connection", error)
            }

        }
        
    const updateAndVerifyParkTicketAuthorization = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/update_verify_park_ticket_authorization_code/`, {
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

    const DeactivateParkTicket = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/deactivate_park_ticket_is_active/`, {
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

    const UpdateParkTicketAmount = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/update_park_ticket_amount/`, {
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

    const ChargeBackParkTicket = (body)=> {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}p/charge_park_ticket_repayment/`,{
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

         
 const getAppSubscription = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/app/subscription/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('receipt>>>>', data) 
                setAppSubscription(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getActiveSubscription = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/subscriptions/active-total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setActiveTotal(data);
                // setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                // setLoading(false);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getActiveAppSubscription = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/app-subscriptions/active-total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setAppSubActiveTotal(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getRemittanceActiveSubscription = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/unionremittance/active-total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setRemittanceActiveTotal(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }



 const getParkTicketActiveSubscription = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/park-ticket/active-total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setParkTicketActiveTotal(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getTransactionSuccessful = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/paystack-monthly/active-total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setTransactionSuccessfulData(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getTotalApprovedStipends = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/stipends/total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setTotalStipendsData(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getTotalApprovedLoan = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/loan-approved/total/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setTotalLoanData(data);
                // console.log(data)
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getWebAndMobileAppData = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/api/web/mobile/url/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setWebAndMobileAppData(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

 const getConnectedApps = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}partner/api/connected/app/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setConnectedAppData(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


 const getSingleAccount = () => {

        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}v/api/single/account/virtual/`,{
                credentials:'include'
            })
            .then(res => res.json())
            .then(data => {
                setSingleAccount(data);
            })
            .catch(err => {
                console.error('Failed to fetch active total:', err);
                });
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    const handleLoanUpdate = async (userId, amount) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}v/api/update-loan-wallet/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include'
        },
        body: JSON.stringify({ user_id: userId, amount })
        });

        const data = await res.json();
        console.log('Loan update:', data);
        // Optional: show toast or display updated loan balances
    } catch (err) {
        console.error('Failed to update loan:', err);
    }
    };


    const getCardSubAccountData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/card-subaccount/`,{
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                var count = Object.keys(res).length;
                let subArray = []
                for (var i = 0; i < count; i++){
                    subArray.push({
                    value: res[i].name,
                    label: res[i].name,
                    id: res[i].id,
                    subaccount: res[i].subaccount,
                    amount: res[i].amount,
                    maintenance_fee: res[i].maintenance_fee
                  })
                }
                setCardSubAccountData(subArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }


     const createTransportRecipientTransferBackend = (body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/api/paystack/transport/transferrecipient/`,{
                method: 'POST',
                credentials:'include',
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


    
    const getTransportRecipientTransferInformation = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/transport/recipient/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('recipient>>>>', data)               
                setTransportRecipientData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }

    
    const getAllQrWalletTransaction = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/wallet/qr/transactions/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('recipient>>>>', data)               
                setQrWalletTransactionData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


           const getAllRecipientData = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}fee/recipient/transfer/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${userdata?.access}`
                },
            })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                var count = Object.keys(data).length;
                let recipientArray = []
                for (var i = 0; i < count; i++){
                    recipientArray.push({
                    label: data[i].account_name,
                    value: data[i].recipient_code,
                    
                  })
                }         
                setRecipientArrayData(recipientArray)
            })
        } catch (error) {
            console.log("Poor network connection", error)
        }
    }
    

    const getAllQrUserWalletTransaction = () => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}d/user/wallet/qr/transactions/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access}`
                }
            })
            .then(resp => resp.json())
            .then(data => {  
                // console.log('recipient>>>>', data)               
                setQrUserWalletTransactionData(data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            alert("Poor network connection", error)
        }
    }


    const updateCardStatus = (body) => {
    try {
       return fetch(`${import.meta.env.VITE_BASE_URL}d/update/card/send/message/`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // If required
            },
                body: JSON.stringify(body)
            });


            } catch (error) {
                console.error(error);
            }
    };


    const getCardDetails = async (id) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/card/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // if using cookie auth
        });
        const data = await resp.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching card details", error);
    }
    };


  return (
    <CustomerContext.Provider value={{
        email, setEmail,
        firstname, setFirstName,
        lastname, setLastName,
        phone, setPhone,
        customerRegistration,
        customerdata, setCustomerData,
        customerRegistrationBankend,
        transactiondata, setTransactionData,
        getCustomerTransaction,
        getCustomerSubscription,
        subscriptiondata, setSubscriptionData,
        enableSubscription,
        setEnableData,enableData,
        createSubscription,
        updateCardOnSubscription,
        linkdata, setLinkData,
        linkurl, setLinkUrl,
        sendMeLink,
        disableSubscription,
        customerWalletRegistration,
        userwalletamount, setUserWalletAmountData,
        userWalletWithdrawAmountData, setUserWalletWithdrawAmountData,
        getUserWallet,
        getListAllBanks,
        listbank, setListBank,
        listbankdata, setListBankData,
        createRecipient,
        accountNumber, setAccountNumber,
        currency, setCurrency,
        bankCode, setBankCode,
        bankType, setBankType,
        accountfullname, setAccountFullname,
        currencydata, setCurrencyData,
        bankCodedata, setBankCodeData,
        bankTypedata, setBankTypeData,
        getListBanksCurrency,
        getListBanksType,
        getAccountResolveDetail, 
        resolvedata, setResolveData,
        receipientdata, setRecipientData,
        createRecipientTransferBackend,
        getRecipientTransferInformation,
        reason, setReason,
        amount, setAmount,
        transferFund,
        getReceiptTransfer,
        finalTransfer,
        pindata, setPinData,
        getPinBackend,
        patchUserWallet,
        getUserWalletDetail,
        userwalletdetaildata, setUserWalletDetailData,
        pinRegistration,
        TransactionReciept,
        getTransferReceiptBackendData,
        transferreceiptdata, setTransferReceiptData,
        LoanApplication,
        loanreasondata, setLoanReasonData,
        getLoanData,
        walletbycustomercodedata, setWalletByCustomerCodeData,
        getWalletByCustomerCode,
        identificationbyuseriddata, setIdentificationByUserIdData,
        getIdentificationByUserIdData,
        nextofkinbyuseriddata, setNextOfKinByUserIdData,
        getNextOfKinByUserIdData,
        residentialcontactbyuseriddata,setResidentialContactByUserIdData,
        getResidentialContactByUserIdData,
        officeinformationbyuseriddata, setOfficeInformationByUserIdData,
        getOfficeInformationByUserIdData,
        addSocialMediaToDB,
        socialaccount, setSocialAccount,
        socialaccountdata, setSocialAccountData,
        getAllSocialAccountByUser,
        getSocialMediaAccountByUserIdData,
        patchLoanApplicationById,
        loanstatusdata, setLoanStatusData,
        getLoanStatus,
        loanstatus, setLoanStatus,
        customerLoanWalletRegistration,
        patchUserLoanWallet,
        userloanwalletdata, setUserLoanWalletData,
        getUserLoanWallet,
        loanapplicationapplydata, setLoanApplicationApplyData,
        getLoanApplicationByApply,
        getLoanApplicationByUserInProgress,
        getLoanApplicationByUserCleared,
        getLoanApplicationByUserRejected,
        getLoanApplicationByUserApproved,
        loanapplicationapproveddata, setLoanApplicationApprovedData,
        loanapplicationRejecteddata, setLoanApplicationRejectedData,
        loanapplicationcleareddata, setLoanApplicationClearedData,
        loanapplicationinprogressdata, setLoanApplicationInProgressData,
        loanapplicationmanagerapplydata, setLoanApplicationManagerApplyData,
        loanapplicationmanagerapproveddata, setLoanApplicationManagerApprovedData,
        loanapplicationmanagerRejecteddata, setLoanApplicationManagerRejectedData,
        loanapplicationmanagercleareddata, setLoanApplicationManagerClearedData,
        loanapplicationmanagerinprogressdata, setLoanApplicationManagerInProgressData,
        getLoanApplicationByManagerApply,
        getLoanApplicationByManagerApproved,
        getLoanApplicationByManagerRejected,
        getLoanApplicationByManagerCleared,
        getLoanApplicationByManagerInProgress,
        getUserRole,userroledata, setUserRoleData,
        socialaccountmanagerdata, setSocialAccountManagerData,
        stipendToDB,
        getStipendApplicationByUserApply,
        stipendapplicationuserapplydata, setStipendApplicationUserApplyData,
        getStipendApplicationByUserApprove,
        stipendapplicationuserapprovedata, setStipendApplicationUserApproveData,
        patchStipendApplicationById,
        stipendapplicationmanagerapplydata, setStipendApplicationManagerApplyData,
        stipendapplicationmanagerapprovedata, setStipendApplicationManagerApproveData,
        getStipendApplicationByManagerApprove,
        getStipendApplicationByManagerApply,
        userloanbyuseriddata, setUserLoanByUserIdData,
        getLoanDataByUserId,
        getCustomerTransactionManager,
        transactionmanagerdata, setTransactionManagerData,
        getTransferTransanction,
        transfertransactiondata, setTransferTransactionData,
        getAllSubscription,
        allsubscriptiondata, setAllSubscriptionData,
        getTotalLoanIssued,
        totalloanissued, setTotalLoanIssuedData,
        loanyeardata, setLoanYearData,
        getLoanYearData,
        getCustomerSubscriptionByExpire,
        datasub, setDataSub,
        customeremail, setCustomerEmail,
        getCustomerSubscriptionByEmail,
        usercategorydata, setUserCategoryData,  getUserManager,
        getSubAccountData,
        subAccountData, setSubAccountData,
        updatePaidOnlyUser,
        updateUserOption,
        authorizationCode, setAuthorizationCode,
        getVerifyAddCard,
        repayLoan,
        updateAndVerifyLoanAuthorization,
        userWalletFromLoan, setUserWalletFromLoan,
        createBridgeCard,
        createBridgeCardHolder,
        carddetaildata, setCardDetailData,
        allcarddata, setAllCarddata,
        usercarddata, setUserCarddata,
        getCardDetailData,
        getAllCardData,
        getAllUserCardData,
        fundCard,
        fundIssuingWallet,
        FreezeCard, UnfreezeCard,
        VerifyCardTransactionBeforeFunding,
        debitAndTransfer,
        UpdateSubscriptionAuthorization,
        CreatePayrollRecipient,
        fetchPayrollRecipients,
        payAllPayrollRecipient,
        recipients, setRecipients,
        loadingList, setLoadingList,
        paying, setPaying,
        handleSinglePay,
        CreatePayer,
        fetchPayerData,
        payerdata, setPayerdata,
        updateAccountLinkStatus,
        updateCardEnrollmentStatus,
        updateCustomerEmail,
        updateCustomerPhone,
        updateCustomerFirstName,
        updateCustomerLastName,
        updateProfilePic,
        fetchCoordinates,
        lat, setLat,
        lon, setLon,
        reverseGeocode,
        createCardPin,
        MysubscriptionTransactionVerification,
       subscriptiondurationdata, setSubscriptionDurationData,
       getSubscriptionDuration,
       getMySubscription,
       mysubscriptiondata, setMySubscriptionData,
       updateAndVerifyMySubscriptionAuthorization,
       DeactivateAccount,
       ChargeBackMySubscription,
       UpdateSubscriptionAccount,
       getDurationBreakdown,
       addDuration,
       getTrackVisitToSite,
       totalVisit, setTotalVisit,
       todayVisit, setTodayVisit,
       RequestForParkID,
       requestParkData, setRequestParkData,
       getRequestParkID,
       updateAndVerifyParkTicketAuthorization,
       DeactivateParkTicket,
       UpdateParkTicketAmount,
       ChargeBackParkTicket,
       getParkTicket,
       parkTicketData, setParkTicketData,
       addTwoMonthDuration,
       getAppSubscription,
       appSubscription, setAppSubscription,
       getActiveSubscription,
       activeTotal, setActiveTotal,
       getActiveAppSubscription,
       appSubActiveTotal, setAppSubActiveTotal,
       getRemittanceActiveSubscription,
       remittanceActiveTotal, setRemittanceActiveTotal,
       getParkTicketActiveSubscription,
       parkTicketActiveTotal, setParkTicketActiveTotal,
       getTransactionSuccessful,
       transactionSuccessfulData, setTransactionSuccessfulData,
       getTotalApprovedStipends,
       totalStipendsData, setTotalStipendsData,
       getTotalApprovedLoan,
       totalLoanData, setTotalLoanData,
       getWebAndMobileAppData,
       webAndMobileAppData, setWebAndMobileAppData,
       getConnectedApps,
       connectedAppData, setConnectedAppData,
       getSingleAccount,
       singleAccount, setSingleAccount,
       getCardSubAccountData,
       cardSubAccountData, setCardSubAccountData,
       createTransportRecipientTransferBackend,
       getTransportRecipientTransferInformation,
       transportRecipientData, setTransportRecipientData,
       getAllQrWalletTransaction,
       qrWalletTransactionData, setQrWalletTransactionData,
       getAllRecipientData,
       recipientArrayData, setRecipientArrayData,
       getAllQrUserWalletTransaction,
       QrUserWalletTransactionData, setQrUserWalletTransactionData,
       updateCardStatus,
       getCardDetails
    }}>

      {children}

    </CustomerContext.Provider>
  )
}

export default CustomerContextProvider

export const useCustomer = () => useContext(CustomerContext)
