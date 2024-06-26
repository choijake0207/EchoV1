import React, { useContext } from 'react'
import {NavLink, Outlet} from "react-router-dom"
import { authorizeContext } from '../Context/AuthContext'
import "../Styles/root.css"

export default function RootLayout() {


  const {authorizeState, setAuthorizeState}= useContext(authorizeContext)

  const logOut = () => {
    localStorage.removeItem("accessToken")
    setAuthorizeState({username: "", id: 0, authStatus: false})
  }

  return (
    <div className="root-layout">
      <header>
        <div className="nav-bar-left">
          <h1 className="logo">Echo</h1>
          {authorizeState.authStatus ? (<><p>Welcome {authorizeState.username}</p></>) : ( <></>)}
        </div>
        <nav className="nav-bar-right">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
          <button onClick={logOut}>Log Out</button>
        </nav>
      </header>
      <main><Outlet/></main>
      
    </div>
  )
}
