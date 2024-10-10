import React from 'react'
import { SignOut, Info, UserCircle, Gear, Moon, Sun} from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { useDarkMode } from '../../Context/DarkContext'

export default function HeaderProfileMenu({handleLogOut}) {
    const {toggleDarkMode, isDarkMode} = useDarkMode()
  return (
    <div className="header-profile-menu">
        <div className="profile-menu-links">
            <NavLink><UserCircle/>View Profile</NavLink>
            <NavLink><Info/>About Echo</NavLink>
            <NavLink><Gear/>Settings</NavLink>
        </div>
        <button onClick={toggleDarkMode}>
            {isDarkMode ? (<><Sun/> Light Mode</>) : (<><Moon/> Dark Mode</>)}
        </button>
        
        <button onClick={handleLogOut}><SignOut/>Log Out</button>
    </div>
  )
}
