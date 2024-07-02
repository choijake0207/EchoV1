import React from 'react'
import { NavLink } from 'react-router-dom'

export default function FollowList({list, type, onClose}) {
  return (
    <div className="follow-list">
        <header>
            <button onClick={onClose}>Exit</button>
            <h4>{type === "followers" ? "Followers" : "Following"}</h4>
        </header>
        <ul>
            {list.map(user => (
                <li key={user.id}>
                    <NavLink 
                        to={`/profile/${user.username}`}
                        onClick={onClose}
                    >
                        {user.username}
                    </NavLink>
                
                </li>
            ))}
        </ul>

        
    </div>
  )
}
