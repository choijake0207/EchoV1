import React, {useEffect, useState} from 'react'
import { fetchSinglePost } from '../../Api/GET'
import { useParams } from 'react-router-dom'
import { useAuthorize } from '../../Context/AuthContext'
import { createComment } from '../../Api/POST'
import GenericPage from '../../Layouts/GenericPage'
import Post from '../../Components/Post/Post'
import Comment from '../../Components/Comment/Comment'
import "./singleView.css"
import UserIcon from '../../Components/UserIcon/UserIcon'

export default function SingleView() {
  const {id} = useParams()
  const [singlePost, setSinglePost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [commentList, setCommentList] = useState([])
  const {authorizeState} = useAuthorize()
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchSinglePost(id)
        setSinglePost(response)
        setCommentList(response.Comments)
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

  const isSaved = singlePost && singlePost.SavedPosts.some(obj => obj.userId === authorizeState.id)


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
         isSaved={isSaved}
        />
      )}

      {singlePost && (
        <ul className="comment-feed">
          {commentList.length > 0 ? (
            commentList.map(comment => (
              <Comment
                key={comment.id}
                username={comment.username}
                text={comment.text}
              />
            ))
          ) : (
            <p>No Comments Yet</p>
          )}
        </ul>
      )}
      {authorizeState.authStatus && (
        <form className="create-comment-form" onSubmit={handleCommentSubmit}>

            <UserIcon username={authorizeState.username}/>
            <textarea
              placeholder="Add a Comment"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />

          <button type="submit">Post</button>
        </form>
      )}


     

     

    </GenericPage>
  )
}
