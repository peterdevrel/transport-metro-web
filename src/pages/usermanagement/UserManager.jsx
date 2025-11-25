import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../Contexts/UserContextProvider'
import { useCustomer } from '../../Contexts/CustomerContextProvider'
import { useServiceContext } from '../../Contexts/ServiceContextProvider'
import Body from '../../Components/Body'
import SettingsPanel from '../../Components/SettingsPanel'
import SideNav from '../../Components/SideNav'
import Main from '../../Components/Main'
import WelcomeGreetingHeader from '../../Components/WelcomeGreetingHeader'
import Colors from '../../Utils/Colors'
import Dropdown from '../../Components/Dropdown'
import { useSchool } from '../../Contexts/SchoolContextProvider'
import UsersList from './UsersList'
import CheckBox from '../../Components/CheckBox'
import Radio from '../../Components/Radio'
import { useTranslation } from 'react-i18next';
import RoleManager from './RoleManager'
import { ContainerTitle } from '../../Components/ContainerTitle'
import WalletCard from '../../Components/WalletCard'
import { ClipLoader } from 'react-spinners'



const ROWPERPAGE = 10

const UserManager = () => {


  const { t } = useTranslation();

  const navigate = useNavigate()


  const {
    userdata, 
    profiledata,
    isLoggedIn, 
    setIsLoggedIn, 
    getProfileUser
  } = useAuthContext()


  const {
    getUserWallet,
    usercategorydata, 
    getUserManager,
    updatePaidOnlyUser,
    updateUserOption
} = useCustomer()

const { 
  formatTimeStamp, currencyFormat
  } = useServiceContext()

const { 
  loanapplicantschooldata, 
  getALoanApplicantSchoolUserId
}= useSchool()

const userId = localStorage.getItem('userId')
const access = localStorage.getItem('access')
const [isVisible, setIsVisible] = useState(false)
const [visible, setVisible] = useState(10)
const [isLoading, setIsLoading] = useState(true)
const [isFocus, setIsFocus] = useState(false)
const [profile, setProfile] = useState([])
const [searchQuery, setSearchQuery] = useState('')

const [mypaidstatus, setMyPaidStatus] = useState(false)
const [useroption, setUserOption] = useState("Business")



useEffect(() => {
  getUserManager()
},[])


// console.log('usercategorydata', usercategorydata)

// console.log('usercategorydata', usercategorydata)


useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);

      if (!userId || !access) {
        navigate('/unauthorised');
        return;
      }

      await getProfileUser();
      await getUserWallet();

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);


const [show, setShow] = useState(false)

useEffect(() => {
  const handleContextmenu = e => {
      e.preventDefault()
  }
  document.addEventListener('contextmenu', handleContextmenu)
  return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
  }
}, [ ])







const [currentPage, setCurrentPage] = useState(0);
const totalPages = Math.ceil(usercategorydata.length / ROWPERPAGE);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
    if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
    }
};


const startIndex = currentPage * ROWPERPAGE;
const currentsubdata = usercategorydata.slice(startIndex, startIndex + ROWPERPAGE);


const [selectedUserId, setSelectedUserId] = useState(null);
const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const handleRoleClick = (user) => {
    setSelectedUserId(user.id);
    setSelectedUserEmail(user.email);
  };


  
  const handleBack = () => {
    setSelectedUserId(null);  // This will unmount RoleManager
    setSelectedUserEmail(null);
  };


const search = (data) => {
    return data.filter((item) =>
        item.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile?.toLowerCase().includes(searchQuery.toLowerCase()) 
    )}


    // console.log(profile.email)

    const AddUpdatePaidOnlyUser = () => {
      if(mypaidstatus === ""){
        alert(`Field cannot be emptied`)
      }else{
        const data = {
          "email": profile.email,
          "paid_status": mypaidstatus,
        }
        setIsLoading(true)
        updatePaidOnlyUser(data)
        .then(resp => resp.json())
        .then(data => {
          // console.log(data)
          if(data.success === "User payment status updated successfully"){
            toast.success('Successfully updated payment plan ')
            setIsLoading(false)
          }else{
            toast.warn("failed to update user")
            setIsLoading(false)
          }
        }).catch(error => {
            setIsLoading(false)
            toast.warn(error)
        })
      }
    }



    
const AddUpdateUserOption = () => {
  if(useroption === ""){
    alert(`Field cannot be emptied`)
  }else{
    const data = {
      "email": profile.email,
      "user_option": useroption,
    }
    setIsLoading(true)
    updateUserOption(data)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      if(data.success === "User option updated successfully"){
        toast.success('Successfully updated user option')
        setIsLoading(false)
      }else{
        toast.warn("failed to update user option")
        setIsLoading(false)
      }
    }).catch(error => {
        setIsLoading(false)
        toast.warn(error)
    })
  }
}








const ProfileModal = () => {
  return (
  <>      

      <div className="modal fade" id="staticBackdropProfile" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropProfileLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropProfileLabel">Profile - {profiledata?.first_name} {profiledata?.last_name}?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>                    
                <div className="modal-body">
                  <div className="row justify-content-center">
  <div className="col-lg-8">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Personal Identity Data</h4>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <img
            src={profile?.profile_pic || `${import.meta.env.VITE_BASE_URL_IMAGE}default.png`}
            width={150}
            height={150}
            style={{ borderRadius: '50%' }}
            alt="Profile"
          />
        </div>

        <div className="row mb-2">
          <div className="col-sm-6"><strong>ID:</strong> {profile?.id}</div>
          <div className="col-sm-6"><strong>ODNIN:</strong> {profile?.nimc_no}</div>
        </div>

        <div className="row mb-2">
          <div className="col-sm-6"><strong>First Name:</strong> {profile?.first_name}</div>
          <div className="col-sm-6"><strong>Last Name:</strong> {profile?.last_name}</div>
        </div>

        <div className="row mb-2">
          <div className="col-sm-6"><strong>Email:</strong> {profile?.email}</div>
          <div className="col-sm-6"><strong>Mobile:</strong> {profile?.mobile}</div>
        </div>

        <div className="row mb-2">
          <div className="col-sm-6"><strong>Date of Birth:</strong> {profile?.dob}</div>
          <div className="col-sm-6"><strong>Sex:</strong> {profile?.sex}</div>
        </div>

        <div className="row mb-2">
          <div className="col-sm-6"><strong>Marital Status:</strong> {profile?.marital_status}</div>
          <div className="col-sm-6"><strong>Category:</strong> {profile?.category}</div>
        </div>

      </div>
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


const UpdatePaymentModal = () => {
  return (
  <>      

      <div className="modal fade" id="staticBackdropPayment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropPaymentLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-6" id="staticBackdropPaymentLabel">Payment Status - {profiledata?.first_name} {profiledata?.last_name}?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>                    
                <div className="modal-body">
                
                  
            
                  <CheckBox
                      label={'Paid Status'}
                      value={mypaidstatus}
                      onChange={(e) => setMyPaidStatus(!mypaidstatus)}
                    />

           
                  
                </div>     
                <div className="modal-footer justify-content-between">
                  {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                  {isLoading ? 
                    <button type="button" className="btn btn-success">Updating...</button>:
                    <button type="button" onClick={() => AddUpdatePaidOnlyUser()} className="btn btn-success" >Updata Paid status</button>
                    }
              </div>         
              </div>
          </div>
      </div>



  </>
  )
}



const CustomModalUserOption = () => {
  return (
    <>
        <div className="modal fade" id="staticBackdropCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropPaymentLabel" aria-hidden="true">        
          <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                    <h1 className="modal-title fs-6" id="staticBackdropPaymentLabel">User Option Category - {profiledata?.first_name} {profiledata?.last_name}?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>   
            <form  method='post'>
              <div className="modal-body form-group">

            
              <Radio 
              name={'Business'}
              placeholder={'Business'}
              title={'Business'}
              value={'Business'}
              onChecked={useroption === 'Business'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Civil-Servant'}
              placeholder={'CivilServant'}
              title={'CivilServant'}
              value={'CivilServant'}
              onChecked={useroption === 'CivilServant'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Farmer'}
              placeholder={'Farmer'}
              title={'Farmer'}
              value={'Farmer'}
              onChecked={useroption === 'Farmer'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Resident'}
              placeholder={'Resident'}
              title={'Resident'}
              value={'Resident'}
              onChecked={useroption === 'Resident'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Student'}
              placeholder={'Student'}
              title={'Student'}
              value={'Student'}
              onChecked={useroption === 'Student'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Teacher'}
              placeholder={'Teacher'}
              title={'Teacher'}
              value={'Teacher'}
              onChecked={useroption === 'Teacher'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Trader'}
              placeholder={'Trader'}
              title={'Trader'}
              value={'Trader'}
              onChecked={useroption === 'Trader'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Union'}
              placeholder={'Union'}
              title={'Union'}
              value={'Union'}
              onChecked={useroption === 'Union'}
              onChange={(e) => setUserOption(e.target.value)}
            />

            <Radio 
              name={'Visitor'}
              placeholder={'Visitor'}
              title={'Visitor'}
              value={'Visitor'}
              onChecked={useroption === 'Visitor'}
              onChange={(e) => setUserOption(e.target.value)}
            />

              </div>
              <div className="modal-footer justify-content-between">
                  {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                 {isLoading ? 
                  <button type="button" className="btn btn-success">Updating...</button>:
                  <button type="button" onClick={() => AddUpdateUserOption()} className="btn btn-success" >Update User Info</button>
                  }
              </div>
            </form>
            </div>
            {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>

    </>
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
    <>
    {ProfileModal()}
    {UpdatePaymentModal()}
    {CustomModalUserOption()}
    <ContainerTitle title={'User Manager'}>

          <div className="row g-3 mb-4">
              <div className="col-3">
                <WalletCard title="User Management"/>
              </div>
              
          
            <p>Welcome, {profiledata?.first_name} </p>
        </div>
        <div className="row g-3">
            <div className="col-lg-9 col-md-8 col-sm-12"> 
  
          
                  
              <div className="tab-content mt-5" id="myTabContent">
                <div className='d-flex justify-content-end align-items-end mb-5'> 
                  <input 
                      placeholder='Search by FirstName, LastName, Email or Mobile No.'
                      type="text" 
                      className="form-control text-dark col-12" 
                      onChange={(e) => setSearchQuery(e.target.value)}                                        
                  />
              </div>
                    {/* Business */}
              <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                {searchQuery.length > 0 ?
                  <div className="row">
                      <div className="col-lg-12 grid-margin stretch-card">
                          <div className="card">
                              <div className="card-body">
                              <div className="table-responsive">
                                  <table className="table">
                                  <thead>
                                      <tr>
                                      <th>ID</th>
                                      <th>Email</th>
                                      <th>First Name</th>
                                      <th>Last Name.</th>
                                      <th>Date of Birth.</th>
                                      <th>Mobile</th>
                                      <th colSpan={2}>Action.</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      { search(usercategorydata)?.slice(0, visible)?.map((item, index) => (                       
                                        <UsersList
                                          key={index}
                                          item={item}
                                          onClickProfile={() => setProfile(item)} 
                                          onClickRole={() => handleRoleClick(item)}
                                        />              
                                      ))          
                                      }
                                  </tbody>
                              </table>

                                {/* Show RoleManager when a user is selected */}
                              {selectedUserId && (
                                <div className="mt-6">
                                  <h3>Role Manager for User #{selectedUserId}</h3>
                                  <RoleManager userId={selectedUserId} email={selectedUserEmail} onBack={handleBack}/>
                                </div>
                              )}
                              </div>
                              </div>
                          </div>
                      </div>
                  </div>
                    : (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                      <p>No records found</p> 
                    </div>
                  )  
                }
              </div>   

              </div>





                       {/* RIGHT SIDE — 4 COLUMNS (SCROLLABLE TRANSACTIONS) */}

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
    </ContainerTitle>


       
    </>
  )
}

export default UserManager