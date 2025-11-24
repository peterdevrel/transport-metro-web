import React, { useEffect, useState } from 'react'
import Body from '../../Components/Body'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useTranslation } from 'react-i18next'
import Colors from '../../Utils/Colors'
import ClipLoader from 'react-spinners/ClipLoader'
import Html5QrScanner from '../../Components/Html5QrScanner'
import QRCode from 'react-qr-code'
import HeaderTitle from '../../Components/HeaderTitle'
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../components/WalletCard'

const VerifyDigitalID = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profiledata, setIsLoggedIn, getProfileUser } = useAuthContext()

  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [scanned, setScanned] = useState(false)

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
        await Promise.all([getProfileUser()])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, [])

  useEffect(() => {
    const handleContextmenu = (e) => e.preventDefault()
    document.addEventListener('contextmenu', handleContextmenu)
    return () => document.removeEventListener('contextmenu', handleContextmenu)
  }, [])

 const handleScan = async (data) => {
  if (data) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/verify-id/${data}/`,{
        credentials:'include'
      });

      const json = await res.json(); // Always parse JSON (even if not OK)

      if (!res.ok || json.status === 'failed') {
        // This means verification failed (e.g., wrong code or expired)
        throw new Error(json.message || 'Verification failed');
      }

      // Valid response
      setResult(json);
      setError('');
      setScanned(true);
      setIsScannerOpen(false);
    } catch (err) {
      console.error('Verification Error:', err.message);
      setError(err.message || 'Verification failed.');
      setResult(null);
      setScanned(true);
      setIsScannerOpen(false);
    }
  }
};






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

  return (
<ContainerTitle title={'Verify ID'}>

 <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="ID Verification"/>
        </div>
        
    
        <p>Welcome, {profiledata?.first_name} </p>
      </div>


      <div className="row g-3">

        <div className="col-lg-9 col-md-8 col-sm-12">

              {/* Centered Scan Button */}
              {/* Conditionally render full screen center if idle */}
                    {!scanned && !isScannerOpen && !result ? (
                    <div style={{
                        height: '70vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <h2 className="fs-30 mb-4">{t('verify_digital_id')}</h2>
                        <button className="btn btn-primary" onClick={() => setIsScannerOpen(true)}>
                        Scan Digital ID
                        </button>
                    </div>
                    ) : (
                    <>
                        <h2 className="fs-30 mb-3">{t('digitalid')}</h2>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                        {scanned && (
                            <button className="btn btn-warning" onClick={resetScanner}>
                            Scan Again
                            </button>
                        )}
                        </div>
                    </>
                    )}


              {/* Modal Scanner */}
              {isScannerOpen && !scanned && (
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
                        if (!scanned) {
                          setScanned(true)
                          setIsScannerOpen(false)
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

              {/* Display result - centered */}
              {result ? (
                <div className="mt-4 d-flex justify-content-center text-center">
                  <div>
                    <h3>Status: {result.status}</h3>
                    {result.user && (
                      <>
                        <div style={{ marginBottom: '20px' }}>
                        <QRCode value={result.qr_token || ''} size={200} />
                        </div>
                        <p>Name: {result.user.full_name}</p>
                        <p>Email: {result.user.email}</p>
                        <p>ID Number: {result.id_number}</p>
                      </>
                    )}
                  </div>
                </div>
              ): <div className="d-flex justify-content-center text-center mt-3">
                  <p className="text-danger">{error}</p>
                </div>
                }

              {/* Display error - centered */}
              {/* {error ? (
                <div className="d-flex justify-content-center text-center mt-3">
                  <p className="text-danger">{error}</p>
                </div>
                ):""} */}

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

export default VerifyDigitalID
