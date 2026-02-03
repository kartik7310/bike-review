import React from 'react';
import BikeCard from '../ui/BikeCard';

function CarouselScreen({ bikes, userInput, onSelectBike, onBack }) {
  return (
    <div className="carousel-screen animate-fade-in-up">
      <header className="header">
        <button className="minimal-back" onClick={onBack}>← Change Preference</button>
        <h1>Bikes in Showroom</h1>
        <p>Explore bikes</p>
      </header>

      <div className="carousel-container">
        {bikes.map((bike, index) => (
          <BikeCard
            key={bike.id}
            bike={bike}
            onClick={() => onSelectBike(bike)}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselScreen;
