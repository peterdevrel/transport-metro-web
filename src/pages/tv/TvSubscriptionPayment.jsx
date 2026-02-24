import React, { useEffect, useState } from 'react'
import { useRegister } from '../../Contexts/RegistrationContextProvider'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../../Components/Dropdown'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useLibrary } from '../../Contexts/LibraryContextProvider'
import { usePayment } from '../../Contexts/PaymentContextProvider'
import { ContainerTitle } from '../../Components/ContainerTitle'
import VirtualAccountCard from '../../Components/VirtualAccountCard'
import { useDedicatedVirtualContext } from '../../Contexts/DedicatedVirtualAccountContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import { useElectricity } from '../../Contexts/ElectricityContextProvider'
import { toast } from 'react-hot-toast';


const arrayData = [
  {label:'Renew', value: 'renew'},
  {label:'Change', value: 'change'},
]

const typedata = [
    {label: 'prepaid', value: 'prepaid'},
    {label: 'postpaid', value: 'postpaid'}
]

const TvSubscriptionPayment = () => {

               
           
    const navigate = useNavigate()
           
      const {
        userdata, 
        profiledata,
        isLoggedIn, 
        setIsLoggedIn, 
        getProfileUser
      } = useAuthContext()
    
    


    const {
        leveldata,
        // getLevelSetupData,
        level, setLevel,
        addDuration
    } = useRegister()



    const {
      amount, setAmount,
      paymenttype, setPaymentType,
      feestype, setFeesType,
      getAllFeeTypeData,
      feesData,
      paymentTypeData,
      getAllPaymentTypesData,
      description, setDescription,
      getAllMyPaymentData, 
      mypaymentData,
      currencyFormat,
      savingPaymentData,
      getAllSavingPaymentData
    } = usePayment()

    const {
        getAllBookCategoryData,  
        libraryCategoryData, 
        getAllBookData,
        librarybookdata,
        formatTimeStamp,
    } = useLibrary()

    const {
        CreateUtilityInvoice,
        VerifyElectricityData, 
        getVerifyElectricityMerchant,
        ServiceElectricityData,
        getElectricityServiceData,
        service, setService,
        billercodeNumber, setBillerCodeNumber,
        type, setType,
        getBillerRequestId,
        requestIddata,
        verifyingData, setVerifyingData, 
        phone, setPhone,
        purchaseElectricity,
        generateRequestId,
        name, setName,
        CreateUtilityPayment,
        getVerifyElectricityPaymentRef,
        getCommission,
        commission,
        getTVServiceData,
        tvServiceData,
        getDataVariation,
        dataVariationData
    } = useElectricity()



      const {
        getAccountBalance,
        balance,
        getCustomerDedicatedAccount,
        virtualaccountdata = [],
      } = useDedicatedVirtualContext();
    

      const {getUserWallet} = useCustomer()

    const userId = localStorage.getItem('userId');
    const [isLoading, setIsLoading] = useState(false)
    const [isAgreed, setIsAgreed] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [error, setError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [lessonitem, setLessonItem] = useState(null)
    const [paymentItem, setPaymentItem] = useState(null)
    const [duration, setDuration] = useState("")
    const [typeArray, setTypeArray] = useState("")
    const [customerData,setCustomerData] = useState([])
    const [showPay, setShowPay] = useState(false)
    const [variation, setVariation] = useState([])


    
      
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
          await Promise.all([
            getProfileUser(userId),
            getCustomerDedicatedAccount(),
            getUserWallet(),
            getElectricityServiceData(),
            getBillerRequestId()
        ]);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    } finally {
        setIsLoading(false);
    }
    };

      
      // getLevelSetupData()
      getAllFeeTypeData()
      getAllPaymentTypesData()
      getAllMyPaymentData()
      getAllSavingPaymentData()
      getTVServiceData()
      fetchAllData();
    }, []);


  // extract virtual account data safely
  const virtualdata = virtualaccountdata?.[0];
    


const handleTypeChange = (event) => {
  const selectedValue = event.target.value;

  const selected = arrayData.find(
    (option) => option.value.toString() === selectedValue // convert to string
  );

  setType(selected)  
}


const handleChange = (event) => {
  const selectedValue = event.target.value;

  const selected = tvServiceData.find(
    (option) => option.value.toString() === selectedValue // convert to string
  );

   setService(selected)  

  // Reset child dropdowns
//   setOperatorData([]);
//   setVariationData([]);

  console.log("Selected product type:", selected);
  if (selected.value) {
    getDataVariation(selected.value);
  }

  
};


const handleVariationChange = (event) => {
  const selectedValue = event.target.value;

  const selected = dataVariationData.find(
    (v) => v.value === selectedValue
  );

  setVariation(selected || null);

  console.log("Selected variation:", selected);
};



const baseAmount = Number(amount); // electricity purchase amount

let transactionCharge = 0;

// ⚡ Electricity Commission Rule
if (baseAmount < 5000) {
    transactionCharge = 100;
} else {
    transactionCharge = 150;
}

// 💰 Cap if over ₦200,000
if (baseAmount >= 200000) {
    transactionCharge = 3000;
}

// ✅ Convert to kobo
const transactionChargeKobo = transactionCharge * 100;
const totalAmountKobo = (baseAmount + transactionCharge) * 100;


  const queryBillerRequest = () => {
    const params = {
      billersCode: billercodeNumber,
      serviceID: service?.value,
    };
  
    if (!billercodeNumber || !service?.value) {
      toast.warn("Form fields are empty");
      return;
    }
  
    
    try {
    setIsLoading(true);
      getVerifyElectricityMerchant(params)
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Verification response:", data);
  
          const code = data.code || data.responseCode;
  
          if (code === "000" && data?.content?.Customer_Type) {
            setVerifyingData(data);
            setShow(true);
          } else {
            const errorMsg =
              data?.content?.error || "Verification failed. Please check your biller number.";
            toast.error(errorMsg);
            setShow(false);
          }
        })
        .catch((error) => {
          console.error("Verification error:", error);
          toast.error("Something went wrong. Please try again.");
          setShow(false);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error("Unexpected error occurred.");
      setIsLoading(false);
      setShow(false);
    }
  };
  

const register = () => {
  if (!type.value || !totalAmountKobo || !userId) {
    toast.warn("Form fields are empty");
    setIsLoading(false);
    return;
  }

  const params = {
    request_id: generateRequestId(),
    billersCode: billercodeNumber,
    serviceID: service.value,
    variation_code: variation?.value,
    amount: Math.round(variation?.amount), // Convert kobo → Naira
    phone: verifyingData?.content?.Customer_Number,
    admin: userId
  };

  setIsLoading(true);

  try {
    purchaseElectricity(params)
      .then(async (resp) => {
        const data = await resp.json();

        if (data.code === "000") {
          console.log("Payment successful:", data);

          // ✅ Show success toast
          toast.success("Payment received");
          setCustomerData(data);
          setShow(false);
          setShowPay(true);
          setBillerCodeNumber("")
          setService("")
          setType("")
          setVerifyingData([])
        } else {
          console.error("Payment failed:", data);
          toast.error(data.response_description || "Payment failed");
        }
      })
      .catch((error) => {
        console.error("Purchase error:", error);
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => setIsLoading(false));

  } catch (error) {
    console.error(error.message);
    setIsLoading(false);
  }
};




const PaymentDetailModal = () => {
    return (
    <div>
      <div
        className="modal fade"
        id="bookDetailModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="bookDetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold" id="paymentDetailLabel">
                Payment Receipt
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              {/* TOP SECTION: Amount & Reference */}
              <div className="mb-4 border-bottom pb-3">
                <h4 className="fw-bold">NGN {paymentItem?.amount}</h4>
                <small className="text-muted">
                  Payment Reference: {paymentItem?.reference}
                </small>
              </div>

              {/* PAYMENT INFO */}
              <div className="row mb-4">

                {/* LEFT: Payment Status */}
                <div className="col-md-4 text-center">
                  <div className="border rounded p-4">
                    <h5 className={paymentItem?.last_status === "success" ? "text-success" : "text-danger"}>
                      {paymentItem?.last_status?.toUpperCase() || "PENDING"}
                    </h5>
                    <p className="text-muted">{paymentItem?.payment_type || "N/A"}</p>
                  </div>
                </div>

                {/* RIGHT: Payment Details */}
                <div className="col-md-8">
                  <h6 className="fw-bold mb-3">Payment Information</h6>
                  <p className="mb-1"><strong>User:</strong> {paymentItem?.user?.first_name} {paymentItem?.user?.last_name}</p>
                  <p className="mb-1"><strong>Email:</strong> {paymentItem?.user.email}</p>
                  <p className="mb-1"><strong>Fees Type:</strong> {paymentItem?.fees_type || "N/A"}</p>
                  <p className="mb-1"><strong>Level:</strong> {paymentItem?.level_display || "N/A"}</p>

                  <h6 className="fw-bold mt-3">Description</h6>
                  <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                    {paymentItem?.description.replace(/^<p>|<\/p>$/g, '') || "No description provided."}
                  </p>
                </div>
              </div>

              {/* FOOTER: Timestamps */}
              <div className="border-top pt-3 mt-4">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold mb-0">Created On:</h6>
                  <p className="mb-0">{formatTimeStamp(paymentItem?.createdAt)}</p>
                </div>
               
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


    );
};

   

const AddModalPayment = () => {
  return (
    <div>
      {/* =================== Meter Verification + Payment Modal =================== */}
      {show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog modal-xl"
            style={{
                width: "600px", // fixed width, adjust as needed
                maxWidth: "90%", // responsive fallback for small screens
                height: "80vh",
                overflowY: "auto",
            }}
          >
            <div className="modal-content" style={{ height: "100%" }}>
              <div className="modal-header">
                <h5 className="modal-title">Pay Utility Bill ?</h5>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShow(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body" style={{ overflowY: "auto" }}>
                <div className="container-fluid">
                  {/* =================== Inputs & Dropdowns =================== */}
                  {!showPay && (
                    <>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Biller Code</label>
                            <input
                              type="text"
                              className="form-control text-dark"
                              value={billercodeNumber}
                              onChange={(e) => setBillerCodeNumber(e.target.value)}
                              placeholder="Enter bill number"
                            />
                            {error && billercodeNumber.length <= 0 && (
                              <label className="text-danger mt-2">
                                Biller code field is empty
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Service</label>
                            <Dropdown
                              label="Select Service Area"
                              className="form-control"
                              width={60}
                              options={ServiceElectricityData}
                              value={service.value || ""}
                              onChange={handleChange}
                              placeholder="Service"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Type</label>
                            <Dropdown
                              label="Select Type"
                              className="form-control"
                              width={60}
                              options={typedata}
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              placeholder={!isFocus ? "Product" : "..."}
                            />
                            {error && type.length <= 0 && (
                              <label className="text-danger mt-2">Type field is empty</label>
                            )}
                          </div>
                        </div>

                        <div className="col-12" style={{ marginTop: 50 }}>
                          <button
                            type="submit"
                            onClick={queryBillerRequest}
                            className="btn btn-success btn-block mr-2"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* =================== Meter Verified / Payment Section =================== */}
                  {show && verifyingData && (
                    <div className="row justify-content-center mt-4">
                      <div className="col-md-8 col-lg-7 grid-margin stretch-card">
                        <div className="card shadow-lg border-0" style={{ borderRadius: "16px" }}>
                          <div className="card-body">
                            <h4 className="text-success mb-2">⚡ Meter Verified Successfully</h4>
                            <p className="text-muted mb-4">
                              Please confirm details before proceeding with payment.
                            </p>

                            {/* Info Grid */}
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <strong>Biller Code:</strong> {billercodeNumber}
                              </div>
                              <div className="col-md-6">
                                <strong>Service ID:</strong> {service.value}
                              </div>
                              <div className="col-md-6">
                                <strong>Biller Type:</strong> {type}
                              </div>
                              <div className="col-md-6">
                                <strong>Account Number:</strong> {verifyingData.content.Account_Number}
                              </div>
                              <div className="col-md-6">
                                <strong>Customer Name:</strong> {verifyingData.content.Customer_Name}
                              </div>
                              <div className="col-md-6">
                                <strong>Meter Number:</strong> {verifyingData.content.Meter_Number}
                              </div>
                              <div className="col-12">
                                <strong>Address:</strong> {verifyingData.content.Address}
                              </div>
                            </div>

                            <hr />

                            {/* Payment Form */}
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <label>Amount</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  placeholder="Enter Amount"
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Phone</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="Enter Phone Number"
                                />
                              </div>
                            </div>

                            {/* Payment Button */}
                            <div className="text-center">
                              {isLoading ? (
                                <button className="btn btn-success">
                                  Payment in progress...
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={async () => {
                                    const data = await register();
                                    if (data?.code === "000") {
                                      setCustomerData(data);
                                      setShow(false); // Close first modal
                                      setShowPay(true); // Open success modal
                                      toast.success("Payment received");
                                    }
                                  }}
                                >
                                  Pay Now {customerData?.amount && currencyFormat(totalAmountKobo / 100)}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================== Payment Success Modal =================== */}
      {showPay && customerData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog"
            style={{
              maxWidth: "40%",
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <h5 className="text-success">Payment Successful</h5>
            <p>
              Payment of <strong>{currencyFormat(customerData.amount)}</strong> has been debited
              from your wallet for <strong>{customerData.content.transactions.product_name}</strong>.
            </p>
            <p>
              Token/Units: <strong>{customerData.token || customerData.units}</strong>
            </p>
            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={() => {
                setShowPay(false);
                setCustomerData(null);
                setShow(true); // reopen verification/payment modal
              }}
            >
              Purchase Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

   



  // =====================================================
  // ========== EXIT EARLY IF LOADING (SAFE NOW) ==========
  // =====================================================
  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <ClipLoader color={Colors.WHITE} size={50} />
  //     </div>
  //   );
  // }


const disabled = showPay
  const hasVerifiedData = verifyingData?.content?.Customer_Type;

  return (
    <>
    {PaymentDetailModal()}
    {/* {AddModalPayment()} */}




<ContainerTitle title={'TV Subscription'}>


          <div className="row g-3 mb-2">

              <div className="col-3">
              <VirtualAccountCard
                account_number={virtualdata?.account_number}
                account_name={virtualdata?.account_name}
                bank={virtualdata?.bank_name}
                
              />
              
            </div>
              
          
            <p>Welcome, {profiledata?.first_name} </p>
        </div>
        <div className="row g-3">

            <div className="col-lg-9 col-md-8 col-sm-12"> 

              <div className="d-flex justify-content-end">
                  <button 
                  type="button" 
                  className="btn btn-primary" 
                   onClick={() => setShow(true)}
                  // data-bs-toggle="modal" 
                  // data-bs-target="#staticBackdrop"
                  >
                      TV Subscription
                  </button>
              </div>
              <div className="col-sm-12 mb-5 mt-5">
                <div className="card shadow-sm rounded-4 border-0">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">e-Saving Receipts</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                          <tr>
                            <th>Full Name</th>
                            <th>Amount</th>
                            <th>Status </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(savingPaymentData) && savingPaymentData.length > 0 ? (
                            savingPaymentData.map((item, idx) => (
                              <tr key={idx}>
                                <td>{item?.user?.first_name} {item?.user?.last_name} </td>
                                <td>{currencyFormat(item?.amount)}</td>
                                <td>{item?.verified === true ? "Payment Successful" : "Payment Failed" }</td>

                                <td>
                                  <div className="d-flex gap-2">
                                    
                                    <button className="btn btn-primary">
                                      <i className="fa fa-eye" 
                                          data-toggle="modal" 
                                          data-target="#bookDetailModal" 
                                          onClick={() => setPaymentItem(item)} 
                                      ></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center text-muted">
                                No lecturer users found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                        
                    </div>
                  </div>
                </div>
              </div>

            </div>

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
                    onClick={() => navigate('/dispute/resolution')}
                    className="btn w-100 text-start text-white"
                    style={{
                      background: "#1f1f1f",
                      borderRadius: "15px",
                      padding: "12px 15px",
                    }}
                  >
                    📥 Dispute Resolution
                  </button>

                  <button
                    onClick={() => navigate('/digital/id')}
                    className="btn w-100 text-start text-white"
                    style={{
                      background: "#1f1f1f",
                      borderRadius: "15px",
                      padding: "12px 15px",
                    }}
                  >
                    📥 My Digial ID
                  </button>

                  

                  


                

                </div>
              </div>

            </ul>
          </div>

        </div>

        {show && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)", // overlay
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1050,
            }}
          >
            <div
              className="modal-dialog modal-xl"
              style={{
                maxWidth: "50%",
                height: "80vh",
                overflowY: "auto",
              }}
            >
              <div
                className="modal-content"
                style={{
                  height: "100%",
                  backgroundColor: "#fff", // make content solid white
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)", // optional shadow
                }}
              >
              <div
                  className="modal-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between", // shift content to the right
                    alignItems: "center",
                    gap: "1rem", // spacing between title and button
                  }}
                >
                  <h5 className="modal-title mb-0 text-black">
                    {hasVerifiedData ? "Cable TV Bill" : "TV Subscription Service"}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShow(false)}
                    style={{ minWidth: "40px", height: "40px", borderRadius: "50%" }}
                  >
                    ×
                  </button>
                </div>


              <div className="modal-body" style={{ overflowY: "auto" }}>
                <div className="container-fluid">
                  
                  {/* =================== INITIAL PAYMENT FORM =================== */}
                  {!hasVerifiedData && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label>Biller Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={billercodeNumber}
                          onChange={(e) => setBillerCodeNumber(e.target.value)}
                          placeholder="Enter bill number"
                        />
                        {error && !billercodeNumber && (
                          <small className="text-danger">Biller code is required</small>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label>Service</label>
                        <Dropdown
                          label="Select Service"
                          className="form-control"
                          width={60}
                          options={tvServiceData}
                          value={service.value || ""}
                          onChange={handleChange}
                        />
                      </div>

                       <div className="col-md-6">
                        <label>Service</label>
                        <Dropdown
                          label="Select Service"
                          className="form-control"
                          width={100}
                          options={dataVariationData}
                          value={variation?.value || "" }
                          onChange={handleVariationChange}
                        />
                      </div>

                       {variation?.value && service?.value && (
                        <div style={{marginTop: 10}}>
                          <h6 className='text-black'><strong>Service:</strong> {variation?.label}</h6>
                          <h6 className='text-black'><strong>Code:</strong> {variation?.value}</h6>
                          <h6 className='text-black'><strong>Amount:</strong> {currencyFormat(variation?.amount)}</h6>
                        </div>
                      )}


                     

                      <div className="col-12 mt-4">
                        <button
                          className="btn btn-success btn-block"
                          onClick={queryBillerRequest}
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================== METER VERIFIED + PAYMENT FORM =================== */}
                  {hasVerifiedData && !showPay && (
                    <div className="row justify-content-center mt-4">
                      <div className="col-md-8 col-lg-7">
                        <div
                          className="card shadow-lg border-0"
                          style={{ borderRadius: "16px" }}
                        >
                          <div className="card-body">
                            <h4 className="text-success mb-2">
                              ⚡ Meter Verified Successfully
                            </h4>
                            <p className="text-muted mb-4">
                              Please confirm details before proceeding with payment.
                            </p>

                            {/* Info Grid */}
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <strong>Biller Code:</strong> {billercodeNumber}
                              </div>
                              <div className="col-md-6">
                                <strong>Service ID:</strong> {service?.value}
                              </div>
                              <div className="col-md-6">
                                <strong>Subscription Type:</strong> {variation?.label}
                              </div>
                              <div className="col-md-6">
                                <strong>Name:</strong> {verifyingData?.content?.Customer_Name}
                              </div>
                              <div className="col-md-6">
                                <strong>Customer Number:</strong> {verifyingData?.content?.Customer_Number}
                              </div>
                              <div className="col-12">
                                <strong>Due Date:</strong> {formatTimeStamp(verifyingData?.content?.Due_Date)}
                              </div>
                            </div>

                        


                            <hr />

                            {/* Payment Inputs */}
                            <div className="row">
                            
                              <div className="col-md-12">
                                {/* <label>Method</label> */}
                                <Dropdown
                                  label="Select Service"
                                  className="form-control"
                                  width={60}
                                  options={arrayData}
                                  value={type.value || ""}
                                  onChange={handleTypeChange}
                                />
                              </div>

                            </div>


                           <div className="text-center mt-5">
                            {isLoading ? (
                                <button className="btn btn-success">
                                  Payment in progress...
                                </button>
                              ) : (
                                <button
                                  className="btn btn-success"
                                  disabled={isLoading} // disable while loading
                                  onClick={register}
                                  >
                                  Pay Now {customerData?.amount && currencyFormat(variation?.amount)}
                                </button>
                              )}

                            
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================== Payment Success Modal =================== */}
{showPay && customerData && (
  <div
    onClick={() => setShowPay(false)} // click on overlay closes modal
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()} // prevent overlay click from closing inner modal
      style={{
        color: "#090202",
        maxWidth: "40%",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "2rem",
        textAlign: "center",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      }}
    >
      <h5 className="text-success">Payment Successful</h5>
      <p>
        Payment of <strong>{currencyFormat(customerData.amount)}</strong> has been debited
        from your wallet for <strong>{customerData.content.transactions.product_name}</strong>.
      </p>
      <p>
        Status: <strong>{customerData?.content?.transactions?.status}</strong>
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-success"
          onClick={() => {
            setCustomerData(null);
            setShowPay(false);
            setShow(true); // reopen verification/payment modal
          }}
        >
          Purchase Again
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setCustomerData(null);
            setShowPay(false); // just close modal
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}





</ContainerTitle>




    </>

  )
}

export default TvSubscriptionPayment