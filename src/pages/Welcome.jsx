import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  // Redirect to bike page if QR code was scanned
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('source') === 'qr' || urlParams.get('qr') === 'true') {
      navigate('/bike?source=qr');
    }
  }, [navigate]);

  return (
    <div className="welcome-screen">
      <div className="welcome-content animate-fade-in-up">
        
        {/* Motorcycle Icon */}
        <div className="welcome-icon">🏍️</div>
        
        {/* Main Heading */}
        <h1 className="welcome-title">
          Welcome to the Future of
          <span className="gradient-text"> Bike Shopping</span>
        </h1>

        {/* Subtitle */}
        <p className="welcome-subtitle">
          Experience motorcycles like never before with immersive 3D models, 
          augmented reality, and interactive showroom tours.
        </p>

        {/* Feature Pills */}
        <div className="feature-pills">
          <div className="pill glass">
            <span>🎨</span> Color Customization
          </div>
          <div className="pill glass">
            <span>📱</span> AR Experience
          </div>
          <div className="pill glass">
            <span>🔄</span> 360° View
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/bike")}
          className="welcome-cta cta-button"
        >
          Enter Showroom
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Bottom Hint */}
        <p className="welcome-hint">
          Scan QR codes in-store for instant 3D access
        </p>

      </div>

      {/* Animated Background Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
    </div>
  );
};

export default Welcome;
