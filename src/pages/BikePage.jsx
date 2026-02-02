import React, { useState } from 'react';
import { bikes } from '../data/bikes';
import CarouselScreen from '../components/screens/CarouselScreen';
import ViewerScreen from '../components/screens/ViewerScreen';
import CongratulationsScreen from '../components/screens/CongratulationsScreen';
import '../App.css';

function BikePage() {
  const [screen, setScreen] = useState('carousel'); // 'carousel' | 'viewer' | 'congratulations'
  const [userInput, setUserInput] = useState(''); // Keep for carousel filter if needed
  const [selectedBike, setSelectedBike] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setActiveColor(bike.colors[0]);
    setScreen('viewer');
  };

  const handleBack = () => {
    if (screen === 'viewer') {
      setScreen('carousel');
    } else if (screen === 'congratulations') {
      setScreen('carousel');
    }
  };

  const handleARComplete = () => {
    setScreen('congratulations');
  };

  const handleContinueExploring = () => {
    setScreen('carousel');
  };

  if (screen === 'viewer' && selectedBike) {
    return (
      <ViewerScreen 
        selectedBike={selectedBike}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        onBack={handleBack}
        onARComplete={handleARComplete}
      />
    );
  }

  if (screen === 'congratulations' && selectedBike) {
    return (
      <CongratulationsScreen 
        bikeName={selectedBike.name}
        onContinue={handleContinueExploring}
      />
    );
  }

  // Default: Carousel screen (Step 1)
  return (
    <CarouselScreen 
      bikes={bikes}
      userInput={userInput}
      onSelectBike={handleSelectBike}
      onBack={() => window.history.back()}
    />
  );
}

export default BikePage;

