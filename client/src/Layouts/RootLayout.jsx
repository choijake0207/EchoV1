import React, { useState} from 'react'
import {NavLink, Outlet, useNavigate} from "react-router-dom"
import { useAuthorize } from '../Context/AuthContext'
import "./root.css"
import {House, MagnifyingGlass, User, Gear, Bell, BookmarkSimple, CellSignalFull  } from "phosphor-react"
import UserIcon from '../Components/UserIcon/UserIcon'
import InfoCreator from '../Components/Sidebar/InfoCreator'
import InfoContent from '../Components/Sidebar/InfoContent'
import InfoLinks from '../Components/Sidebar/InfoLinks'

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
 
  return (
    <div className="root-layout">
      <header className="root-header">
        <h1 className="logo"><CellSignalFull/>echo</h1>
        {authorizeState.authStatus && (
          <div className="nav-username">
            <button onClick={toggleProfileMenu}>
              <UserIcon username={authorizeState.username}/>
              <span className="nav-text">{authorizeState.username}</span>
            </button>
            {isProfileMenuOpen && (
              <div className="profile-menu" onClick={toggleProfileMenu}> 
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            )}
          </div>
       
        )}
      </header>


      <aside className="root-nav">
        <nav className="nav-links">
          <NavLink to="/"><House className="house-svg"/><span className="nav-text">Home</span></NavLink>
          <NavLink to="/search"><MagnifyingGlass/><span className="nav-text">Search</span></NavLink>
          {authorizeState.authStatus && (
            <>
              <NavLink to="/notifications"><Bell/><span className="nav-text">Notifications</span></NavLink>
              <NavLink to={`/profile/${authorizeState.username}`}><User/><span className="nav-text">Profile</span></NavLink>
              <NavLink to="/bookmark"><BookmarkSimple/><span className="nav-text">Saved</span></NavLink>
            </>
          )}
          <NavLink to="/settings"><Gear/><span className="nav-text">Settings</span></NavLink>
        </nav>
      </aside>


      <main className="outlet"><Outlet/></main>


      
      <aside className="info-sidebar">
        <InfoContent/>
        <InfoCreator/>
        <InfoLinks/>
      </aside>
    


    </div>
  )
}
