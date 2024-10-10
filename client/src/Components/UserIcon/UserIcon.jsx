import React, {useEffect} from 'react'
import "./UserIcon.css"



function pickIconColor(username) {
  let number = username.length
  switch (number % 5) {
    case 1: 
      return "var(--default-yellow)"
    case 2:
      return "var(--logo-color)"
    case 3:
      return "var(--default-green)"
    case 4:
      return "var(--default-red)"
    default:
      return "grey"
  }

}

export default function UserIcon({username, handleColor}) {
    const letter = username.substring(0,1).toUpperCase()
    const color = pickIconColor(username)
    
    useEffect(() => {
      if (handleColor) {
      handleColor(color)
      }
    }, [color])
    
 
  return (
    <div className="user-icon" style={{backgroundColor: color}}>
        <p className="letter">{letter}</p>
    </div>
  )
}
