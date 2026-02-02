import React from "react";

function CongratulationsScreen({ bikeName, onContinue }) {
  return (
    <div className="congratulations-screen">
      {/* Confetti */}
      <div className="confetti-container">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: [
                "#ff007f",
                "#00d4ff",
                "#9d00ff",
                "#ffd700",
                "#ff6b6b",
                "#00ff00",
              ][i % 6],
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="congrats-content">
        <div className="party-emoji">🎉</div>

        <h1 className="congrats-title">Congratulations!</h1>

        <p className="congrats-message">
          You’ve successfully experienced{" "}
          <strong>{bikeName}</strong> in augmented reality.
        </p>

        <div className="congrats-features">
          <p>✓ 3D Model Explored</p>
          <p>✓ Colors Customized</p>
          <p>✓ AR Experience Complete</p>
        </div>

        <button className="congrats-btn" onClick={onContinue}>
          Continue Exploring →
        </button>

        <p className="congrats-hint">
          Ready to explore more bikes?
        </p>
      </div>
    </div>
  );
}

export default CongratulationsScreen;
