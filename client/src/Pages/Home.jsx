import React, {useState} from 'react'
import { useAuthorize } from '../Context/AuthContext'
import { NavLink } from 'react-router-dom'

export default function Home() {
  const {authorizeState} = useAuthorize()
  const [postText, setPostText] = useState("")

  

  return (
    <div className="page" id="home-page">
      {authorizeState.authStatus ? (
        <div className="greeting">
          <h1>Welcome To Echo</h1>
          <div className="links-container">
            <NavLink
              to="/login"
            >Login</NavLink>
            <NavLink
              to="/register"
            >Register</NavLink>
          </div>
        </div>
      ) : (
        <form className="create-post-form">
          <input 
            type="text" 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></input>
          <button type="submit">Post</button>
        </form>
      )}
      <div className="home-feed"></div>
      
    </div>
  )
}
