import React from 'react'
import { NavLink } from 'react-router-dom'
import UserIcon from '../UserIcon/UserIcon'

export default function FollowList({list, type, onClose}) {
  return (
    <div className="follow-list-overlay">
        <div className="follow-list-container">
            <header>
                <h4>{type === "followers" ? `Followers (${list.length})` : `Following (${list.length})`}</h4>
                <button onClick={onClose}>Exit</button>
            </header>
            <ul className="follow-list">
                {list.map(user => (
                    <li key={user.id}>
                        <NavLink 
                            to={`/profile/${user.username}`}
                            onClick={onClose}
                        >
                            <UserIcon username={user.username}/>
                            {user.username}
                        </NavLink>
                    
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
