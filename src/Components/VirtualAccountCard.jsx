import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

export default function VirtualAccountCard({ account_number, account_name, bank, balance, bgColor = '#343a40', textColor = '#ffffff' }) {
  const [copied, setCopied] = useState(false);

  const formatAccountName = (name) => {
    if (!name) return "";
    return name.includes("/") ? name.split("/")[1] : name;
  };

  return (
    <div
      className="card p-3 rounded-4 shadow"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Account Number + Clipboard */}
      <div className="d-flex align-items-center">
        <h5 className="opacity-75 mb-0">
          Acct No. {formatAccountName(account_number)}
        </h5>

        <CopyToClipboard
          text={account_number}
          onCopy={() => {
            setCopied(true);
            alert('Account copied');
            // toast.success('Account copied');
          }}
        >
          <i
            type="button"
            className="fa fa-clipboard ms-2"
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
          ></i>
        </CopyToClipboard>
      </div>

      {/* Account Name and Bank */}
      <h6 className="fw-bold mt-2">{account_name}</h6>
      <h6 className="fw-bold">{bank}</h6>
    </div>
  );
}
