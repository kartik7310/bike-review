import React from 'react';

function QuestionScreen({ userInput, onInputChange, onSubmit }) {
  return (
    <div className="question-screen animate-fade-in-up">
      <div className="question-content glass">
        <div className="brand-icon">🏍️</div>
        <h1>Which one is your favourite bike?</h1>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="e.g. Splendor, Classic 350..." 
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            className="glass"
            autoFocus
          />
          <button type="submit" className="cta-button primary-btn">Go to 3D View</button>
        </form>
        <p className="hint">Expertly matched 3D models at your fingertips.</p>
      </div>
    </div>
  );
}

export default QuestionScreen;
