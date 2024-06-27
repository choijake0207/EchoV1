import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'
import { getUserProfile } from '../Api/GET'
import { formatDate } from '../Utility/FormatDate'

export default function Profile() {
    const {authorizeState} = useAuthorize()
    const { username } = useParams()
    const [userProfile, setUserProfile] = useState(null)
    const isMyProfile = authorizeState.username === username

    useEffect(() => {
        const userProfileRequest = async () => {
            try {
                const data = await getUserProfile(username)
                setUserProfile(data)
            } catch (error) {
                console.log(error.response.data.error)
            }
        } 
        userProfileRequest()
    }, [username])

    
    
  return (
    <div className="profile-page">
        {userProfile && 
            <section className="profile-info">
                <div className="profile-details">
                    <h1 className="profile-username">{userProfile.username}</h1>
                    {userProfile.biography ? (
                        <p className="profile-bio">{userProfile.biography}</p>
                    ) : (
                        <p className="profile-bio">No Bio</p>
                    )}
                    <p className="profile-date">Joined {formatDate(userProfile.createdAt)}</p>
                </div>
                {isMyProfile && <button className="profile-edit-btn">Edit Profile</button>}
                
            </section>
        }   
        <section className="profile-feed"> 
            

        </section>

           

    </div>
  )
}
// start profile feed after posts model and routes