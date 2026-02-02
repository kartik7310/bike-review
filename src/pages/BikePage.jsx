import React, { useState, useEffect } from 'react';
import { bikes } from '../data/bikes';
import GateScreen from '../components/screens/GateScreen';
import QuestionScreen from '../components/screens/QuestionScreen';
import CarouselScreen from '../components/screens/CarouselScreen';
import ViewerScreen from '../components/screens/ViewerScreen';
import '../App.css';

function BikePage() {
  const [screen, setScreen] = useState('gate'); // 'gate' | 'question' | 'carousel' | 'viewer'
  const [userInput, setUserInput] = useState('');
  const [selectedBike, setSelectedBike] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    // Determine initial screen based on URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('source') === 'qr' || urlParams.get('qr') === 'true') {
      setScreen('question');
    } else {
      setScreen('gate');
    }
  }, []);

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

  // Render appropriate screen based on state
  if (screen === 'gate') {
    return <GateScreen />;
  }

  if (screen === 'question') {
    return (
      <QuestionScreen 
        userInput={userInput}
        onInputChange={setUserInput}
        onSubmit={handleQuestionSubmit}
      />
    );
  }

  if (screen === 'viewer' && selectedBike) {
    return (
      <ViewerScreen 
        selectedBike={selectedBike}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        onBack={handleBack}
      />
    );
  }

  // Default: Carousel screen
  return (
    <CarouselScreen 
      bikes={bikes}
      userInput={userInput}
      onSelectBike={handleSelectBike}
      onBack={handleBack}
    />
  );
}

export default BikePage;
