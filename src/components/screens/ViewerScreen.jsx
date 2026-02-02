import React, { useEffect, useRef } from 'react';
import '@google/model-viewer';
import ColorSelector from '../ui/ColorSelector';

function ViewerScreen({ selectedBike, activeColor, onColorChange, onBack }) {
  const modelViewerRef = useRef(null);

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

  const handleARClick = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
    }
  };

  return (
    <div className="viewer-screen animate-fade-in-up">
      <button className="back-button glass" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <button className="ar-button glass" onClick={handleARClick}>
        View in AR
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
      </model-viewer>

      <div className="bike-info-overlay">
        <div className="bike-details glass animate-fade-in-up">
          <div className="badge">3D Model Ready</div>
          <h2>{selectedBike.name}</h2>
          <p className="tagline">{selectedBike.tagline}</p>
          <ColorSelector 
            colors={selectedBike.colors}
            activeColor={activeColor}
            onColorChange={onColorChange}
          />
        </div>
        <div className="loan-cta glass animate-fade-in-up">
          <p>Love it? Ask our team about easy loans today!</p>
          <button className="cta-button">Inquire Now</button>
        </div>
      </div>
    </div>
  );
}

export default ViewerScreen;
