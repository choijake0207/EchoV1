import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./post.css"
import { useAuthorize } from '../../Context/AuthContext'
import { deletePost } from '../../Api/DELETE'
import {HeartStraight, BookmarkSimple, ChatCircle, UserCircle} from "phosphor-react"


function PostHeader ({username, auth, handleDelete, userId}) {
  return (
    <header>
      <NavLink className="username" to={`/profile/${username}`}>
        <UserCircle/>
        {username}
      </NavLink>
      {userId === auth.id && (
        <button
          onClick={handleDelete}
          className="delete-post-btn"
        >
          Delete
        </button>
      )}
    </header>
  )
}

function PostContent ({id, createdAt, text, navigate}) {
  return (
    <div className="post-content">
      <p className="text" onClick={() => navigate(`/post/${id}`)}>
        {text}
      </p>
      <p className="date">{new Date(createdAt).toLocaleString()}</p>
    </div>
  )
}

function PostDetails ({isHomeView, id, comments, navigate}) {
  return (
    <div className="post-details">
      <div className="post-likes">
        <button type="button"><HeartStraight/>
          <p>0</p>
        </button>
      </div>
      <div className="post-comments">
        <button onClick={isHomeView ? () => navigate(`/post/${id}`) : null}>
          <ChatCircle />
          <p>{comments.length}</p>
        </button>
      </div>
      <div className="post-save">
        <button type="button">
          <BookmarkSimple size={"20px"}/>
        </button>
      </div>
    </div>
  )
}

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
        <PostHeader 
          username={username} 
          auth={authorizeState} 
          handleDelete={handleDelete} 
          userId={userId}
        />
        <PostContent 
          id={id} 
          createdAt={createdAt} 
          text={text}
          navigate={navigate}
        />
        <PostDetails
          isHomeView={isHomeView}
          id={id}
          comments={comments}
          navigate={navigate}
        />
    </li>
  )
}
