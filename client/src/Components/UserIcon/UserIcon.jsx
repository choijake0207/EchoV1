import React from 'react'
import "./UserIcon.css"



function pickIconColor(username) {
  let number = username.length
  switch (number % 5) {
    case 1: 
      return "rgb(245, 87, 87)"
    case 2:
      return "var(--logo-color)"
    case 3:
      return "rgb(19, 176, 82)"
    case 4:
      return "rgb(230, 53, 198)"
    default:
      return "grey"
  }

}

export default function UserIcon({username}) {
    const letter = username.substring(0,1)
    const color = pickIconColor(username)
 
  return (
    <div className="user-icon" style={{backgroundColor: color}}>
        <p className="letter">{letter}</p>
    </div>
  )
}
