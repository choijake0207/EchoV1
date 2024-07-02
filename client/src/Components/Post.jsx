import React from 'react'

export default function Post({username, text, createdAt}) {
  return (
    <li>
        <p>{username}</p>
        <p>{text}</p>
        <p>{new Date(createdAt).toLocaleString()}</p>
    </li>
  )
}
