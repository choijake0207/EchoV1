import React, { useContext, useState, useEffect, useRef } from 'react'
import {NavLink, Outlet} from "react-router-dom"
import { useAuthorize } from '../Context/AuthContext'
import "../Styles/root.css"

export default function RootLayout() { 


  const {authorizeState, logOut}= useAuthorize()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)


  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }
 
 
  console.log(authorizeState)
  return (
    <div className="root-layout">
      <header>
        <div className="nav-bar-left">
          <h1 className="logo">Echo</h1>
          {authorizeState.authStatus ? (<><p>Welcome {authorizeState.username}</p></>) : (null)}
        </div>
        <nav className="nav-bar-right">
          <NavLink to="/">Home</NavLink>
          
          <button onClick={toggleProfileMenu} >Profile</button>
          {isProfileMenuOpen && (
            <div className="profile-menu" onClick={toggleProfileMenu}>
              {authorizeState.authStatus ? (
                <>
                  <NavLink to={`/profile/${authorizeState.username}`}>View Profile</NavLink>
                  <button onClick={logOut}>Log Out</button>
                </>
              ) : (
                <>
                  <NavLink to="/register">Sign Up</NavLink>
                  <NavLink to="/login">Login</NavLink>
                </>
              )}
            </div>
          )}
          
          
        </nav>
      </header>
      <main><Outlet/></main>
      
    </div>
  )
}
