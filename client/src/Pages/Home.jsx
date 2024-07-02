import React, {useState, useEffect} from 'react'
import { useAuthorize } from '../Context/AuthContext'
import { NavLink } from 'react-router-dom'
import { createPost } from '../Api/POST'
import { fetchPosts } from '../Api/GET'
import Post from '../Components/Post'


export default function Home() {
  const {authorizeState} = useAuthorize()
  const [postText, setPostText] = useState("")
  const [postFeed, setPostFeed] = useState([])

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

  useEffect(() => {
    const handleFetchPosts = async () => {
      try {
        const response = await fetchPosts()
        setPostFeed(response)
        console.log(response)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    handleFetchPosts()
  }, [])
  

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
      <ul className="home-feed">
        {postFeed.map(post => (
          <Post
            key={post.id}
            username={post.username}
            text={post.text}
            createdAt={post.createdAt}
          />
        ))}
      </ul>
      
    </div>
  )
}
