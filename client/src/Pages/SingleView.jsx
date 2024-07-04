import React, {useEffect, useState} from 'react'
import { fetchSinglePost } from '../Api/GET'
import { useParams, useNavigate } from 'react-router-dom'
import Post from '../Components/Post'

export default function SingleView() {
  const {id} = useParams()
  const [singlePost, setSinglePost] = useState(null)
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState("")
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
        <button type="button" onClick={() => navigate(-1)}>Exit</button>
      </header>
      {singlePost && (
        <Post
         id = {singlePost.id}
         username = {singlePost.username}
         text = {singlePost.text}
         createdAt={singlePost.createdAt}
         userId = {singlePost.userId}
         comments = {singlePost.Comments}
        />
      )}
      <section className="comments-section">
        <form className="create-comment-form">
          <textarea
            placeholder="Add a Comment"
            onChange={() => setNewComment(e.target.value)}
            value={newComment}
          />
          <button type="submit">Post</button>
        </form>
        <ul className="comment-feed">
          {singlePost.Comments.length > 0 ? (
            singlePost.Comments.map((comment) => (
              <li className="comment">
                <h4>{singlePost.Comments.username}</h4>
                <p>{singlePost.Comments.text}</p>
              </li>
            ))
          ) : (
            <p>No Comments Yet</p>
          )}
        </ul>

      </section>
     

    </div>
  )
}
