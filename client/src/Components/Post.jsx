import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


export default function Post({id, username, text, createdAt}) {
  const navigate = useNavigate()
  return (
    <li className="post">
        <NavLink to={`/profile/${username}`}>{username}</NavLink>
        <p onClick={() => navigate(`/post/${id}`)}>
          {text}
        </p>
        <p>{new Date(createdAt).toLocaleString()}</p>
    </li>
  )
}
