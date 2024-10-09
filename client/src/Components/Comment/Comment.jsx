import React from 'react'
import UserIcon from '../UserIcon/UserIcon'

export default function Comment({text, username, createdAt}) {
  return (
    <li className="comment">
        <UserIcon username={username}/>
        <div className="comment-body">
            <h5>{username}</h5>
            <p>{text}</p>
        </div>
    </li>
  )
}
