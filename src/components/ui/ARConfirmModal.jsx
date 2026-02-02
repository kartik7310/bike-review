import React from 'react';

function ARConfirmModal({ isOpen, onConfirm, onCancel, bikeName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">📱</div>
        <h2>View in Augmented Reality?</h2>
        <p>Experience the <strong>{bikeName}</strong> in your space using AR technology.</p>
        
        <div className="modal-buttons">
          <button className="modal-btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn confirm-btn cta-button" onClick={onConfirm}>
            Yes, Show AR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ARConfirmModal;
