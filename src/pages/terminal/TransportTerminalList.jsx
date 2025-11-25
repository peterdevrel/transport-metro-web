import React, { useEffect, useState } from "react";
import { ContainerTitle } from "../../Components/ContainerTitle";
import WalletCard from "../../Components/WalletCard";
import { useAuthContext } from "../../Contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dropdown from "../../Components/Dropdown";
import { useTerminal } from "../../Contexts/TerminalContextProvider";
import LocationPicker from "./LocationPicker";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Colors from "../../Utils/Colors";
import Swal from "sweetalert2";






const terminaldata = [
  { value: "bus", label: "Bus Terminal" },
  { value: "park", label: "Motor Park" },
  { value: "train", label: "Train Terminal" },
  { value: "airport", label: "Airport Terminal" },
];


const TransportTerminalList = () => {


    const { t } = useTranslation();
      const navigate = useNavigate();
      const [isLoading, setisLoading] = useState(false);
      const {
        profiledata,
        setIsLoggedIn,
        getProfileUser,
      } = useAuthContext();


      const {
        createTerminal,
        fetchStates, statesData,
      } = useTerminal()
    
  const [terminals, setTerminals] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // control modal visibility


  const [search, setSearch] = useState("");
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    code: "",
    terminal_type: "",
    address:"",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });

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
        setisLoading(false);
      }
    };
    fetchStates()
    fetchAllData();
  }, []);


  const fetchTerminals = async (url = `${import.meta.env.VITE_BASE_URL}terminal/terminals/`) => {

    setisLoading(true);

    try {
      const response = await fetch(url, {
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // console.log('res',data)
      setTerminals(data);
      setNext(data.next);
      setPrev(data.previous);
    } catch (err) {
      console.error("Error loading terminals", err);
    }

    setisLoading(false);
  };

  
  




  const handleSearch = () => {
    fetchTerminals(`${import.meta.env.VITE_BASE_URL}terminal/terminals/?search=${search}`);
  };

  useEffect(() => {
    fetchTerminals();
  }, []);



const handleSubmit = async () => {
  const { name, code, terminal_type, city, state, latitude, longitude } = formData;

  if (!name || !code || !terminal_type || !city || !state) {
    toast.warn("Please fill all required fields");
    return;
  }

  try {
    setisLoading(true);

    const payload = {
      ...formData,
      latitude: parseFloat(latitude.toFixed(6)),
      longitude: parseFloat(longitude.toFixed(6)),
    };

    const response = await createTerminal(payload);
    const data = await response.json();


    if (data.is_active) {
      Swal.fire({
          title: 'Application Recieved',
          text: data.result,
          icon: 'success',
          confirmButtonText: 'OK',
      });
      navigate('/terminal')
      
    } else {
      Swal.fire({
          title: 'Application Event',
          text: data,
          icon: 'success',
          confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    Swal.fire({
        title: 'Application Error',
        text: error.message,
        icon: 'success',
        confirmButtonText: 'OK',
    });
  } finally {
    setisLoading(false);
  }
};



  // =====================================================
  // ========== EXIT EARLY IF LOADING (SAFE NOW) ==========
  // =====================================================
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={Colors.WHITE} size={50} />
        <p>Please wait...</p>
      </div>
    );
  }


// console.log(formData?.terminal_type)

  const Modal = () => {
  return (<div>
  <div className="modal" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Create Terminal</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">

                          

                <div className="row">
                    {/* Terminal Type */}
                    <div className="form-group col-12 col-md-4 mb-3">
                        <Dropdown
                            label="Terminal Type"
                            className="form-control text-dark"
                            options={terminaldata}
                            value={formData.terminal_type} // "bus", "park", etc.
                            onChange={(e) =>
                                setFormData({ ...formData, terminal_type: e.target.value })
                            }
                            placeholder="Select Terminal Type"
                        />
                    </div>

                    {/* State */}
                    <div className="form-group col-12 col-md-4 mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                        {/* <Dropdown
                        label="State"
                        className="form-control text-dark"
                        width={60}
                        options={statesData}             // [{value, label}]
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="Select State"
                        /> */}
                    </div>

                    {/* Terminal Name */}
                    <div className="form-group col-12 col-md-4 mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Terminal Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>


                    <div className="form-group col-12 col-md-4 mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    {/* Code */}
                    <div className="form-group col-12 col-md-4 mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Code"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        />
                    </div>

                    {/* City */}
                    <div className="form-group col-12 col-md-4 mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>

                    {/* Location Picker */}
                    <div className="col-12 mb-3">
                        <LocationPicker
                        onLocationSelect={(coords) =>
                            setFormData((prev) => ({ ...prev, ...coords }))
                        }
                        />
                        <p>Latitude: {formData.latitude}</p>
                        <p>Longitude: {formData.longitude}</p>
                    </div>

                    {/* Submit Button */}
                
                </div>

            
        </div>
        <div className="modal-footer">
             {
            isLoading ?
                <button 
                    type="button"
                    className="btn btn-primary w-50 mx-auto"
                >
                        Creating....
                </button>:
                <button 
                    type="button"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary w-50 mx-auto"
                >
                        Create Terminal
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
   <ContainerTitle title={'Terminals'}>
    {Modal()}

        <div className="row g-3 mb-4">
            <div className="col-3">
                <WalletCard title="Terminals"/>
            </div>
            
        
            <p>Welcome, {profiledata?.first_name} </p>
        </div>
        <div className="row g-3">

          {/* <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
            Open Modal
          </button> */}

        <div className="col-lg-9 col-md-8 col-sm-12"> 
            {/* Search */}
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Search by name, city, code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                Search
                </button>
            </div>

            {/* Loading */}
            {isLoading && <p>Loading...</p>}

            {/* Table */}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Type</th>
                </tr>
                </thead>

                <tbody>
                {terminals?.map((t) => (
                    <tr key={t.id}>
                    <td>{t.name}</td>
                    <td>{t.code}</td>
                    <td>{t.city}</td>
                    <td>{t.state}</td>
                    <td>{t.terminal_type}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="d-flex gap-3">
                {prev && (
                <button className="btn btn-secondary" onClick={() => fetchTerminals(prev)}>
                    Previous
                </button>
                )}

                {next && (
                <button className="btn btn-primary" onClick={() => fetchTerminals(next)}>
                    Next
                </button>
                )}
            </div>


              {isOpen && (
                <div className="modal show d-block" tabIndex={-1}>
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Create Terminal</h5>
                        <button className="btn-close" onClick={() => setIsOpen(false)} />
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="form-group col-12 col-md-4 mb-3">
                            <Dropdown
                              label="Terminal Type"
                              className="form-control"
                              options={terminaldata}
                              value={formData.terminal_type}
                              onChange={(e) =>
                                setFormData({ ...formData, terminal_type: e.target.value })
                              }
                              placeholder="Select Terminal Type"
                            />
                          </div>

                          <div className="form-group col-12 col-md-4 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="State"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            />
                          </div>

                          <div className="form-group col-12 col-md-4 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Terminal Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>

                          <div className="form-group col-12 col-md-4 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                          </div>

                          <div className="form-group col-12 col-md-4 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Code"
                              value={formData.code}
                              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            />
                          </div>

                          <div className="form-group col-12 col-md-4 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>

                          <div className="col-12 mb-3">
                            <LocationPicker
                              onLocationSelect={(coords) =>
                                setFormData((prev) => ({ ...prev, ...coords }))
                              }
                            />
                            <p>Latitude: {formData.latitude}</p>
                            <p>Longitude: {formData.longitude}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setIsOpen(false)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating..." : "Create Terminal"}
                        </button>
                      </div>
                    </div>
                  </div>
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
                      onClick={() => setIsOpen(true)}
                      // data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                    >
                      📥 Create Terminal
                    </button>

                    <button
                      onClick={() => navigate('/map')}
                      className="btn w-100 text-start text-white"
                      style={{
                        background: "#1f1f1f",
                        borderRadius: "15px",
                        padding: "12px 15px",
                      }}
                    >
                      📥 View Terminal on Map
                    </button>

                  
                
                    


                  

                  </div>
                </div>

              </ul>
           

        </div>

        </div>


   </ContainerTitle>

  );
};

export default TransportTerminalList;
