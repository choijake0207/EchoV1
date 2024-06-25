import React from 'react'
import {NavLink, Outlet} from "react-router-dom"

export default function RootLayout() {



  return (
    <div className="root-layout">
      <header>
        <h1 className="logo">Echo</h1>
        <nav className="nav-bar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
        </nav>
      </header>
      <main><Outlet/></main>
      
    </div>
  )
}
