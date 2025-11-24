import React, { useEffect, useState } from 'react'
import Body from '../../Components/Body'
import HeaderTitle from '../../Components/HeaderTitle'
import { useRegister } from '../../Contexts/RegistrationContextProvider'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../../Components/Dropdown'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useCourse } from '../../Contexts/CourseContextProvider'
import { toast } from 'react-toastify'
import DescriptionEditor from '../../Components/DescriptionEditor'

import { Editor } from '@tinymce/tinymce-react';
import { useLibrary } from '../../Contexts/LibraryContextProvider'
import Files from '../../Components/Files'
import Swal from 'sweetalert2'
import { usePayment } from '../../Contexts/PaymentContextProvider'





const AddPayment = () => {

               
           
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
        getLevelSetupData,
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
      currencyFormat
    } = usePayment()

    const {
        getAllBookCategoryData,  
        libraryCategoryData, 
        getAllBookData,
        librarybookdata,
        formatTimeStamp,
    } = useLibrary()

    const userId = localStorage.getItem('userId');
    const [isLoading, setIsLoading] = useState(false)
    const [isAgreed, setIsAgreed] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [error, setError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [lessonitem, setLessonItem] = useState(null)
    const [paymentItem, setPaymentItem] = useState(null)
    const [duration, setDuration] = useState("")

     const [modalForm, setModalForm] = useState({
        title: "",
        author: "",
        description: "",
        category_id: "",     // boolean
        available_copies: "",     // boolean
        cover_image: "",     // boolean
    })

    
      
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
            getLevelSetupData(),
            getAllFeeTypeData(),
            getAllPaymentTypesData(),
            getAllMyPaymentData(),
        ]);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    } finally {
        setIsLoading(false);
    }
    };
      fetchAllData();
    }, []);
    

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
  
  
    const filteredUsers = mypaymentData.filter(user =>
      user?.user?.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user?.department.toLowerCase().includes(search.toLowerCase())
    );
  
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentData = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);



      const handleChange = (event) => {
          const selected = feesData.find(option => option.value === event.target.value);
          setFeesType(selected)
          
      }

      const handleLevelChange = (event) => {
          const selected = leveldata.find(option => option.value === event.target.value);
          setLevel(selected)
          
      }


    const baseAmount = Number(feestype?.amount); // the amount you want subaccount to get
    let transactionCharge = Math.round(baseAmount * 0.02 + 100);

    // Cap if over ₦200,000
    if (baseAmount >= 200000) {
        transactionCharge = 3000;
    }

    // ✅ Convert each value INDIVIDUALLY to kobo
    const transactionChargeKobo = transactionCharge * 100;
    const totalAmountKobo = (baseAmount + transactionCharge) * 100;


    const now = new Date();
    const nextDue = addDuration(now, duration);

    if (isNaN(nextDue.getTime())) {
        console.error("❌ Invalid nextDue date from duration:", duration);
        throw new Error("Invalid duration: could not calculate next due date.");
    }





     const handlePayment = () => {

         setIsLoading(true)
            setTimeout(() => {
                    
                const paystack = new PaystackPop();
                paystack.newTransaction({
                    key: import.meta.env.VITE_PUBLICK_KEY,
                    email: profiledata.email,
                    amount: totalAmountKobo,
                    label: 'Education Checkout',
                    subaccount: feestype.subaccount ? feestype.subaccount : "", 
                    transaction_charge: transactionChargeKobo,
                    channels: ["card"],
                    metadata: {
                        email: profiledata.email,
                        custom_payment: true,
                        user_id: profiledata.id,
                        amount: feestype.amount,
                        level: level.id,
                        payment_type:paymenttype,
                        fees_type:feestype.id,
                        description: description,
                      
                    },   
                    onSuccess: (transaction) => { 
                    //   console.log(transaction)
                    //   console.log(transaction.reference)
                    
                        toast.success(`Transaction Successful, RefId: ${transaction.reference}`)
                    getVerifyingAdvertisement({
                        reference: transaction.reference,
                        image:adsImage,
                    }) 
                    .then(response => response.json())  
                    .then((data) => {
                        console.log(data)
                        if(data && data.message){
                            toast.success(`${data.message}`) 
                            setIsLoading(false)
                            clear()
                            getAdvertisementPayment()
                        }else if(data && data.error){
                            toast.warn(data.failed)
                            setIsLoading(false)
                        }
                    })  .catch(error => {
                        console.log(error)
                        setOtpSent(false)
                        setPaymentVisible(false)
                    })

                        
                    },
                    onCancel: () => {
                        // user closed popup
                        toast.warn('Payment Popup Closed')
                        setIsLoading(false)
                    }
                
                })
                setIsLoading(false)
                    
                
            }, 2000)  
      }


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
                  <p className="mb-1"><strong>Level:</strong> {paymentItem?.level || "N/A"}</p>

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
                {/* <div className="d-flex justify-content-between">
                  <h6 className="fw-bold mb-0">Last Payment Date:</h6>
                  <p className="mb-0">{formatTimeStamp(paymentItem?.last_payment_date)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold mb-0">Next Payment Date:</h6>
                  <p className="mb-0">{formatTimeStamp(paymentItem?.next_payment_date)}</p>
                </div> */}
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
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document" style={{ maxWidth: '50%', height: '80vh' }}>
                    <div className="modal-content" style={{ height: '100%' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Make Payment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                                    {/* Session */}
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Payment Type</label>
                                <Dropdown
                                    className="form-control text-dark"
                                    width={'100%'}
                                    options={paymentTypeData}
                                    value={paymenttype}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    placeholder={!isFocus ? 'Category' : '...'}
                                />
                                {error && paymenttype.length <= 0 && <label className='text-danger mt-2'>Payment Type field is emptied</label>}
                            </div>
                        </div>
                        {
                          paymenttype === 'Online' && 
                          (<div className="modal-body" style={{ overflowY: 'auto' }}>
                              <div className="container-fluid">
                                  <div className="row g-3"> {/* g-3 adds spacing between columns */}
                                      


                                    
                                      {/* Session */}
                                      <div className="col-md-6">
                                          <div className="form-group">
                                              <label className="form-label">Fees Type</label>
                                              <Dropdown
                                                  className="form-control text-dark"
                                                  width={'100%'}
                                                  options={feesData}
                                                  value={feestype?.value}
                                                  onChange={handleChange}
                                                  placeholder={!isFocus ? 'Category' : '...'}
                                              />
                                              {error && feestype.length <= 0 && <label className='text-danger mt-2'>Fees Type field is emptied</label>}
                                          </div>
                                      </div>


                                      {
                                        feestype  && 
                                       (
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Amount</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control text-dark" 
                                                    value={feestype?.amount}
                                                    onChange={(e) => setAmount(e.target.value)}                                        
                                                />
                                                {error && amount.length <= 0 && <label className='text-danger mt-2'>Amount field is emptied</label>}
                                            </div>
                                        </div>)
                                      }

                                     <div className="col-12">
                                      <div className="form-group">
                                          <label className="form-label">Level</label>
                                          <Dropdown
                                              className="form-control text-dark"
                                              width={'100%'}
                                              options={leveldata}
                                              value={level?.value}
                                              onChange={handleLevelChange}
                                              placeholder={!isFocus ? 'Level' : '...'}
                                          />
                                          {error && level.length <= 0 ? <label htmlFor="" className='text-danger mt-2'>Level field is emptied</label> : ""}

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
                                        {error && comments.length <= 0 && (
                                            <label className="text-danger mt-2">Comments field is empty</label>
                                        )}
                                    </div>

                                  {transactionChargeKobo}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    {isLoading ? (
                                        <button type="button" className="btn btn-primary">Processing....</button>
                                    ) : (
                                        <button type="button" onClick={() => handlePayment()} className="btn btn-primary">Make Payment</button>
                                    )}
                                </div>
                                      


                                  </div>
                              </div>
                          </div>)
                        }
                        {
                          paymenttype === 'Cash' && 
                          (<div 
                              className="modal-body d-flex justify-content-center align-items-center" 
                              style={{ overflowY: 'auto', height: '200px' }} // adjust height as needed
                            >
                              <p>Contact your school Account Officer</p>
                            </div>)
                        }

                        
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

   



  return (
    <>
    {PaymentDetailModal()}
    {AddModalPayment()}
    <Body>
        <HeaderTitle  page={'e-Payment'} title={'Payment'}/>
        <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Add Payment
            </button>
        </div>


                <div className="col-sm-12 mb-5 mt-5">
                  <div className="card shadow-sm rounded-4 border-0">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">e-Payment Receipts</h5>
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
                        <table className="table table-striped table-hover align-middle">
                          <thead className="table-dark">
                            <tr>
                              <th>Full Name</th>
                              <th>Amount</th>
                              <th>Department</th>
                              <th>Level</th>
                              <th>Status </th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentData.length > 0 ? (
                              currentData.map((item, idx) => (
                                <tr key={idx}>
                                  <td>{item?.user?.first_name} {item?.user?.last_name} </td>
                                  <td>{currencyFormat(item?.amount)}</td>
                                  <td>{item?.user?.department}</td>
                                  <td>{item?.level}</td>
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
                                  No payment found.
                                </td>
                              </tr>
                            )}
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

                  {/* MODAL */}

            {showModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center"
                    style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    zIndex: 1050,
                    overflowY: "auto",
                    paddingTop: 20,
                    paddingBottom: 20,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                    className="bg-white rounded-4 shadow p-4"
                    style={{
                        width: "90%",
                        maxWidth: "1200px",
                        maxHeight: "90%",
                        overflowY: "auto",
                        zIndex: 1100,
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Update Book</h5>
                        <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                        ></button>
                    </div>

                {/* Cover Image Preview */}
                    <div className="mb-3 text-center">
                        {modalForm.cover_image ? (
                            modalForm.cover_image instanceof File ? (
                            <img
                                src={URL.createObjectURL(modalForm.cover_image)}
                                alt="Cover"
                                className="rounded-circle mb-2"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            ) : (
                            <img
                                src={`${import.meta.env.VITE_BASE_URL_IMAGE}/${modalForm.cover_image}`}
                                alt="Cover"
                                className="rounded-circle mb-2"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            )
                        ) : (
                            <div
                            className="rounded-circle bg-secondary mb-2"
                            style={{ width: "100px", height: "100px" }}
                            ></div>
                        )}
                        </div>

                        
                    {/* Form Inputs in 2-column layout */}
                    <div className="row g-3">
                        <div className="col-md-6">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={modalForm.title}
                            onChange={(e) =>
                            setModalForm({ ...modalForm, title: e.target.value })
                            }
                        />
                        </div>

                        <div className="col-md-6">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            value={modalForm.author}
                            onChange={(e) =>
                            setModalForm({ ...modalForm, author: e.target.value })
                            }
                        />
                        </div>

                        <div className="col-md-6">
                        <label className="form-label">Available Copies</label>
                        <input
                            type="text"
                            className="form-control"
                            value={modalForm.available_copies}
                            onChange={(e) =>
                            setModalForm({ ...modalForm, available_copies: e.target.value })
                            }
                        />
                        </div>

                        <div className="col-md-6">
                        <label className="form-label">Category</label>
                        <Dropdown
                            className="form-control text-dark"
                            width="100%"
                            options={libraryCategoryData}
                            value={modalForm.category_id}
                            onChange={(e) =>
                            setModalForm({ ...modalForm, category_id: e.target.value })
                            }
                            placeholder={!isFocus ? "Category" : "..."}
                        />
                        </div>

                       
                

                        {/* Full-width Description */}
                        <div className="col-12">
                        <label className="form-label">Description</label>
                        <Editor
                            apiKey="rce84f659609zp1vu4lvink56fwifwbc6h4ll5pnct43ney7"
                            value={modalForm.description}
                            init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",
                            }}
                            onEditorChange={(content) =>
                            setModalForm({ ...modalForm, description: content })
                            }
                        />
                        {error && (
                            <label className="text-danger mt-2">
                            Description cannot be empty
                            </label>
                        )}
                        </div>


                         {/* File Upload */}
                        <div className="col-4">
                            <label className="form-label">Cover Image</label>
                            <input type="file" className="form-control" accept="image/*"
                            onChange={(e) => setModalForm({ ...modalForm, cover_image: e.target.files[0] })} />
                        </div>
                       
                    </div>

                    {/* Modal Actions */}
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                        >
                        Cancel
                        </button>
                        <button
                        className="btn btn-success"
                        onClick={updateBookReg}
                        disabled={isLoading}
                        >
                        {isLoading ? "Updating..." : "Update Book"}
                        </button>
                    </div>
                    </div>
                </div>
            )}




    </Body>
    </>

  )
}

export default AddPayment