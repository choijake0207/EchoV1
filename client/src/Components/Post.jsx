import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Styles/post.css"
import { useAuthorize } from '../Context/AuthContext'
import { deletePost } from '../Api/DELETE'
import {HeartStraight, BookmarkSimple, ChatCircle} from "phosphor-react"

export default function Post({id, username, text, createdAt, userId, onDelete, comments, isHomeView}) {
  const navigate = useNavigate()
  const {authorizeState} = useAuthorize()

  const handleDelete = async () => {
    try {
      await deletePost(id)
      if (onDelete) {
        onDelete(id)
      }
      navigate("/")
    } catch (error) {
      console.log(error.response.data.error)
    }
  }



  return (
    <li className="post">
        <header>
          <NavLink className="username" to={`/profile/${username}`}>{username}</NavLink>
          {userId === authorizeState.id && (
            <button
              onClick={handleDelete}
            >Delete</button>
          )}
        </header>
        <div className="post-content">
          <p className="text" onClick={() => navigate(`/post/${id}`)}>
            {text}
          </p>
          <p className="date">{new Date(createdAt).toLocaleString()}</p>
        </div>
        <div className="post-details">
            <div className="post-likes">
              <button type="button"><HeartStraight/>0</button>
            </div>
            <div className="post-comments">
              {isHomeView ? (
                <button onClick={()=> navigate(`/post/${id}`)}><ChatCircle/>{comments.length}</button>
              ) : (
                <div><ChatCircle/><p>{comments.length}</p></div>
              )}
              
            </div>
            <div className="post-save">
              <button type="button"><BookmarkSimple/>0</button>
            </div>
            
        </div>

    </li>
  )
}
