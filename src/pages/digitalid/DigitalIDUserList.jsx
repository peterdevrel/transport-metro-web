import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MyDigitalID.css'; // Ensure this file exists
import { useAuthContext } from '../../Contexts/UserContextProvider';
import Colors from '../../Utils/Colors';
import QRCode from 'react-qr-code';
import { useServiceContext } from '../../Contexts/ServiceContextProvider';
import { toast } from 'react-toastify';
import Body from '../../Components/Body';
import HeaderTitle from '../../Components/HeaderTitle';
import { ContainerTitle } from '../../Components/ContainerTitle';
import WalletCard from '../../Components/WalletCard';

const DigitalUserList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    profiledata,
    setIsLoggedIn,
    getProfileUser,
  } = useAuthContext();

  const { 
        formatTimeStamp, currencyFormat,
        DeactivateDigitalCard,
        bulkAssignLimits
      } = useServiceContext()
  

  const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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


  const fetchDigitalIDUsers = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/list_digital_id_users/`,{
      credentials: 'include'
    });
    const data = await response.json();
    // console.log('data', data)
    setUsers(data);
  } catch (error) {
    console.error('Failed to fetch users', error);
    return null;
  }
};


  useEffect(() => {
    fetchDigitalIDUsers()
  }, []);

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  const regenerateQrTokenByUser = async (userId) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/digital-id/regenerate/by-user/`, {
      method: "POST",
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("QR token regenerated successfully");
      // console.log("New token:", data.qr_token);
    } else {
      alert(data.error || "Failed to regenerate token");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Network error");
  }
};


const handleDownload = async (userId) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/generate-user-card-pdf/${userId}/`,{
      credentials:'include'
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Server error:', errorData);
      alert('Error: ' + (errorData.error || 'Failed to generate ID card.'));
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `digital_id_card_${userId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Download failed:', err);
    alert('Failed to generate ID card.');
  }
};




  // const handleDownload = async (userId) => {
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/generate-user-card-pdf/${userId}/`);
  //     const blob = await res.blob();

  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'digital_id_card.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (err) {
  //     console.error('Download failed:', err);
  //     alert('Failed to generate ID card.');
  //   }
  // };

//   const handleDownload = async (userId) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/generate-user-card-pdf/${userId}/`);
    
//     if (!res.ok) {
//       throw new Error(`Server error: ${res.status}`);
//     }

//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `digital_id_card_${userId}.pdf`);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//     // Release memory
//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     console.error('Download failed:', err);
//     alert('Failed to generate ID card.');
//   }
// };



   const ActivateAndDeactivateDigitalCard = (id) => {  
        setTimeout(() => {
              DeactivateDigitalCard({id}) 
              .then(response => response.json())  
              .then((data) => {
                  // console.log(data)
                  if(data && data.message){
                      toast.success(`${data.message}`) 
                      setIsLoading(false)
                      fetchDigitalIDUsers()
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
    <ContainerTitle title={'Card Information'}>


      <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="Card Service"/>
        </div>
        
    
        <p>Welcome, {profiledata?.first_name} </p>
      </div>


      <div className="row g-3">

        <div className="col-lg-9 col-md-8 col-sm-12"> 
    

            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Card Listing</h5>
              </div>
              <div className="card-body">

                {/* 🔍 Search Input */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1); // reset to first page
                    }}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((u) => (
                          <tr key={u.id}>
                            <td>{u.full_name}</td>
                            <td>{u.email}</td>
                            <td>
                                <button
                                  onClick={() => handleDownload(u.user_id)}
                                  className="btn btn-sm btn-primary me-2"
                                >
                                  Download PDF
                                </button>
                                <button
                                  onClick={() => regenerateQrTokenByUser(u.user_id)}
                                  className="btn btn-sm btn-primary me-2"
                                >
                                  Regenerate Token
                                </button>

                                {u.is_active ? (
                                  <button
                                    onClick={() => ActivateAndDeactivateDigitalCard(u.id)}
                                    className="btn btn-sm btn-danger"
                                  >
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => ActivateAndDeactivateDigitalCard(u.id)}
                                    className="btn btn-sm btn-success"
                                  >
                                    Activate
                                  </button>
                                )}
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">
                            No matching users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* ⏮️ Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-muted">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>

              </div>
            </div>
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
                        onClick={() => bulkAssignLimits({})}
                          className="btn w-100 text-start text-white"
                          style={{
                              background: "#1f1f1f",
                              borderRadius: "15px",
                              padding: "12px 15px",
                            }}
                        >
                          Assign limits for all DigitalIDs:
                        </button>


                        <button
                          onClick={() => bulkAssignLimits({ onlyNull: true })}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Only assign where max_transaction_amount is null
                        </button>


                        <button
                            onClick={() => bulkAssignLimits({ cardType: 'gold', onlyNull: true })}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Assign Gold Limits (Only if Not Set)
                        </button>


                        <button
                            onClick={() => bulkAssignLimits({ cardType: 'basic', onlyNull: true })}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Assign Basic Limits (Only if Not Set)
                        </button>

                        <button
                            onClick={() => bulkAssignLimits({ cardType: 'diamond', onlyNull: true })}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Assign Diamond Limits (Only if Not Set)
                        </button>

                        <button
                            onClick={() => bulkAssignLimits({ cardType: 'gold'})}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Assign only for gold card users:
                        </button>

                        <button
                            onClick={() => bulkAssignLimits({ cardType: 'basic'})}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Assign only for Basic card users:
                        </button>

                        <button
                            onClick={() => bulkAssignLimits({ cardType: 'diamond', onlyNull: true })}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                              }}
                          >
                            Assign only for Diamond card users:
                        </button>

                      </div>
                    </div>

                  </ul>
              

            </div>

        </div>

    </ContainerTitle>
      

  );
};

export default DigitalUserList;
