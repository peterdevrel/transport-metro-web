import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ClipLoader from 'react-spinners/ClipLoader'
import Html5QrScanner from '../../Components/Html5QrScanner'
import QRCode from 'react-qr-code'
import Body from '../../Components/Body'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import HeaderTitle from '../../Components/HeaderTitle'
import { ContainerTitle } from '../../Components/ContainerTitle'
import Colors from '../../Utils/Colors'
import WalletCard from '../../components/WalletCard'







const PayWithDigitalID = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profiledata, setIsLoggedIn, getProfileUser } = useAuthContext()
  const { getSubAccountData, subAccountData } = useCustomer()

  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [subaccount, setSubAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(true)
  const [digitalID, setDigitalID] = useState(null)

  const userId = localStorage.getItem('userId')
  const access = localStorage.getItem('access')
  
  useEffect(() => {

    if (!userId || !access) {
      navigate('/unauthorized')
      return
    }

    setIsLoggedIn(true)
    getProfileUser().finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const handleContextmenu = (e) => e.preventDefault()
    document.addEventListener('contextmenu', handleContextmenu)
    return () => document.removeEventListener('contextmenu', handleContextmenu)
  }, [])



  useEffect(() => {
    getSubAccountData()
  }, [])

  const handleScan = async (data) => {
    if (data) {
      try {
        const subaccountCode = subaccount?.subaccount || '';
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/pay_with_digital/${data}/?amount=${amount}&subaccount=${subaccountCode}`,{
          credentials:'include'
        });
        const json = await res.json();

        if (!res.ok || json.status === 'failed') {
          throw new Error(json.message || 'Verification failed');
        }

        setResult(json)
        setError('')
        setScanned(true)
        setIsScannerOpen(false)
      } catch (err) {
        console.error('Verification Error:', err.message)
        setError(err.message || 'Verification failed.')
        setResult(null)
        setScanned(true)
        setIsScannerOpen(false)
      }
    }
  }

  const fetchDigitalID = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/my-digital-id/`, {
        credentials: 'include',
      })

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const data = await response.json()
      setDigitalID(data)
    } catch (err) {
      console.error('Error fetching digital ID', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDigitalID()
  }, [])

  const resetScanner = () => {
    setScanned(false)
    setResult(null)
    setError('')
    setIsScannerOpen(false)
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#000" size={50} />
      </div>
    )
  }



    // =====================================================
  // ========== EXIT EARLY IF LOADING (SAFE NOW) ==========
  // =====================================================
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={Colors.WHITE} size={50} />
      </div>
    );
  }

  return (
    <ContainerTitle title={'Pay with ID'}>


      <div className="row g-3 mb-4">
            <div className="col-3">
              <WalletCard title="Card Service"/>
            </div>
            <p>Welcome, {profiledata?.first_name} </p>
        </div>

    <div className="row g-3">
         <div className="col-lg-9 col-md-8 col-sm-12"> 


      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : digitalID ? (
        <div
          style={{
            margin: '20px auto',
            backgroundColor: '#f9f9f9',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            color: Colors.BLACK
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <QRCode value={digitalID.qr_token || ''} size={200} />
          </div>
          <p><strong>Name:</strong> {digitalID.full_name}</p>
          <p><strong>Email:</strong> {digitalID.email}</p>
          <p><strong>ID Number:</strong> {digitalID.id_number}</p>
          <p><strong>Issued:</strong> {digitalID.issued_date}</p>
          <p><strong>Expires:</strong> {digitalID.expiry_date}</p>
          <p><strong>Status:</strong> {digitalID.is_active ? 'Active' : 'Inactive'}</p>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No ID found.</p>
      )}

      {/* Trigger Button */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          className="btn btn-primary"
          onClick={() => setIsScannerOpen(true)}
          disabled={!amount || !subaccount}
        >
          Scan ID QR Code to Pay
        </button>
      </div>

      {/* Scanner */}
      {isScannerOpen && (
        <>
          <Html5QrScanner
            onScan={handleScan}
            onError={(err) => console.error('QR Scan error', err)}
          />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button className="btn btn-danger" onClick={resetScanner}>
              Cancel Scan
            </button>
          </div> 
        </>
      )}

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-4 text-center">
          <p><strong>Verification Successful</strong></p>
          <p>Payment Ref: {result?.payment?.reference}</p>
          <p>Amount: {result?.payment?.amount}</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4 text-center">
          <strong>Error:</strong> {error}
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

export default PayWithDigitalID
