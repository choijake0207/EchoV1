import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'
import { getUserProfile } from '../Api/GET'

export default function Profile() {
    const {authorizeState} = useAuthorize()
    const { username } = useParams()
    const isMyProfile = authorizeState.username === username

    useEffect(() => {
        const userProfileRequest = async () => {
            try {
                const data = await getUserProfile(username)
                console.log(data)

            } catch (error) {
                console.log(error.response.data.error)
            }
        } 
        userProfileRequest()
    }, [username])

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