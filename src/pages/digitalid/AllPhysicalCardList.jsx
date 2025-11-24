import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
import Dropdown from '../../Components/Dropdown'
import { toast } from 'react-toastify'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import { useTranslation } from 'react-i18next';
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../components/WalletCard'


  
const deliveredData = [
    {label: 'In-Progress', value: 'In-Progress'},
    {label: 'Delivered', value: 'Delivered'},
  ]
  


const AllPhysicalCardList = () => {

    const { t, i18n } = useTranslation();
 
    useEffect(() => {
        const script = document.createElement("script")
    
        script.src = 'https://js.paystack.co/v2/inline.js';
        script.async = true;
    
        document.body.appendChild(script)
        
    },[])
    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access')


    const { 
      formatTimeStamp, 
      getAllCardApplication,
      allCardApplication,
    } = useServiceContext()

    const [isLoading, setIsLoading] = useState(false)
    const [itemdata, setItemData] = useState(false)
    const [subaccount, setSubAccount] = useState("")
    const [duration, setDuration] = useState("")
    const [deliveryStatus, setDeliveryStatus] = useState("")
    const [description, setDescription] = useState("")
    

    const {
        getSubscriptionDuration,
        addDuration,
        getCardSubAccountData,
        cardSubAccountData,
        getUserRole,
        userroledata,
        updateCardStatus,
    } = useCustomer()

    const {userdata, profiledata, getProfileUser} = useAuthContext()


    useEffect(() => {
    if(!userId || !access){
        navigate('/unathorised')
    }
    }, [])


    

    // console.log(park?.id)
  
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);

    try {
      await Promise.all([
        getAllCardApplication(),
        getCardSubAccountData(),
        getSubscriptionDuration(),
        getProfileUser(userdata.user_id),
        getUserRole()
      ]);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false); // ✅ Always runs
    }
  };

  fetchData();
}, []);


const [search, setSearch] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 5;


const filteredUsers = allCardApplication.filter(user =>
    user?.email?.toLowerCase().includes(search.toLowerCase()) 
);

const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentData = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
const totalPages = Math.ceil(filteredUsers.length / usersPerPage);




const updateStatus = async () => {
  if (!deliveryStatus) {
    alert("Please select a delivery status");
    return;
  }
  if (!description) {
    alert("Please input delivery contact in description");
    return;
  }

  const formdata = {     
    id: itemdata?.id,
    deliveredStatus: deliveryStatus,
    url: `${window.location.origin}/card/${itemdata?.user_id}`,
    description: description
  };

  setIsLoading(true);

  try {
    const resp = await updateCardStatus(formdata);
    
    // If updateCardStatus is a fetch wrapper, parse JSON
    const data = await resp.json(); 

    console.log(data);

    if (data) {
      toast.success("Status updated successfully");


      // ✅ Refresh list/table
      getAllCardApplication();

      // ✅ Reset form fields
      setDeliveryStatus("");
      setDescription("");
      setIsLoading(false)
    }

  } catch (error) {
    console.error(error);
    toast.warn("Check your internet connection");
  } finally {
    setIsLoading(false);
  }
};




const UpdateModal = () => {
  return (<div>
  <div className="modal fade" id="updateToggle" aria-hidden="true" aria-labelledby="updateToggleLabel" tabIndex={-1}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="updateToggleLabel">Update Card for {itemdata?.email}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">

                          

       
              <div className="row">

                <div className="form-group col-12 col-md-4 mb-3">
                  <Dropdown
                    label="Delivery Status"
                    className="form-control text-dark"
                    width={60}
                    options={deliveredData}
                    value={deliveryStatus}
                    onChange={(e) => setDeliveryStatus(e.target.value)}
                    placeholder="Status"
                  />
                </div>

              

              </div>

               <div className="form-group">
                    <label className="form-label">Comments:</label>
                    <textarea
                        className="form-control text-dark"
                        value={description}           // your state variable
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}                   // number of visible rows
                        placeholder="Enter your payment description here..."
                    />    
                </div>
     
        </div>
        <div className="modal-footer">
            {
                isLoading ?
            
                <button 
                    type="button"
                    className="btn btn-primary w-50 mx-auto"
                    >
                        Processing...
                    </button>:
                <button 
                    type="button"
                    onClick={() => updateStatus()}
                    className="btn btn-primary w-50 mx-auto"
                    >
                            Update
                    </button>
            }
        </div>
      </div>
    </div>
  </div>



</div>

  )
}




return (
    <>
  {UpdateModal()}
  <ContainerTitle title={'All Card Applicants'}>


      <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="All Card Listing"/>
        </div>
        
    
        <p>Welcome, {profiledata?.first_name} </p>
      </div>

       <div className="row">
            <div className="col-lg-12 col-md-4 col-sm-12">

              <div
                style={{
                  background: "#0d0d0d",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 4px 15px rgba(255,255,255,0.05)",
                }}
              >
                <h5 className="mb-3 text-center">Quick Menu</h5>

                {/* ✅ SIDE-BY-SIDE BUTTONS */}
                <div className="d-flex flex-wrap gap-2">

                  <button
                    onClick={() => navigate('/qr/payment/transaction')}
                    className="btn text-white flex-fill"
                    style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                  >
                    📥 Transactions
                  </button>

                  <button
                    onClick={() => navigate('/dispute/resolution')}
                    className="btn text-white flex-fill"
                    style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                  >
                    📥 Dispute Resolution
                  </button>

                  <button
                    onClick={() => navigate('/digital/id')}
                    className="btn text-white flex-fill"
                    style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                  >
                    📥 My ID Card
                  </button>

                  <button
                    onClick={() => navigate('/support')}
                    className="btn text-white flex-fill"
                    style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                  >
                    📥 Create Pin
                  </button>

                  <button
                    onClick={() => navigate('/pay/with/digital/id')}
                    className="btn text-white flex-fill"
                    style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                  >
                    📥 Pay with ID
                  </button>

                  {userroledata[0]?.cardManager && (
                    <button
                      onClick={() => navigate('/transport/recipient')}
                      className="btn text-white flex-fill"
                      style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                    >
                      📥 Create Transport Recipient
                    </button>
                  )}

                  {userroledata[0]?.payTerminalManager && (
                    <button
                      onClick={() => navigate('/transer/with/digital/id')}
                      className="btn text-white flex-fill"
                      style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                    >
                      📥 Transfer with ID
                    </button>
                  )}

                  {userroledata[0]?.cardVerifierManager && (
                    <button
                      onClick={() => navigate('/verify/digital/id')}
                      className="btn text-white flex-fill"
                      style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                    >
                      📥 Verify ID
                    </button>
                  )}

                  {userroledata[0]?.cardManager && (
                    <button
                      onClick={() => navigate('/digital/user/list')}
                      className="btn text-white flex-fill"
                      style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px" }}
                    >
                      📥 Download Card
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>


      <div className="row g-3">

       <div className="col-lg-12 col-md-8 col-sm-12" >
        
          <div className="col-sm-12 mb-3 mb-sm-0 mb-5" >

            
          <div className="card shadow-sm rounded-4 border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Card Listing</h5>
              </div>
              <div className="card-body" style={{ overflowX: "visible" }}>

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

                  <table className="table" style={{ overflowX: "visible" }}>
                  <thead>
                      <tr>
                      <th>Email.</th>
                      <th>Status.</th>
                      <th>Type.</th>
                      <th>Address.</th>
                      <th>Delivered.</th>
                      <th>Print.</th>
                      <th>Paid.</th>
                      <th>Created At.</th>
                      <th>Action.</th>
                      
                      </tr>
                  </thead>
                  <tbody>
                  {currentData.length > 0 ? (
                      currentData
                      .map((item, index) => (
                          
                          <tr key={index}>
                              <td>{(item.email)}</td>
                              <td>{item?.status_type}</td>
                              <td>{item?.card_type}</td>
                              <td>{item.delivery_address}</td>
                              <td>{item.physical_card_delivered}</td>
                              <td>{item.printed ? 'Printed' : 'Not Printed'}</td>
                              <td>{item.paid ? "Paid" : "Failed"}</td>
                              <td>{formatTimeStamp(item.createdAt)}</td>
                              <td>
                                <button className='btn btn-primary' 
                                    onClick={() => setItemData(item)}
                                    data-bs-target="#updateToggle" data-bs-toggle="modal"
                                >
                                    Update
                                </button>
                              </td>
                              
                          </tr>

                      ))
                  ):(
                      <tr>
                      <td colSpan="8" className="text-center text-muted">
                        No Card Payment found.
                      </td>
                    </tr>
                  )
                  }
                  </tbody>
              </table>


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
          </div>
        </div>



</div>
        

    </ContainerTitle>          
    </>
  )
}

export default AllPhysicalCardList