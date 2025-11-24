import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MyDigitalID.css'; // Ensure this file exists
import QRCode from 'react-qr-code';
import { useAuthContext } from '../../Contexts/UserContextProvider';
import Body from '../../Components/Body';
import HeaderTitle from '../../Components/HeaderTitle';






const GenerateIDCardUploader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const {
    profiledata,
    setIsLoggedIn,
    getProfileUser,
  } = useAuthContext();

const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);

 


  const handleUpload = async () => {
  if (!file) return alert('Upload Excel file first');

  const formData = new FormData();
  formData.append('file', file);
  setDownloading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}d/api/generate-id-cards/`, {
      method: 'POST',
      credentials:'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();

    // Force download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'id_cards.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download error:', err);
    alert('Something went wrong while generating the PDF.');
  } finally {
    setDownloading(false);
  }
};


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
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);





  return (
    <Body>
      
        <HeaderTitle  page={'e-Card Application'} title={'Card Application'}/>
      <div style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <div>
          <h2>Upload Excel to Generate ID Cards</h2>
          <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload} disabled={downloading}>
            {downloading ? 'Generating...' : 'Upload & Download ZIP'}
          </button>
        </div>

      </div>


    
    </Body>
  );
};

export default GenerateIDCardUploader;
