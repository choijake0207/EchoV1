import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'

export default function Profile() {
    const {authorizeState} = useAuthorize()
    const { username } = useParams()
    const isMyProfile = authorizeState.username === username


    console.log(isMyProfile)

  return (
    <div className="profile-page">
        <section className="profile-info">
            <div className="profile-details">
                <h1 className="profile-username">{username}</h1>
                <p className="profile-bio">No bio</p>
                <p className="profile-date">Joined: date</p>
            </div>
            {isMyProfile && <button className="profile-edit-btn">Edit Profile</button>}
            
        </section>
        <section className="profile-feed"> 
            

        </section>

           

    </div>
  )
}
// start profile feed after posts model and routes