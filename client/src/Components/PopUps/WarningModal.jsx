import React from 'react'

export default function WarningModal({message, action, dispatch, onClose}) {
  return (
    <div className="warning-modal-overlay">
        <div className="warning-modal">
            <p>{message}</p>
            <div className="confirmation-container">
                <button onClick={onClose}>No</button>
                <button onClick={dispatch}>{action}</button>
            </div>
        </div>
    </div>
  )
}
