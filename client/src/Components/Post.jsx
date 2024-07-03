import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Styles/post.css"


export default function Post({id, username, text, createdAt}) {
  const navigate = useNavigate()
  return (
    <li className="post">
        <NavLink className="username" to={`/profile/${username}`}>{username}</NavLink>
        <p className="text" onClick={() => navigate(`/post/${id}`)}>
          {text}
        </p>
        <p className="date">{new Date(createdAt).toLocaleString()}</p>
    </li>
  )
}
