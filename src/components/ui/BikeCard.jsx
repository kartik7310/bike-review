import React from 'react';

function BikeCard({ bike, onClick, animationDelay }) {
  return (
    <div 
      className="bike-card glass animate-fade-in-up" 
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onClick}
    >
      <div className="bike-image-container rounded-2xl">
        <img src={bike.image} alt={bike.name} loading="lazy" />
      </div>
      <div className="card-info">
        <h3>{bike.name}</h3>
        <p>{bike.tagline}</p>
      </div>
     {/* <button className="view-button">Inspect 3D</button> */}
    </div>
  );
}

export default BikeCard;
