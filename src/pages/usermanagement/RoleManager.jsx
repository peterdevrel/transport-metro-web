import React, { useEffect, useState } from 'react';

// Utility to convert camelCase to readable format
const formatLabel = (str) =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

export default function RoleManager({ userId, email, onBack }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingField, setUpdatingField] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
          cookieValue = decodeURIComponent(value);
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}user/api/roles/by_user/${userId}/`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load role");
        return res.json();
      })
      .then((data) => {
        console.log('data', data)
        setRole(data);
        setSuccessMessage("");
      })
      .catch((err) => {
        console.error(err);
        setRole({ error: "Unable to load role" });
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const toggleField = (field) => {
    setUpdatingField(field);
    fetch(`${import.meta.env.VITE_BASE_URL}user/api/roles/${role.id}/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ [field]: !role[field] }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updated) => {
        setRole(updated);
        setSuccessMessage(`✅ ${formatLabel(field)} updated`);
        setTimeout(() => setSuccessMessage(""), 2000);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update role");
      })
      .finally(() => setUpdatingField(null));
  };

  if (!userId) return <p>No user selected</p>;
  if (loading) return <p>🔄 Loading role data...</p>;
  if (role?.error) return <p>Error: {role.error}</p>;

const fields = role
  ? Object.entries(role).filter(
      ([key, value]) => key.endsWith("Manager") && typeof value === "boolean"
    )
  : [];
  

  return (
    <div style={styles.slideIn}>
      {/* <h2>Manage Roles for User #{userId}</h2> */}

      <p style={{ fontSize: '16px', fontStyle: 'italic', marginBottom: '10px' }}>
        Email: {email}
      </p>
      <button onClick={onBack} style={styles.backButton}>
        ⬅ Back to User List
      </button>

      {successMessage && (
        <div style={styles.successMessage}>{successMessage}</div>
      )}

      <div style={styles.roleList}>
        {fields.map(([field, value]) => (
          <div key={field} style={styles.toggleRow}>
            <label style={styles.label}>{formatLabel(field)}</label>
            <input
              type="checkbox"
              checked={value}
              disabled={updatingField === field}
              onChange={() => toggleField(field)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
slideIn: {
  animation: "slideIn 0.3s ease-in-out",
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "100%",
  marginTop: "20px",
  backgroundColor: "#f9f9f9",
  overflow: "visible",
  height: "auto",
},
  backButton: {
    marginBottom: "10px",
    backgroundColor: "#eee",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    alignItems: "center",
    borderBottom: "1px dashed #ddd",
  },
  label: {
    marginRight: "10px",
    fontWeight: "500",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  roleList: {
  maxHeight: "70vh",
  overflowY: "auto",
  paddingRight: "10px",
  },
};
