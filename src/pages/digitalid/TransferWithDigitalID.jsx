import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ClipLoader from 'react-spinners/ClipLoader'
import Html5QrScanner from '../../Components/Html5QrScanner'
import QRCode from 'react-qr-code'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import Dropdown from '../../Components/Dropdown'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../components/WalletCard'
import { useAuthContext } from '../../Contexts/UserContextProvider'


// ...imports unchanged

const TransferWithDigitalID = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profiledata, setIsLoggedIn, getProfileUser } = useAuthContext()
   const { getSubAccountData, 
        subAccountData,  
        getAllRecipientData,
        recipientArrayData,
    } = useCustomer()
  const { 
    formatTimeStamp, currencyFormat
    } = useServiceContext()

  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [expandScannerForm, setExpandScannerForm] = useState(false)
  const [recipientcode, setRecipientCode] = useState('');
  const [isFocus, setIsFocus] = useState(false)

  const [subaccount, setSubAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [number, setNumber] = useState("")

  const scannedRef = useRef(false)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access')
    if (!userId || !access) {
      navigate('/unauthorized')
      return
    }

    setIsLoggedIn(true)
    const fetchAllData = async () => {
      try {
        await getProfileUser()
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllData()
  }, [])

  useEffect(() => {
    getSubAccountData()
    getAllRecipientData()
  }, [])


useEffect(() => {
    handleScan()
},[])

  useEffect(() => {
    const handleContextmenu = (e) => e.preventDefault()
    document.addEventListener('contextmenu', handleContextmenu)
    return () => document.removeEventListener('contextmenu', handleContextmenu)
  }, [])

  const handleChange = (event) => {
          const selected = recipientArrayData.find(option => option.value === event.target.value);
          setRecipientCode(selected)
          
      }


  

  // const handleScan = async (data) => {
  //   if (!data || scannedRef.current) return
  //   scannedRef.current = true
  //   setError('')
  //   setResult(null)

  //   try {
  //     const subaccountCode = subaccount?.subaccount || ''
  //     const res = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}d/api/pay_with_digital/${data}/?amount=${amount}&subaccount=${subaccountCode}&number=${number}`,{
  //         credentials:'include'
  //       }
  //     )
  //     const json = await res.json()
  //     if (!res.ok || json.status === 'failed') {
  //       throw new Error(json.message || 'Verification failed')
  //     }
  //     setResult(json)
  //   } catch (err) {
  //     console.error('Verification Error:', err.message)
  //     setError(err.message || 'Verification failed.')
  //   } finally {
  //     setIsScannerOpen(false)
  //   }
  // }

//   console.log(recipientcode.value)

  const handleScan = async (data) => {
  if (!data || scannedRef.current) return;
  scannedRef.current = true;
  setError('');
  setResult(null);

  try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/transfer_with_digital_id/${data}/`, {
            method: 'POST',
            credentials:'include',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ amount,  recipient_code: recipientcode.value, country_currency:'NGN', number:number })
        });

    const json = await res.json();

    if (!res.ok || json.status === 'failed') {
      throw new Error(json.message || 'Verification failed');
    }

    setResult(json);
    setNumber("")
    setAmount("")
  
  } catch (err) {
    console.error('Verification Error:', err.message);
    setError(err.message || 'Verification failed.');
  } finally {
    setIsScannerOpen(false);
  }
};





  const resetScanner = () => {
    scannedRef.current = false
    setResult(null)
    setError('')
    setIsScannerOpen(false)
    setExpandScannerForm(false)
    setAmount("")
    setSubAccount("")
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#000" size={50} />
      </div>
    )
  }



  

  return (
    <ContainerTitle>

            <div className="row g-3 mb-4">
                   <div className="col-3">
                     <WalletCard title="Card Service"/>
                   </div>
                   
               
                   <p>Welcome, {profiledata?.first_name} </p>
             </div>
             <div className="row g-3">
               <div className="col-lg-9 col-md-8 col-sm-12"> 
            
                {/* Toggle Scanner Form Section */}
                {!expandScannerForm && !result && (
                  <div className="text-center mt-5">
                    <button className="btn btn-lg btn-primary" onClick={() => setExpandScannerForm(true)}>
                      📷 Scan Digital ID to Pay
                    </button>
                  </div>
                )}

                {/* Expanded Form */}
                {expandScannerForm && !result && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                  >
                  <div className="mt-4 p-4  col-6 bg-light center rounded shadow-sm">
                    <h3 className="text-center mb-4">Payment Details</h3>

                    <div className="form-group mb-3">
                       <Dropdown
                        className="form-control text-dark"
                        width={'100%'}
                        options={recipientArrayData}
                        value={recipientcode.value}
                        onChange={handleChange}
                        placeholder={!isFocus ? 'Category' : '...'}
                    />

                    </div>

                    <div className="form-group mb-3">
                      <label className="text-dark">Amount to Pay</label>
                      <input
                        type="text"
                        className="form-control text-dark"
                        value={amount}
                        placeholder="Amount request"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-dark">Amount to Pay</label>
                      <input
                        type="password"
                        className="form-control text-dark"
                        value={number}
                        maxLength={4}
                        placeholder="Enter your pin"
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>

                    {recipientcode?.value && amount && (
                      <div className="text-center">
                        <button className="btn btn-success" onClick={() => setIsScannerOpen(true)}>
                          ✅ Start Scanning
                        </button>
                      </div>
                    )}
                  </div>
                  </div>
                )}

                {/* Scanner Modal */}
                {isScannerOpen && !scannedRef.current && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 9999,
                    }}
                  >
                    <div
                      style={{
                        background: '#fff',
                        padding: 20,
                        borderRadius: 10,
                        maxWidth: 400,
                        width: '90%',
                      }}
                    >
                      <Html5QrScanner
                        onScanSuccess={(text) => {
                          if (text && !scannedRef.current) {
                            handleScan(text)
                          }
                        }}
                        onScanFailure={(err) => {
                          setError(err?.message || 'Scan failed')
                        }}
                      />
                      <button className="btn btn-secondary mt-3" onClick={() => setIsScannerOpen(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Display Result */}
                {result && (
                  <div className="mt-5 d-flex justify-content-center text-center">
                    <div>
                      <h3 style={{ color: result.payment?.status === 'success' ? 'green' : 'red' }}>
                        {result.payment?.status === 'success' ? '✅ Payment Successful' : '❌ Payment Failed'}
                      </h3>

                      {result.user && (
                        <>
                          <div className="my-3">
                            <QRCode value={result.qr_token || ''} size={200} />
                          </div>
                          <p><strong>Name:</strong> {result.user.full_name}</p>
                          <p><strong>Email:</strong> {result.user.email}</p>
                          <p><strong>ID Number:</strong> {result.id_number}</p>
                        </>
                      )}

                      {result.payment && (
                        <div className="mt-3 p-3 bg-light rounded" style={{ border: '1px solid #ccc' }}>
                          <p><strong>Reference:</strong> {result.payment.reference}</p>
                          <p><strong>Amount:</strong> ₦{(result.payment.amount).toFixed(2)}</p>
                          {/* <p><strong>Subaccount:</strong> {result.payment.subaccount}</p> */}
                          <p><strong>Paid At:</strong> {formatTimeStamp(result.payment.transaction_date)}</p>
                          <p><strong>Status:</strong> {result.payment.status}</p>
                        </div>
                      )}

                      <div className="mt-4">
                        <button className="btn btn-warning" onClick={resetScanner}>
                          🔄 Scan Again
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {error && !result && (
                  <div className="text-center text-danger mt-4">
                    <p>{error}</p>
                  </div>
                )}
                </div>



                         {/* RIGHT SIDE — 4 COLUMNS (SCROLLABLE TRANSACTIONS) */}
        <div className="col-lg-3 col-md-4 col-sm-12">
      
         
              <ul className="list-group">
                   {/* ==== ROUNDED MOBILE-STYLE MENU ==== */}
                <div
                  style={{
                    background: "#0d0d0d",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 4px 15px rgba(255,255,255,0.05)",
                    marginBottom: "20px",
                  }}
                >
                  <h5 className="mb-3">Quick Menu</h5>

                  <div className="d-flex flex-column gap-2">

                    <button
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                      data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                    >
                      📥 Create Card
                    </button>

                    <button
                      onClick={() => navigate('/qr/payment/transaction')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 QR Transactions
                    </button>

                    <button
                      onClick={() => navigate('/qr/payment/transaction')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 Dispute Resolution
                    </button>


                    


                  

                  </div>
                </div>

              </ul>
           

        </div>






              </div>



        



    </ContainerTitle>
   
      
  )
}

export default TransferWithDigitalID
