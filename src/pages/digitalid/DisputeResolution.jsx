import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import { useTranslation } from 'react-i18next';
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../Components/WalletCard'




const DisputeResolution = () => {

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




    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [description, setDescription] = useState("")
    



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
        getProfileUser(userdata.user_id),
      ]);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false); // ✅ Always runs
    }
  };

  fetchData();
}, []);





const submitDispute = async () => {
  const formData = {
    description: description,
    message: message
  };
    setIsLoading(true);

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}d/card/dispute/`, {
    method: "POST",
    credentials:'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  alert(data.message)
  setIsLoading(false);
  setDescription("")
  setMessage("")
//   console.log(data);
};











return (
    <>
  <ContainerTitle title={'Dispute Resolution'}>


      <div className="row g-3 mb-4">
        <div className="col-3">
          <WalletCard title="Dispute Resolution"/>
        </div>
        
    
        <p>Welcome, {profiledata?.first_name} </p>
      </div>


      <div className="row g-3">

       <div className="col-lg-9 col-md-8 col-sm-12">
        
          <div className="col-sm-12 mb-3 mb-sm-0 mb-5" style={{ overflowX: "visible" }}>

            
          <div className="card shadow-sm rounded-4 border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Dispute Resolution</h5>
              </div>
              <div className="card-body">

                <div className="form-group col-12 col-md-12 mb-3">
                  <input 
                    type="text"
                    className="form-control w-100"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                    <label className="form-label">Dispute Resolution:</label>
                    <textarea
                        className="form-control text-dark"
                        value={message}           // your state variable
                        onChange={(e) => setMessage(e.target.value)}
                        rows={8}                   // number of visible rows
                        placeholder="Enter message description here..."
                    />    
                </div>

         
                <div className="d-flex justify-content-center my-3">
                    {isLoading ? (
                        <button type="button" className="btn btn-primary w-50">
                        Processing...
                        </button>
                    ) : (
                        <button
                        type="button"
                        onClick={() => submitDispute()}
                        className="btn btn-primary w-50"
                        >
                        Request for Responses
                        </button>
                    )}
                </div>

            
              
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

                  </div>
                </div>

              </ul>
           

        </div>
          
</div>
        

    </ContainerTitle>          
    </>
  )
}

export default DisputeResolution