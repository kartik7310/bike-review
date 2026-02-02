import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import ColorSelector from '../ui/ColorSelector';
import ARConfirmModal from '../ui/ARConfirmModal';

function  ViewerScreen({ selectedBike, activeColor, onColorChange, onBack, onARComplete }) {
  const modelViewerRef = useRef(null);
  const audioRef = useRef(null);
  const [showARModal, setShowARModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);


  useEffect(() => {
    if (activeColor && modelViewerRef.current) {
      const modelViewer = modelViewerRef.current;
      const applyColor = () => {
        if (!modelViewer.model) return;
        const materials = modelViewer.model.materials;
        let applied = false;
        
        materials.forEach(material => {
          const name = material.name.toLowerCase();
         
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

  // Listen for AR status changes
  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleARStatus = (event) => {
      // 'not-presenting' means the user has exited AR
      if (event.detail.status === 'not-presenting' && onARComplete) {
       
        onARComplete();
      }
    };

    modelViewer.addEventListener('ar-status', handleARStatus);
    return () => {
      modelViewer.removeEventListener('ar-status', handleARStatus);
    };
  }, [onARComplete]);

  // Audio start logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    
    const playAudio = () => {
      audio.play().then(() => {
        // Successfully playing
        window.removeEventListener('click', playAudio);
        window.removeEventListener('touchstart', playAudio);
      }).catch(err => {
        console.log("Autoplay blocked, waiting for interaction");
      });
    };

    // Try immediately
    playAudio();

    // Also listen for first interaction
    window.addEventListener('click', playAudio);
    window.addEventListener('touchstart', playAudio);

    return () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(console.error);
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleARClick = () => {
    // Show confirmation modal instead of directly activating AR
    setShowARModal(true);
  };

  const handleARConfirm = () => {
    setShowARModal(false);
    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
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

      <button className={`music-toggle glass ${isMuted ? 'muted' : ''}`} onClick={toggleMute}>
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>

      <audio 
        ref={audioRef}
        src="/construction-architecture-development-music-340810.mp3"
        loop
      />



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
          <h2>{selectedBike.name}</h2>
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
