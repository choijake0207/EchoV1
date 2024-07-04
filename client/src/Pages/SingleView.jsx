import React, {useEffect, useState} from 'react'
import { fetchSinglePost } from '../Api/GET'
import { useParams, useNavigate } from 'react-router-dom'
import Post from '../Components/Post'
import { ArrowCircleLeft } from 'phosphor-react'
import { useAuthorize } from '../Context/AuthContext'
import "../Styles/singleView.css"

export default function SingleView() {
  const {id} = useParams()
  const [singlePost, setSinglePost] = useState(null)
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState("")
  const {authorizeState} = useAuthorize()
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchSinglePost(id)
        setSinglePost(response)
        console.log(response)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchPost()
  }, [])



  return (
    <div className="page" id="single-post-page">
      <header className="page-header">
        <button type="button" onClick={() => navigate(-1)}><ArrowCircleLeft size={"30px"}/></button>
      </header>
      {singlePost && (
        <Post
         id = {singlePost.id}
         username = {singlePost.username}
         text = {singlePost.text}
         createdAt={singlePost.createdAt}
         userId = {singlePost.userId}
         comments = {singlePost.Comments}
         isHomeView={false}
        />
      )}
      <section className="comments-section">
        {authorizeState.authStatus && (
          <form className="create-comment-form">
            <textarea
              placeholder="Add a Comment"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
            <button type="submit">Post</button>
          </form>
        )}
        {singlePost && (
          <ul className="comment-feed">
            {singlePost.Comments.length > 0 ? (
              singlePost.Comments.map(comment => (
                <li className="comment">
                  <h4>{comment.username}</h4>
                  <p>{comment.text}</p>
                </li>
              ))
            ) : (
              <p>No Comments Yet</p>
            )}
          </ul>
        )}
      </section>
     

    </div>
  )
}
