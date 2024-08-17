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
        <h1 className="logo">echo</h1>
      </header>
      <aside className="root-nav">
        <nav className="nav-links">
          <NavLink to="/"><House/><span className="nav-text">Home</span></NavLink>
          <NavLink to="/search"><MagnifyingGlass/><span className="nav-text">Search</span></NavLink>
          {authorizeState.authStatus && (
            <>
              <NavLink to="/notifications"><Bell/><span className="nav-text">Notifications</span></NavLink>
              <NavLink to="/chat"><ChatCircle/>Chat</NavLink>
              <NavLink to={`/profile/${authorizeState.username}`}><User/><span className="nav-text">Profile</span></NavLink>
              <NavLink to="/bookmark"><BookmarkSimple/><span className="nav-text">Saved</span></NavLink>
            </>
          )}
          <NavLink to="/settings"><Gear/><span className="nav-text">Home</span></NavLink>
        </nav>
        {authorizeState.authStatus && (
          <div className="nav-bottom">
            <button onClick={toggleProfileMenu}><UserCircle size={"30px"}/><span className="nav-text">{authorizeState.username}</span></button>
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
