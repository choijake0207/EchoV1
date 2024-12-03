import React from 'react'
import UserIcon from '../UserIcon/UserIcon'
import "./comment.css"

export default function Comment({text, username, createdAt}) {
  return (
    <li className="comment">
        <UserIcon username={username}/>
        <div className="comment-body">
            <h4>{username}</h4>
            <p>{text}</p>
        </div>
    </li>
  )
}
