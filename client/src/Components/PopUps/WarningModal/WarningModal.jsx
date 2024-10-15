import React from 'react'

export default function WarningModal({message, action, dispatch, onClose}) {
  return (
    <div className="warning-modal-overlay">
        <div className={`${action} warning-modal`}>
            <div className="modal-banner">
              <p>{message}</p>
            </div>
            <div className="confirmation-container">
                <button onClick={onClose}>Cancel</button>
                <button onClick={dispatch}>{action}</button>
            </div>
        </div>
    </div>
  )
}
