import React, {useEffect, useRef} from 'react'
import { SignOut, Info, UserCircle, Gear, Moon, Sun} from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { useDarkMode } from '../../Context/DarkContext'


export default function HeaderProfileMenu({handleLogOut, toggleProfileMenu, username}) {
    const profileMenuRef = useRef(null)
    const {toggleDarkMode, isDarkMode} = useDarkMode()

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)
        return (() => document.removeEventListener("mousedown", handleOutsideClick))
    },[])
    const handleOutsideClick = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            toggleProfileMenu()
        }
    }
  return (
    <div className="header-profile-menu" ref={profileMenuRef} onClick={toggleProfileMenu} >
        <div className="profile-menu-links">
            <NavLink to={`/profile/${username}`}><UserCircle/>View Profile</NavLink>
            <NavLink to="/about"><Info/>About Echo</NavLink>
            <NavLink to="/settings"><Gear/>Settings</NavLink>
        </div>
        <button onClick={toggleDarkMode}>
            {isDarkMode ? (<><Sun/> Light Mode</>) : (<><Moon/> Dark Mode</>)}
        </button>
        
        <button onClick={handleLogOut}><SignOut/>Log Out</button>
    </div>
  )
}
