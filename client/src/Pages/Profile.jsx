import React from 'react'

export default function Profile() {
  return (
    <div className="profile-page">
        <section className="profile-info">
            <div className="profile-details">
                <h1 className="profile-username">username</h1>
                <p className="profile-bio">No bio</p>
                <p className="profile-date">Joined: date</p>
            </div>
            <button className="profile-edit-btn"></button>
        </section>
        <section className="profile-feed"> 
            

        </section>

           

    </div>
  )
}
// start profile feed after posts model and routes