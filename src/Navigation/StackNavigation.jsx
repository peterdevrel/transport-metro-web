import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Transport from "../pages/Transport";
import Service from "../pages/Service";
import Settings from "../pages/Settings";
import Support from "../pages/Support";
import VerifyDigitalID from '../pages/digitalid/VerifyDIgitalID';
import PayWithDigitalID from '../pages/digitalid/PayWithDigitalID';
import PhysicalCard from '../pages/digitalid/PhysicalCard';
import TransportRecipientAccount from '../pages/digitalid/TransportRecipientAccount';
import QrWalletTransaction from '../pages/digitalid/QrWalletTransaction';
import AddSaving from "../pages/payment/AddSaving";
import Savings from "../pages/payment/Saving";
import GenerateIDCardUploader from "../pages/digitalid/GenerateIDCardUploader";
import DigitalUserList from "../pages/digitalid/DigitalIDUserList";
import CreateUserHomePage from "../pages/CreateUserHomePage";
import Unauthorized from "../pages/Unauthorized";
import ErrorScreen from "../pages/ErrorScreen";
import BottomNav from "./BottomNav";
import ScanAndPay from "../pages/digitalid/ScanAndPay";
import TransferWithDigitalID from "../pages/digitalid/TransferWithDigitalID";
import Transfer from "../pages/payment/Transfer";
import TransportTerminalList from "../pages/terminal/TransportTerminalList";
import TerminalMap from "../pages/terminal/TerminalMap";
import CreateUser from "../pages/CreateUser";
import UserManager from "../pages/usermanagement/UserManager";
import ForgotPassword from "../pages/ForgotPassword";
import MyDigitalID from "../pages/digitalid/MyDigitalID";
import AllPhysicalCardList from "../pages/digitalid/AllPhysicalCardList";
import CardDetailPage from "../pages/digitalid/CardDetailPage";

// Context
import { useAuthContext } from "../Contexts/UserContextProvider";
import DisputeResolution from "../pages/digitalid/DisputeResolution";
import QrWalletTransactionAdmin from "../pages/digitalid/QrWalletTransactionAdmin";
import UtilityPayment from "../pages/utility/UtilityPayment";
import DataPayment from "../pages/data/DataPayment";
import AirtimePayment from "../pages/airtime/AirtimePayment";
import EducationPayment from "../pages/education/EducationPayment";
import JambPayment from "../pages/education/JambPayment";
import InternationalAirtime from "../pages/airtime/InternationalAirtime";

function AppContent() {
  const location = useLocation();
  const { userdata } = useAuthContext(); // check login state

  // Function to determine if BottomNav should be hidden
  const shouldHideNav = (pathname, userdata) => {
    if (!userdata?.user_id) return true; // hide if logged out

    const hideRoutes = [
      "/",
      "/forgot/password",
      "/unathorised",
      "/create/user/home",
      "/signup",
      // "/add/saving" // hide BottomNav after logout or for this page if desired
    ];

    return hideRoutes.includes(pathname) || pathname.startsWith("/card/");
  };

  const hideNav = shouldHideNav(location.pathname, userdata);

  return (
    <div className="bg-black min-vh-100 pb-5">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/unathorised" element={<Unauthorized />} />
        <Route path="/create/user/home" element={<CreateUserHomePage />} />
        <Route path="/signup" element={<CreateUser />} />

        {/* Protected routes */}
        <Route path="/protected/dashboard" element={userdata?.user_id ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/create/user" element={userdata?.user_id ? <CreateUser /> : <Navigate to="/" replace />} />
        <Route path="/transport" element={userdata?.user_id ? <Transport /> : <Navigate to="/" replace />} />
        <Route path="/service" element={userdata?.user_id ? <Service /> : <Navigate to="/" replace />} />
        <Route path="/settings" element={userdata?.user_id ? <Settings /> : <Navigate to="/" replace />} />
        <Route path="/saving" element={userdata?.user_id ? <Savings /> : <Navigate to="/" replace />} />
        <Route path="/add/saving" element={userdata?.user_id ? <AddSaving /> : <Navigate to="/" replace />} />
        <Route path="/transfer" element={userdata?.user_id ? <Transfer /> : <Navigate to="/" replace />} />
        <Route path="/support" element={userdata?.user_id ? <Support /> : <Navigate to="/" replace />} />

        {/* Digital ID */}
        <Route path="/verify/digital/id" element={userdata?.user_id ? <VerifyDigitalID /> : <Navigate to="/" replace />} />
        <Route path="/digital/id" element={userdata?.user_id ? <MyDigitalID /> : <Navigate to="/" replace />} />
        <Route path="/pay/with/digital/id" element={userdata?.user_id ? <PayWithDigitalID /> : <Navigate to="/" replace />} />
        <Route path="/transer/with/digital/id" element={userdata?.user_id ? <TransferWithDigitalID /> : <Navigate to="/" replace />} />
        <Route path="/scan/card/payment" element={userdata?.user_id ? <ScanAndPay /> : <Navigate to="/" replace />} />
        <Route path="/idcard/upload" element={userdata?.user_id ? <GenerateIDCardUploader /> : <Navigate to="/" replace />} />
        <Route path="/digital/user/list" element={userdata?.user_id ? <DigitalUserList /> : <Navigate to="/" replace />} />
        <Route path="/physical/card/application" element={userdata?.user_id ? <PhysicalCard /> : <Navigate to="/" replace />} />
        <Route path="/qr/payment/transaction" element={userdata?.user_id ? <QrWalletTransaction /> : <Navigate to="/" replace />} />
        <Route path="/qr/payment/admin/transaction" element={userdata?.user_id ? <QrWalletTransactionAdmin /> : <Navigate to="/" replace />} />
        <Route path="/all/card/list" element={userdata?.user_id ? <AllPhysicalCardList /> : <Navigate to="/" replace />} />
        <Route path="/dispute/resolution" element={userdata?.user_id ? <DisputeResolution /> : <Navigate to="/" replace />} />
        <Route path="/card/:user_id" element={<CardDetailPage />} />

        {/* Transport Recipient */}
        <Route path="/transport/recipient" element={userdata?.user_id ? <TransportRecipientAccount /> : <Navigate to="/" replace />} />
        <Route path="/terminal" element={userdata?.user_id ? <TransportTerminalList /> : <Navigate to="/" replace />} />
        <Route path="/map" element={userdata?.user_id ? <TerminalMap /> : <Navigate to="/" replace />} />

        {/* User Management */}
        <Route path="/user/manager" element={userdata?.user_id ? <UserManager /> : <Navigate to="/" replace />} />

        {/*Utility Bill  */}
        <Route path="/utility/bill" element={userdata?.user_id ? <UtilityPayment /> : <Navigate to="/" replace />} />

        {/*Data Bill  */}
        <Route path="/data/bill" element={userdata?.user_id ? <DataPayment /> : <Navigate to="/" replace />} />

        {/*Airtime Bill  */}
        <Route path="/airtime/bill" element={userdata?.user_id ? <AirtimePayment /> : <Navigate to="/" replace />} />
        <Route path="/international/airtime/bill" element={userdata?.user_id ? <InternationalAirtime /> : <Navigate to="/" replace />} />

        {/*Education Bill  */}
        <Route path="/education/payment" element={userdata?.user_id ? <EducationPayment /> : <Navigate to="/" replace />} />
        <Route path="/jamb/payment" element={userdata?.user_id ? <JambPayment /> : <Navigate to="/" replace />} />

        {/* Fallback */}
        <Route path="*" element={<ErrorScreen />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </div>
  );
}

export default function StackNavigation() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
