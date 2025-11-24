export default function WalletCard({ title, balance, bgColor = '#343a40', textColor = '#ffffff' }) {
  return (
    <div
      className="card p-3 rounded-4 shadow"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <h5 className="opacity-75">{title}</h5>
      <h2 className="fw-bold mt-2">{balance}</h2>
    </div>
  );
}
