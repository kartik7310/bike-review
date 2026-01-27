import React, { useState, useEffect, useRef } from 'react';
import { bikes } from './data/bikes';
import '@google/model-viewer';
import './App.css';

function App() {
  const [screen, setScreen] = useState('gate'); // 'gate' | 'question' | 'carousel' | 'viewer'
  const [userInput, setUserInput] = useState('');
  const [selectedBike, setSelectedBike] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // Determine initial screen based on URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('source') === 'qr' || urlParams.get('qr') === 'true') {
      setScreen('question');
    } else {
      setScreen('gate');
    }
  }, []);

  // Handle color switching via material manipulation
  useEffect(() => {
    if (activeColor && modelViewerRef.current) {
      const modelViewer = modelViewerRef.current;
      const applyColor = () => {
        if (!modelViewer.model) return;
        const materials = modelViewer.model.materials;
        let applied = false;
        
        materials.forEach(material => {
          const name = material.name.toLowerCase();
          // Target common motorcycle paint/body material names
          if (name.includes('body') || name.includes('paint') || name.includes('frame') || name.includes('tank')) {
            material.pbrMetallicRoughness.setBaseColorFactor(activeColor.hex);
            applied = true;
          }
        });

        // Fallback: apply to the first material if no specific match
        if (!applied && materials.length > 0) {
          materials[0].pbrMetallicRoughness.setBaseColorFactor(activeColor.hex);
        }
      };

      if (modelViewer.loaded) applyColor();
      else modelViewer.addEventListener('load', applyColor);
    }
  }, [activeColor]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Matching logic: Find first bike that matches input
    const match = bikes.find(b => 
      b.name.toLowerCase().includes(userInput.toLowerCase())
    );
    
    if (match) {
      setSelectedBike(match);
      setActiveColor(match.colors[0]);
      setScreen('viewer');
    } else {
      // If no exact match, show carousel for exploration
      setScreen('carousel');
    }
  };

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setActiveColor(bike.colors[0]);
    setScreen('viewer');
  };

  const handleBack = () => {
    if (screen === 'viewer') setScreen('carousel');
    else if (screen === 'carousel' || screen === 'question') {
      // Reset search
      setUserInput('');
      setScreen('question');
    }
  };

  // Screen 1: Gate (Display QR for visitors to scan)
  if (screen === 'gate') {
    const qrUrl = encodeURIComponent(`${window.location.origin}/?source=qr`);
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

  // Screen 2: Question
  if (screen === 'question') {
    return (
      <div className="question-screen animate-fade-in-up">
        <div className="question-content glass">
          <div className="brand-icon">🏍️</div>
          <h1>Which one is your favourite bike?</h1>
          <form onSubmit={handleQuestionSubmit}>
            <input 
              type="text" 
              placeholder="e.g. Splendor, Classic 350..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="glass"
              autoFocus
            />
            <button type="submit" className="cta-button primary-btn">Go to 3D View</button>
          </form>
          <p className="hint">Expertly matched 3D models at your fingertips.</p>
        </div>
      </div>
    );
  }

  // Screen 4: 3D / AR Viewer
  if (screen === 'viewer' && selectedBike) {
    return (
      <div className="viewer-screen animate-fade-in-up">
        <button className="back-button glass" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>

        <model-viewer
          ref={modelViewerRef}
          src={selectedBike.modelUrl}
          poster={selectedBike.image}
          alt={`3D model of ${selectedBike.name}`}
          shadow-intensity="1"
          camera-controls
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="45deg"
          camera-orbit="45deg 75deg 105%"
          min-camera-orbit="auto auto 5%"
          max-camera-orbit="auto auto auto"
          touch-action="pan-y"
          ar
          ar-modes="webxr scene-viewer quick-look"
          interaction-prompt="none"
          style={{ width: '100%', height: '100%', '--poster-color': 'transparent' }}
        >
          <button slot="ar-button" className="ar-button glass">View in AR</button>
        </model-viewer>

        <div className="bike-info-overlay">
          <div className="bike-details glass animate-fade-in-up">
            <div className="badge">3D Model Ready</div>
            <h2>{selectedBike.name}</h2>
            <p className="tagline">{selectedBike.tagline}</p>
            <div className="color-selection">
              {selectedBike.colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-dot ${activeColor?.hex === color.hex ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setActiveColor(color)}
                  title={color.name}
                />
              ))}
              <span className="color-name">{activeColor?.name}</span>
            </div>
          </div>
          <div className="loan-cta glass animate-fade-in-up">
            <p>Love it? Ask our team about easy loans today!</p>
            <button className="cta-button">Inquire Now</button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 3: Carousel (Fallback / Menu)
  return (
    <div className="carousel-screen animate-fade-in-up">
      <header className="header">
        <button className="minimal-back" onClick={handleBack}>← Change Preference</button>
        <h1>Popular in Showroom</h1>
        <p>Explore bikes related to "{userInput}"</p>
      </header>

      <div className="carousel-container">
        {bikes.map((bike, index) => (
          <div 
            key={bike.id} 
            className="bike-card glass animate-fade-in-up" 
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleSelectBike(bike)}
          >
            <div className="bike-image-container">
              <img src={bike.image} alt={bike.name} loading="lazy" />
            </div>
            <div className="card-info">
              <h3>{bike.name}</h3>
              <p>{bike.tagline}</p>
            </div>
            <button className="view-button">Inspect 3D</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
