import React from 'react'

export default function UserIcon({username}) {
    const letter = username.substring(0,1)
  return (
    <div className="user-icon">
        <p className="letter">{letter}</p>
    </div>
  )
}
