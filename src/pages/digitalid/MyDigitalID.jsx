import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MyDigitalID.css'; // Ensure this file exists
import { useAuthContext } from '../../Contexts/UserContextProvider';
import Body from '../../Components/Body';
import QRCode from 'react-qr-code';
import { useServiceContext } from '../../Contexts/ServiceContextProvider';
import { toast } from 'react-toastify';
import HeaderTitle from '../../Components/HeaderTitle';
import { ContainerTitle } from '../../Components/ContainerTitle';
import WalletCard from '../../Components/WalletCard';
import Colors from '../../Utils/Colors';

const MyDigitalID = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [digitalID, setDigitalID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const {
    userdata,
    profiledata,
    isLoggedIn,
    setIsLoggedIn,
    getProfileUser,
  } = useAuthContext();

  const { 
    DeactivateDigitalCard
  } = useServiceContext()
    

  const fetchDigitalID = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/my-digital-id/`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDigitalID(data);
      // console.log(data);
    } catch (err) {
      console.error('Error fetching digital ID', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const access = localStorage.getItem('access');

    if (!userId || !access) {
      navigate('/unauthorized');
      return;
    }

    setIsLoggedIn(true);

    const fetchAllData = async () => {
      try {
        await getProfileUser();
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    fetchDigitalID();
  }, []);



     const ActivateAndDeactivateDigitalCard = (id) => {  
          setTimeout(() => {
                DeactivateDigitalCard({id}) 
                .then(response => response.json())  
                .then((data) => {
                    // console.log(data)
                    if(data && data.message){
                        toast.success(`${data.message}`) 
                        setIsLoading(false)
                        fetchDigitalID()
                        // navigate(-1)
                    }else if(data && data.error){
                        // console.log(data.failed)
                        setIsLoading(false)
                        
                    }
                })  .catch(error => {
                    console.log(error)
                    setIsLoading(false)
                }) 
            }, 2000)  
        
        }
  



  return (
    <ContainerTitle title={'Digital Card'}>

      <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="Digital Card"/>
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
                    color:Colors.BLACK
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
                  <p><strong>Card Status:</strong> {digitalID.is_active ? 'Active' : 'Inactive'}</p>
          

                  <div className="text-center" style={{ width: '200px', margin: '0 auto' }}>
                    <button
                      onClick={() => ActivateAndDeactivateDigitalCard(digitalID.id)}
                      className={`btn btn-sm ${digitalID.is_active ? 'btn-danger' : 'btn-success'}`}
                      style={{ width: '100%' }}
                    >
                      {digitalID.is_active ? 'Block card' : 'Unblock card'}
                    </button>
                  </div>

                    
              </div>
              ) : (
              <p style={{ textAlign: 'center' }}>No ID found.</p>
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



  );
};

export default MyDigitalID;
