import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import ColorSelector from '../ui/ColorSelector';
import ARConfirmModal from '../ui/ARConfirmModal';

function ViewerScreen({ selectedBike, activeColor, onColorChange, onBack, onARComplete }) {
  const modelViewerRef = useRef(null);
  const [showARModal, setShowARModal] = useState(false);

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
    // Show confirmation modal instead of directly activating AR
    setShowARModal(true);
  };

  const handleARConfirm = () => {
    setShowARModal(false);
    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
      
      // Simulate AR completion after a delay (in real app, listen to AR exit event)
      setTimeout(() => {
        if (onARComplete) {
          onARComplete();
        }
      }, 3000); // 3 seconds for demo, adjust as needed
    }
  };

  const handleARCancel = () => {
    setShowARModal(false);
  };

  return (
    <div className="viewer-screen animate-fade-in-up">
      <button className="back-button glass" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
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
          <button className="ar-step-btn cta-button" onClick={handleARClick}>
            Proceed to AR View
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <div className="loan-cta glass animate-fade-in-up">
          <p>Love it? Ask our team about easy loans today!</p>
          <button className="cta-button secondary">Inquire Now</button>
        </div>
      </div>

      {/* AR Confirmation Modal */}
      <ARConfirmModal 
        isOpen={showARModal}
        onConfirm={handleARConfirm}
        onCancel={handleARCancel}
        bikeName={selectedBike.name}
      />
    </div>
  );
}

export default ViewerScreen;
