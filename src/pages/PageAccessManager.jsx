import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';








const PageAccessManager = ({ pageViewId }) => {

  const { t, i18n } = useTranslation();
  const [access, setAccess] = useState({});
  const [loadingField, setLoadingField] = useState(null);
  const [errorField, setErrorField] = useState(null);
  const [successField, setSuccessField] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}user/api/pageviews/${pageViewId}/`,{
              credentials:'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setAccess)
      .catch(err => console.error("Failed to load access flags", err));
  }, [pageViewId]);

  const handleToggle = async (field) => {
    const updatedValue = !access[field];
    setLoadingField(field);
    setErrorField(null);
    setSuccessField(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}user/api/pageviews/${pageViewId}/`, {
        method: 'PATCH',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      if (!response.ok) throw new Error('Update failed');

      setAccess(prev => ({ ...prev, [field]: updatedValue }));
      setSuccessField(field);
      setTimeout(() => setSuccessField(null), 1000);
    } catch (err) {
      console.error(err);
      setErrorField(field);
    }

    setLoadingField(null);
  };

  return (
    <div className="card shadow-sm my-4">
      <div className="card-header bg-primary text-white">
       <p className="fs-30">{t('pagemanager')}</p>
      </div>
      <div className="card-body">
        <div className="list-group">
          {Object.entries(access).map(([key, value]) => (
            <div
              key={key}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                successField === key ? 'bg-success bg-opacity-10' :
                errorField === key ? 'bg-danger bg-opacity-10' : ''
              }`}
            >
              <span className="text-capitalize">{key.replace(/_/g, ' ')}</span>
              <div className="form-check form-switch mb-0" style={{ minWidth: "80px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={value}
                  onChange={() => handleToggle(key)}
                  disabled={loadingField === key}
                />
                {loadingField === key && (
                  <div className="spinner-border spinner-border-sm ms-2 text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageAccessManager;
