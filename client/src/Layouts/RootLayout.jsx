import React, { useState, useEffect} from 'react'
import {NavLink, Outlet, useNavigate} from "react-router-dom"
import { useAuthorize } from '../Context/AuthContext'
import "./root.css"
import "./darkMode.css"
import {House, MagnifyingGlass, User, Gear, Bell, BookmarkSimple, CellSignalFull, Sun, Moon, DiamondsFour  } from "phosphor-react"
import UserIcon from '../Components/UserIcon/UserIcon'
import InfoCreator from '../Components/Sidebar/InfoCreator'
import InfoContent from '../Components/Sidebar/InfoContent'
import InfoLinks from '../Components/Sidebar/InfoLinks'
import HeaderProfileMenu from '../Components/PopUps/HeaderProfileMenu'
import FriendsTool from '../Components/Sidebar/FriendsTool'
import { useDarkMode } from '../Context/DarkContext'
import { ScrollRestoration } from 'react-router-dom'
export default function RootLayout() { 

  const navigate = useNavigate()
  const {authorizeState, logOut}= useAuthorize()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const {toggleDarkMode, isDarkMode} = useDarkMode()

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prev => !prev)
  }
  const handleLogOut = () => {
    logOut()
    navigate("/")
  }



 
  return (
    <div className="root-layout">
      <ScrollRestoration/>

      <header className="root-header">
        <h1 className="logo"><DiamondsFour/>echo</h1>
        {authorizeState.authStatus ? (
          <div className="header-username">
            <button onClick={toggleProfileMenu}>
              <UserIcon username={authorizeState.username}/>
              <p >{authorizeState.username}</p>
            </button>
            {isProfileMenuOpen && (
              <HeaderProfileMenu 
                handleLogOut={handleLogOut} 
                toggleProfileMenu={toggleProfileMenu}
                username={authorizeState.username}
              />
            )}
          </div>
        ) : 
          <>
            <button className="header-dark-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? (<><Sun weight="fill"/> Light Mode</>) : (<><Moon weight="fill"/> Dark Mode</>)}
            </button>
          </>
          }
      </header>


      <aside className="root-nav">
        <nav className="nav-links">
          <NavLink to="/"><House className="house-svg"/><span className="nav-text">Home</span></NavLink>
          <NavLink to="/search"><MagnifyingGlass/><span className="nav-text">Search</span></NavLink>
          {authorizeState.authStatus && (
            <>
              <NavLink to="/notifications"><Bell/><span className="nav-text">Notifications</span></NavLink>
              <NavLink to={`/profile/${authorizeState.username}`}><User/><span className="nav-text">Profile</span></NavLink>
              <NavLink to="/saved"><BookmarkSimple/><span className="nav-text">Saved</span></NavLink>
            </>
          )}
          <NavLink to="/settings"><Gear/><span className="nav-text">Settings</span></NavLink>
        </nav>
      </aside>
   
      <main className="outlet">
        <Outlet/>
      </main>

      <section className="info-sidebar">
        <InfoCreator/>
        <InfoContent/>
        <InfoLinks/>
      </section>

      

      <aside className="tool-sidebar">
        <FriendsTool
        />
      </aside>

    </div>
  )
}
