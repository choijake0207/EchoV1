import React from 'react'

export default function Alert({message, onClose}) {
  return (
    <div className="custom-alert-box">
        <div className="custom-alert">
            <p>{message}</p>
            <button onClick={onClose}className="alert-close">Close</button>
        </div>
    </div>
  )
}
