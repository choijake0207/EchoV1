import React, { useContext, useState, useEffect, useRef } from 'react'
import {NavLink, Outlet, useNavigate} from "react-router-dom"
import { useAuthorize } from '../Context/AuthContext'
import "./root.css"
import {House, MagnifyingGlass, User, SignOut, Gear, Bell, ChatCircle, UserCircle, BookmarkSimple  } from "phosphor-react"

export default function RootLayout() { 

  const navigate = useNavigate()
  const {authorizeState, logOut}= useAuthorize()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)


  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }
  const handleLogOut = () => {
    logOut()
    navigate("/")

  }
 
 
  console.log(authorizeState)
  return (
    <div className="root-layout">
      <header className="root-header">
        <h1 className="logo">Echo</h1>
      </header>
      <aside className="root-nav">
        <nav className="nav-links">
          <NavLink to="/"><House/> Home</NavLink>
          <NavLink to="/search"><MagnifyingGlass/>Search</NavLink>
          {authorizeState.authStatus && (
            <>
              <NavLink to="/notifications"><Bell/>Notifications</NavLink>
              <NavLink to="/chat"><ChatCircle/>Chat</NavLink>
              <NavLink to={`/profile/${authorizeState.username}`}><User/>Profile</NavLink>
              <NavLink to="/bookmark"><BookmarkSimple/>Saved</NavLink>
            </>
          )}
          <NavLink to="/settings"><Gear/>Settings</NavLink>
        </nav>
        {authorizeState.authStatus && (
          <div className="nav-bottom">
            <button onClick={toggleProfileMenu}><UserCircle size={"30px"}/>{authorizeState.username}</button>
            {isProfileMenuOpen && (
              <div className="profile-menu" onClick={toggleProfileMenu}> 
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            )}
          </div>
       
        )}
       
     
      </aside>
      <main className="outlet"><Outlet/></main>
      <aside className="info-sidebar">
        <div className="info-content"></div>

      </aside>
      
    </div>
  )
}
