import React, {useState, useEffect} from 'react'
import { useAuthorize } from '../../Context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { createPost } from '../../Api/POST'
import { fetchPosts, fetchPostsByFollowing } from '../../Api/GET'
import Post from '../../Components/Post/Post'
import CreatePost from '../../Components/Forms/CreatePost'
import "./home.css"
import { PaperPlaneRight } from 'phosphor-react'


export default function Home() {
  const {authorizeState} = useAuthorize()
  const [postFeed, setPostFeed] = useState([])
  const [feedType, setFeedType] = useState("Latest")
  const navigate = useNavigate()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const submitPost = async (postText) => {
    try {
      const response = await createPost(postText)
      console.log(response)
      navigate(`/post/${response.postId}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleFetchPosts = async () => {
      try {
        const response = feedType === "Latest" ? await fetchPosts() : await fetchPostsByFollowing()
        setPostFeed(response)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    handleFetchPosts()
  }, [feedType])

  const handleDeletedPost = (id) => {
    setPostFeed(postFeed.filter(post => post.id !== id))
  }
  

  return (
    <>
      {isFormVisible && <CreatePost submitPost={submitPost} toggleFormVisibility={() => setIsFormVisible(false)}/>}
      <div className="page" id="home-page">
          {authorizeState.authStatus ? (
            <>
              <div className="home-filter-bar">
                <button 
                  onClick={() => setFeedType("Latest")}
                  className={feedType === "Latest" && "active-feed"}
                >
                    Latest
                </button>
                <button 
                  onClick={() => setFeedType("Following")}
                  className={feedType === "Following" && "active-feed"}
                >
                  Following
                </button>
              </div>
              <div className="create-modal" onClick={() => setIsFormVisible(true)}>
                <p > 
                  What's on your mind {authorizeState.username}?
                </p>
                <PaperPlaneRight size="1.75em"/>
              </div>
            </>
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
                  comments={post.Comments}
                  isHomeView={true}
                  isSaved={post.SavedPosts.some(obj => obj.userId === authorizeState.id)}
                />
              ))}
          </ul>

      </div>
    </>
  )
}
