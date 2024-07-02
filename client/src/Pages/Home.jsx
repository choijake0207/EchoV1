import React, {useState} from 'react'
import { useAuthorize } from '../Context/AuthContext'
import { NavLink } from 'react-router-dom'
import { createPost } from '../Api/POST'

export default function Home() {
  const {authorizeState} = useAuthorize()
  const [postText, setPostText] = useState("")

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createPost(postText)
      console.log(response)
      setPostText("")
    } catch (error) {
      console.log(error.response.data.error)
    }
  }
  

  return (
    <div className="page" id="home-page">
      {authorizeState.authStatus ? (
        <form className="create-post-form" onSubmit={handlePostSubmit}>
          <input 
           type="text" 
           value={postText}
           onChange={(e) => setPostText(e.target.value)}
          ></input>
         <button type="submit">Post</button>
        </form>
       
      ) : (
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
       
      )}
      <div className="home-feed"></div>
      
    </div>
  )
}
