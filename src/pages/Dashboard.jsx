import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/UserContextProvider';
import { useServiceContext } from '../Contexts/ServiceContextProvider';
import { useDedicatedVirtualContext } from '../Contexts/DedicatedVirtualAccountContextProvider';
import { useCustomer } from '../Contexts/CustomerContextProvider';
import Colors from '../Utils/Colors';
import { useTranslation } from 'react-i18next';
import { ContainerTitle } from '../Components/ContainerTitle';
import { ClipLoader } from 'react-spinners';
import WalletCard from '../Components/WalletCard';

export default function Dashboard() {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // ========= AUTH CONTEXT =========
  const {
    userdata,
    profiledata,
    setIsLoggedIn,
    getProfileUser,
    maskEmail,
    formatMoney,
    fetchUserCounts,
    userCounts
  } = useAuthContext();

  // ========= CUSTOMER CONTEXT =========
  const {
    userwalletamount = [],
    getUserWallet,
    getAllQrWalletTransaction,
    qrWalletTransactionData = [],
    getAllQrUserWalletTransaction,
    QrUserWalletTransactionData,
    
  } = useCustomer() || {};

  // ========= SERVICE CONTEXT =========
  const { formatTimeStamp, currencyFormat } = useServiceContext();

  // ========= DEDICATED VIRTUAL ACCOUNT CONTEXT =========
  const {
    getAccountBalance,
    balance,
    getCustomerDedicatedAccount,
    virtualaccountdata = [],
  } = useDedicatedVirtualContext();

  // ========= LOCAL STATE =========
  const [isLoading, setIsLoading] = useState(true);

  // =====================================================
  // ========== FIRST USEEFFECT — FETCH ALL DATA ==========
  // =====================================================





  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const access = localStorage.getItem('access');

    if (!userId || !access) {
      navigate('/unauthorized');
      return;
    }

    setIsLoggedIn(true);

    const fetchAll = async () => {

      try {
        await Promise.all([
          getProfileUser(userId),
          getCustomerDedicatedAccount()
        ]);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } 
    };

    fetchAll();
  }, []);


  useEffect(() => {

    setIsLoggedIn(true);

    const fetchAll = async () => {

      try {
        await Promise.all([
          getUserWallet(),
          fetchUserCounts(),
          getAllQrWalletTransaction(),
          getAllQrUserWalletTransaction(),
        ]);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);


  // =====================================================
  // ========== SECOND USEEFFECT — DISABLE RIGHT CLICK ====
  // =====================================================
  useEffect(() => {
    const handleContextmenu = e => e.preventDefault();
    document.addEventListener('contextmenu', handleContextmenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
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

  // extract virtual account data safely
  const virtualdata = virtualaccountdata?.[0];

  return (
    <ContainerTitle title="Dashboard">

      {/* ==== WALLET CARDS ==== */}
      <div className="row g-3 mb-4">

       
        <div className="col-3">
          <WalletCard
            title="Main Wallet"
            balance={currencyFormat(userwalletamount?.[0]?.balance || 0)}
          />
        </div>

        <div className="col-3">
          <WalletCard
            bgColor={Colors.RED}
            title="Withdraw"
            balance={currencyFormat(userwalletamount?.[0]?.withdraw || 0)}
          />
        </div>

        <div className="col-3">
          <WalletCard
            title="Savings"
            balance="Coming soon"
            bgColor="#1abc9c"
          />
        </div>

        <div className="col-3">
          <WalletCard
            title="Investment"
            balance="Coming Soon"
            bgColor="#f39c12"
            textColor="#000"
          />
        </div>

        <p className="mt-2 text-white">
          Welcome, {profiledata?.first_name}
        </p>
      </div>

      {/* ==== MAIN LAYOUT ==== */}
      <div className="row g-3">

        {/* LEFT SECTION */}
        <div className="col-lg-8 col-md-8 col-sm-12">

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

              <button className="btn w-100 text-start text-white"
                onClick={() => navigate('/add/saving')}
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📥 Add Money
              </button>

              <button
                onClick={() => navigate('/transfer')}
                className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                💸 Transfer
              </button>

              <button
                onClick={() => navigate('/qr/payment/transaction')}
                className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                💸 Transactions
              </button>

              <button className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                🏦 Withdraw
              </button>

              <button className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 Investments
              </button>

              <button 
                onClick={() => navigate('/utility/bill')}
                className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 Utility Bill
              </button>

              <button 
                onClick={() => navigate('/data/bill')}
                className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 Data 
              </button>

              <button 
                onClick={() => navigate('/airtime/bill')}
                className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 Airtime 
              </button>

              <button 
                className="btn w-100 text-start text-white"
                onClick={() => navigate('/education/payment')}
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 Education 
              </button>

              <button 
                className="btn w-100 text-start text-white"
                onClick={() => navigate('/jamb/payment')}
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 Jamb  
              </button>

              <button 
                className="btn w-100 text-start text-white"
                onClick={() => navigate('/international/airtime/bill')}
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 International Airtime 
              </button>

              <button className="btn w-100 text-start text-white"
                style={{ background: "#1f1f1f", borderRadius: "15px", padding: "12px 15px" }}>
                📊 TV Subscription 
              </button>

            </div>
          </div>

          <div className="p-4" style={{ background: "#111", borderRadius: "15px" }}>
            <p>Place advert here…</p>
          </div>

        </div>

        {/* RIGHT — TRANSACTIONS */}
        <div className="col-lg-4 col-md-4 col-sm-12">
        
        <div
            style={{
              height: "400px",
              overflowY: "auto",
              background: "#111",
              padding: "15px",
              borderRadius: "10px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="hide-scrollbar"
          >
            <h5>Recent Transactions</h5>

            <ul className="list-group">
              {QrUserWalletTransactionData?.length > 0 ? (
                QrUserWalletTransactionData.map((transaction, index) => (
                  <li
                    key={index}
                    className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center"
                    style={{ borderRadius: "6px" }}
                  >
                    <div>
                      {currencyFormat(transaction?.amount)}- {transaction?.description}
                      <p style={{ fontSize: "0.7rem", margin: 0 }}>
                        {formatTimeStamp(transaction?.timestamp)}
                      </p>
                    </div>
                    <span
                      style={{
                        backgroundColor: transaction?.type === "Credited" ? "#28a745" : "#dc3545",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "0.75rem"
                      }}
                    >
                      {transaction?.type}
                    </span>
                  </li>

                ))
              ) : (
                <li className="list-group-item bg-dark text-white border-secondary text-center">
                  No transaction
                </li>
              )}
            </ul>
          </div>

        </div>

      </div>

    </ContainerTitle>
  );
}
