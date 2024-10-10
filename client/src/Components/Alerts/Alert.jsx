import React, {useEffect} from 'react'
import {X} from "phosphor-react"

export default function Alert({type, message, onClose}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".custom-alert-box").classList.add("alert-hide")
      setTimeout(() => {
        onClose()
      }, 100)
    }, 3000)
    return (() => clearTimeout(timer))
  }, [])


  return (
    <div className="custom-alert-box" id={`alert-${type}`}>
        <p>{message}</p>
        <button onClick={onClose}><X/></button>
    </div>
  )
}
