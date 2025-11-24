import React, { useEffect, useState } from 'react'
import Body from '../Components/Body'
import { useCustomer } from '../Contexts/CustomerContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '../Contexts/RegistrationContextProvider'
import Dropdown from '../Components/Dropdown'
import Files from '../Components/Files'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'





const titledata = [
    {label: 'Mr', value: 'Mr'},
    {label: 'Mrs', value: 'Mrs'},
    {label: 'Dr', value: 'Drs'},
    {label: 'Miss', value: 'Miss'},
    
 ]

 

const sexData = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    
 ]
const categorydata = [
    {label: 'Commuter', value: 'commuter'},
    
 ]



const CreateUserHomePage = () => {



     const {
        setCustomerData,
        getListBanksType,
        getListAllBanks,
        setAccountNumber,
        getListBanksCurrency,
        currencydata
    } = useCustomer()
        
       
        const navigate = useNavigate()
    
        const {
            email, setEmail,
            password, setPassword,
            firstname, setFirstName,
            lastname, setLastName,
            title, setTitle,
            middlename, setMiddleName,
            dob, setDob,
            placeofbirth, setPlaceOfBirth,
            mobile, setMobile,
            phone, setPhone,
            faculty,setFaculty,
            department,setDepartment,
            address, setAddress,
            amount, setAmount,
            agreed, setAgreed,
            maritalstatus, setMaritalStatus,
            sex, setSex,
            category, setCategory,
            country, setCountry,
            mystate, setMyState,
            lga, setLga,
            userRegistration,
            profileImage, setProfileImage,
            usercategorydata,
            getAllUserCategoryData,
            getAmountByCategoryData,
            countrydata,
            getAllCountryData,
        } = useRegister()
       
           // const {customerdata} = useCustomer()
       
        const [isLoading, setIsLoading] = useState(false)
        const [isAgreed, setIsAgreed] = useState(false)
        const [isFocus, setIsFocus] = useState(false)
        const [error, setError] = useState(false)
        const [isFinised, setIsFinished] = useState(false)
        const [isVisible, setIsVisible] = useState(false)
        const [currency, setCurrency] = useState("")
    
        const [imagePreview, setImagePreview] = useState(null);
       
           const [isOnline, setIsOnline] = useState(true);
       
           useEffect(() => {
               getAllUserCategoryData()
               getAllCountryData()
               getListBanksCurrency()
               getListBanksType()
               getListAllBanks('NGN')
           },[])
       
        //    console.log(bankCode)
       
        //    const onChangeImage = (evt) => {
        //        setProfileImage(evt.currentTarget.files[0], evt.currentTarget.name)
        //        if (fileList && fileList[0]) {
        //             const file = fileList[0];
        //             setImagePreview(URL.createObjectURL(file)); // create preview URL
        //         }
        //      }

        const onChangeImage = (evt) => {
            const file = evt.currentTarget.files[0]; // get first uploaded file
            if (file) {
                setProfileImage(file, evt.currentTarget.name); // keep your original logic
                setImagePreview(URL.createObjectURL(file));   // create preview URL
            }
        };
       
       
             const handleChange = (event) => {
               const selected = usercategorydata.find(option => option.value === event.target.value);
               setCategory(selected)
               getAmountByCategoryData(event.target.value)
           }
        // console.log('accountNumber', accountNumber)
        // console.log('bankCode', bankCode)
       
       
    const register = () => {
      const formdata = new FormData();
    
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("first_name", firstname);
      formdata.append("last_name", lastname);
      formdata.append("mobile", phone);
      formdata.append("country_currency", currency);
      formdata.append("middle_name", middlename);
      formdata.append("dob", dob);
      formdata.append("address", address);
      formdata.append("category", category);
      formdata.append("country", country);
      formdata.append("user_option", category);
      formdata.append("profile_pic", profileImage);
    
      if (
        password === "" || middlename === "" || dob === "" ||
        address === "" ||  category === "" ||
        country === "" || currency === ""
      ) {
        setError(true);
        setIsLoading(false);
        alert('Form Fields are empty')
        return;
      }
    
      try {
        setIsLoading(true);
    
        userRegistration(formdata)
          .then(async (resp) => {
            const data = await resp.json();
    
            // ✅ Check status code or resp.ok
            if (resp.status === 201 || resp.ok) {
            //   toast.success("Application successfully submitted");
              Swal.fire({
                    title: 'Application Recieved',
                    text: data.result,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            //   setRegisterData(data);
              setIsVisible(true);
              setIsLoading(false);
              clearForm("");
            } else if (data.result) {
               Swal.fire({
                    title: 'Error Message',
                    text: data.result,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
              setIsLoading(false);
            } else {
              toast.warn("Something went wrong.");
              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.log(error)
            toast.error("Network error: " + error.message);
            // Swal.fire('Create a Developer API Key.', '', 'warning');
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error)
        toast.error("Exception: " + error.message);
        Swal.fire('Error saving.', '', 'warning');
        setIsLoading(false);
      }
    };
    
    
      const clearForm = () => {
        setCustomerData([])
        setEmail("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setTitle("")
        setMiddleName("")
        setDob("")
        setPlaceOfBirth("")
        setMobile("")
        setAddress("")
        setAmount("")
        setCategory("")
        setCountry("")
        setMyState("")
        setLga("")
        setSex("")
        setMaritalStatus("")
        setCurrency("")
        setEmail("")
      }


      const checkNetworkStatus = () => {
        setIsOnline(navigator.onLine);
      };
    
      useEffect(() => {
        // Set initial network status
        checkNetworkStatus();
    
        // Add event listeners for online and offline events
        window.addEventListener("online", checkNetworkStatus);
        window.addEventListener("offline", checkNetworkStatus);
    
        // Clean up event listeners on component unmount
        return () => {
          window.removeEventListener("online", checkNetworkStatus);
          window.removeEventListener("offline", checkNetworkStatus);
        };
      }, []);
       
const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
    {/* row */}
    <div className="container py-4 text-white">
      {/* <h2>Create Users</h2> */}
      <div style={{ marginLeft: 350, marginRight: 350, marginTop: 50 }}>
        <div className="container-fluid">
          <div className="col-sm-12 p-md-0">
            <div className="text-black text-center mb-5">
              <h4>New Student, Intending and Existing student are expected to </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title text-center p-5">
                    Create new account or have an account
                    ? <Link to={'/'}>Login</Link></h5>
                </div>
                <div className="card-body">

                  {/* STEP 1: Personal Info */}
                  {step === 1 && (
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          {error && firstname.length <= 0 ? <label className='text-danger mt-2'>First Name field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {error && lastname.length <= 0 ? <label className='text-danger mt-2'>Last Name field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Middle Name</label>
                          <input 
                            type="text" 
                            className="form-control text-dark" 
                            value={middlename}
                            onChange={(e) => setMiddleName(e.target.value)}                                        
                          />
                          {error && middlename.length <= 0 ? <label className='text-danger mt-2'>Middle Name field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {error && email.length <= 0 ? <label className='text-danger mt-2'>Email field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Password</label>
                          <input 
                            type="password" 
                            className="form-control text-dark" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}                                        
                          />
                          {error && password.length <= 0 ? <label className='text-danger mt-2'>Password field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-12 text-center mt-3">
                        <button className="btn btn-primary" onClick={nextStep}>Next</button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Demographics */}
                  {step === 2 && (
                    
                    <div className="row">

                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Date of Birth</label>
                          <input 
                            className="form-control text-dark" 
                            placeholder="dd/mm/yyyy" 
                            value={dob}
                            type='date'
                            onChange={(e) => setDob(e.target.value)}
                          />
                          {error && dob.length <= 0 ? <label className='text-danger mt-2'>Date of Birth field is emptied</label> : ""}
                        </div>
                      </div>


                       <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Mobile Number</label>
                          <input 
                            type="text" 
                            className="form-control"  
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}                                        
                          />
                          {error && phone.length <= 0 ? <label className='text-danger mt-2'>Phone field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <input 
                            type="text" 
                            className="form-control text-dark" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {error && address.length <= 0 ? <label className='text-danger mt-2'>Address field is emptied</label> : ""}
                        </div>
                      </div>


                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Country</label>
                          <Dropdown
                            className={'form-control text-dark'}
                            width={60} 
                            options={countrydata}
                            value={country}
                            onChange={(e) => {
                              setCountry(e.target.value)
                            }}
                            placeholder={!isFocus ? 'Country' : '...'}
                          />
                          {error && country.length <= 0 ? <label className='text-danger mt-2'>Country field is emptied</label> : ""}
                        </div>
                      </div>
                    

                     <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">User Category</label>
                          <Dropdown
                            className={'form-control text-dark'}
                            width={60} 
                            options={categorydata}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder={!isFocus ? 'Category' : '...'}
                          />
                          {error && category.length <= 0 ? <label className='text-danger mt-2'>Category field is emptied</label> : ""}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-group">
                          <label className="form-label">Currency</label>
                          <Dropdown
                            className={'form-control'}
                            width={60} 
                            options={currencydata}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            placeholder={!isFocus ? 'Currency' : '...'}
                          />
                          {error && currency.length <= 0 ? <label className='text-danger mt-2'>Currency field is emptied</label> : ""}
                        </div>
                      </div>

                      


                     
                   <div className="col-12 text-center mt-3">
                    <button className="btn btn-secondary me-2" onClick={prevStep}>Previous</button>
                    <button className="btn btn-primary" onClick={nextStep}>Next</button>
                  </div>

                    </div>
                  )}


                  {/* STEP 5: Upload & Submit */}
                 {step === 3 && (
                    <div className="row">

                      {imagePreview && (
                        <div className="row mb-4 text-center">    {/* spacing added */}
                          <div className="col-12">
                            <label className="form-label">Image Preview:</label>
                          </div>
                          <div className="col-12">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px', borderRadius: '8px' }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-lg-12 col-md-12 col-sm-12 mb-4">   {/* spacing */}
                        <div className="form-group fallback w-100">
                          <Files
                            className={'form-control'}
                            width={50}
                            height={100}
                            onChange={onChangeImage}
                          />
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-12 mb-3 text-center">
                        <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); prevStep(); }} 
                          className="btn btn-secondary btn-lg font-weight-medium auth-form-btn w-100"
                        >
                          Previous
                        </button>
                      </div>

                      <div className="col-md-6 col-sm-12 mb-3 text-center">
                        {isLoading ? (
                          <button className="btn btn-primary btn-lg font-weight-medium auth-form-btn w-100" disabled>
                            Creating, Please wait...
                          </button>
                        ) : (
                          <button 
                            type="button" 
                            onClick={(e) => { e.preventDefault(); register(); }} 
                            className="btn btn-primary btn-lg font-weight-medium auth-form-btn w-100"
                          >
                            Submit Application
                          </button>
                        )}
                      </div>

                    </div>
                  )}


                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
    </>
  )
}

export default CreateUserHomePage