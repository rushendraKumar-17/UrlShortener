import React, { useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
const NewQr = () => {
  const [url, setUrl] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
const token = localStorage.getItem("token");
  const handleGenerateQRCode = async () => {
    if (url) {
      try {
        axios.post("http://localhost:8000/qr",{url},{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res);
            setQrCodeImage(res.data);

        }).catch(e =>{
            console.log(e);
        })
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Generate QR Code</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '300px', padding: '10px' }}
      />
      <button onClick={handleGenerateQRCode} style={{ marginLeft: '10px', padding: '10px' }}>
        Generate QR Code
      </button>
      {qrCodeImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>QR Code:</h3>
          <img src={qrCodeImage} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default NewQr;
