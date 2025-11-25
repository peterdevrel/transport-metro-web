import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ContainerTitle } from "../../Components/ContainerTitle";
import WalletCard from "../../Components/WalletCard";
import { useAuthContext } from "../../Contexts/UserContextProvider";
import { ClipLoader } from "react-spinners";
import Colors from "../../Utils/Colors";
import { useNavigate } from "react-router-dom";



// Fix default icon for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TerminalMap = () => {
  const [terminals, setTerminals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 const navigate = useNavigate()
  const {
          profiledata,
          setIsLoggedIn,
          getProfileUser,
        } = useAuthContext();

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}terminal/terminals/`,{
            credentials:'include'
        });
        const data = await res.json();
        setTerminals(data);
      } catch (err) {
        console.error(err);
      }finally{
        setIsLoading(false)
      }
    };
    getProfileUser()
    fetchTerminals();
  }, []);



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
    <ContainerTitle title={'Terminal Map'}>

                <div className="row g-3 mb-4">
                    <div className="col-3">
                        <WalletCard title="Terminal on Map"/>
                    </div>
                    
                
                    <p>Welcome, {profiledata?.first_name} </p>
                </div>
                <div className="row g-3">
        
                <div className="col-lg-9 col-md-8 col-sm-12"> 

                    <MapContainer center={[6.5244, 3.3792]} zoom={6} style={{ height: "600px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {terminals.map((t) => (
                        <Marker key={t.id} position={[parseFloat(t.latitude), parseFloat(t.longitude)]}>
                        <Popup>
                            <strong>{t.name}</strong>
                            <br />
                            Type: {t.terminal_type}
                            <br />
                            City: {t.city}, State: {t.state}
                        </Popup>
                        </Marker>
                    ))}
                    </MapContainer>
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
                            onClick={() => navigate('/map')}
                            className="btn w-100 text-start text-white"
                            style={{
                                background: "#1f1f1f",
                                borderRadius: "15px",
                                padding: "12px 15px",
                            }}
                            >
                            📥 Terminal Map
                            </button>

                        
                            


                        

                        </div>
                        </div>

                    </ul>
                

                </div>

        </div>


    </ContainerTitle>
  );
};

export default TerminalMap;
