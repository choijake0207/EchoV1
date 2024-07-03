import React, {useState, useEffect} from 'react'
import { useAuthorize } from '../Context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { createPost } from '../Api/POST'
import { fetchPosts } from '../Api/GET'
import Post from '../Components/Post'
import "../Styles/home.css"


export default function Home() {
  const {authorizeState} = useAuthorize()
  const [postText, setPostText] = useState("")
  const [postFeed, setPostFeed] = useState([])
  const navigate = useNavigate()

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createPost(postText)
      console.log(response)
      setPostText("")
      navigate(`/post/${response.postId}`)
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

  const handleDeletedPost = (id) => {
    setPostFeed(postFeed.filter(post => post.id !== id))
  }
  

  return (
    <div className="page" id="home-page">
      {authorizeState.authStatus ? (
        
        <form className="create-post-form" onSubmit={handlePostSubmit}>
          <textarea 
            type="text" 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <button type="submit">Post</button>
        </form>
          
      
       
      ) : (
        <div className="greeting">
          <h1>Welcome To Echo</h1>
          <div className="links-container">
            <NavLink
             to="/login"
             id="login-a"
            >Login</NavLink>
            <NavLink
              to="/register"
              id="register-a"
            >Register</NavLink>
          </div>
        </div>
       
      )}
      <ul className="post-feed">
          {postFeed.map(post => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              text={post.text}
              createdAt={post.createdAt}
              userId={post.userId}
              onDelete={handleDeletedPost}
            />
          ))}
      </ul>
     
      
    </div>
  )
}
