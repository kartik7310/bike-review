import React from 'react';

function GateScreen() {
  const qrUrl = encodeURIComponent(`${window.location.origin}/bike?source=qr`);
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrUrl}`;
  
  return (
    <div className="gate-screen animate-fade-in-up">
      <div className="gate-content glass">
        <div className="showroom-tag">Digital Showroom Entry</div>
        <h1>Experience Bikes in 3D & AR</h1>
        <div className="qr-box glass">
          <img src={qrImage} alt="Scan QR to Start" />
        </div>
        <p>Scan this QR code with your smartphone to start the interactive tour.</p>
        <div className="mobile-hint">
          <span>Scan with Phone Camera</span>
        </div>
      </div>
    </div>
  );
}

export default GateScreen;
