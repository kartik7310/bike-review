import React from 'react';

function BikeCard({ bike, onClick, animationDelay }) {
  return (
    <div 
      className="bike-card animate-fade-in-up" 
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onClick}
    >
        <img src={bike.image} alt={bike.name} loading="lazy" />
    </div>
  );
}

export default BikeCard;
