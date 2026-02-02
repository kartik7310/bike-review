import React from 'react';

function ColorSelector({ colors, activeColor, onColorChange }) {
  return (
    <div className="color-selection">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`color-dot ${activeColor?.hex === color.hex ? 'active' : ''}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onColorChange(color)}
          title={color.name}
        />
      ))}
      <span className="color-name">{activeColor?.name}</span>
    </div>
  );
}

export default ColorSelector;
