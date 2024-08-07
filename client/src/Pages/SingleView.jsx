import React, {useEffect, useState} from 'react'
import { fetchSinglePost } from '../Api/GET'
import { useParams } from 'react-router-dom'
import Post from '../Components/Post'
import { ArrowCircleLeft } from 'phosphor-react'
import { useAuthorize } from '../Context/AuthContext'
import { createComment } from '../Api/POST'
import GenericPage from '../Components/GenericPage'
import "../Styles/singleView.css"

export default function SingleView() {
  const {id} = useParams()
  const [singlePost, setSinglePost] = useState(null)
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createComment({newComment, id})
      console.log(response)
      setNewComment("")
    } catch (error) {
      console.log(error.response.data.error)
    }
  }



  return (
    <GenericPage pageId="single-post-page" headerTitle="Post">
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
          <form className="create-comment-form" onSubmit={handleCommentSubmit}>
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
     

    </GenericPage>
  )
}
