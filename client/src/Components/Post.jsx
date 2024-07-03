import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Styles/post.css"
import { useAuthorize } from '../Context/AuthContext'


export default function Post({id, username, text, createdAt, userId}) {
  const navigate = useNavigate()
  const {authorizeState} = useAuthorize()
  return (
    <li className="post">
        <header>
          <NavLink className="username" to={`/profile/${username}`}>{username}</NavLink>
          {userId === authorizeState.id && (
            <button>Delete</button>
          )}
        </header>
        
        <p className="text" onClick={() => navigate(`/post/${id}`)}>
          {text}
        </p>
        <p className="date">{new Date(createdAt).toLocaleString()}</p>
    </li>
  )
}
