import { useState } from "react";

export default function QuickMenu({ onAddMoney, onTransfer, onWithdraw, onInvest }) {
  const [active, setActive] = useState(null);

  const menuStyle = {
    background: "#1a1a1a",
    borderRadius: "25px",
    padding: "12px",
    width: "180px",             // Smaller width like mobile
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  };

  const btnBase = {
    background: "#242424",
    borderRadius: "50px",
    padding: "10px 12px",
    fontSize: "13px",
    border: "1px solid transparent",
    color: "#fff",
    width: "100%",
    textAlign: "left",
    transition: "0.2s",
  };

  const getBtnStyle = (id) => ({
    ...btnBase,
    border: active === id ? "1px solid #fff" : "1px solid transparent",
  });

  return (
    <div style={menuStyle}>

      <div className="d-flex flex-column gap-2">

        <button
          style={getBtnStyle("add")}
          onClick={() => {
            setActive("add");
            onAddMoney && onAddMoney();
          }}
        >
          📥 Add Money
        </button>

        <button
          style={getBtnStyle("transfer")}
          onClick={() => {
            setActive("transfer");
            onTransfer && onTransfer();
          }}
        >
          💸 Transfer
        </button>

        <button
          style={getBtnStyle("withdraw")}
          onClick={() => {
            setActive("withdraw");
            onWithdraw && onWithdraw();
          }}
        >
          🏦 Withdraw
        </button>

        <button
          style={getBtnStyle("invest")}
          onClick={() => {
            setActive("invest");
            onInvest && onInvest();
          }}
        >
          📊 Invest
        </button>

      </div>
    </div>
  );
}
