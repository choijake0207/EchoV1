import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'
import { getUserProfile } from '../Api/GET'
import { formatDate } from '../Utility/FormatDate'
import { updateUserProfile } from '../Api/PUT'
import { followUser } from '../Api/POST'
import EditProfile from '../Components/EditProfile'
import "../Styles/profile.css"

export default function Profile() {
    const {authorizeState, updateUserProfileState} = useAuthorize()
    const { username} = useParams()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState(null)
    const [editing, setEditing] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const isMyProfile = authorizeState.username === username

    useEffect(() => {
        if (authorizeState.authStatus !== undefined) {
            const userProfileRequest = async () => {
                try {
                    const data = await getUserProfile(username)
                    setUserProfile(data)
                    // checks to see if logged in user is already following current profile user
                    setIsFollowing(data.follower?.some(follower => follower.id === authorizeState.id)) 
                    console.log(authorizeState)
                   
                
                } catch (error) {
                    console.log(error.response.data.error)
                }
            } 
            userProfileRequest()
        }
    }, [username, authorizeState]) // need dependency 

    const handleProfileUpdate = async (newUsername, newBiography) => {
        try {
            const updatedProfile = await updateUserProfile(username, newUsername, newBiography)
            setUserProfile(prevProfile => ({
                ...prevProfile,
                username: updatedProfile.username,
                biography: updatedProfile.biography
                // need to keep prev state for follower/following arrays
            }))
            if (newUsername !== username) {
                updateUserProfileState(newUsername)
                navigate(`/profile/${newUsername}`)
            }
            setEditing(false)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    const toggleEditForm = () => {
        setEditing(true)
    }
    
    const handleFollow = async () => {
        const originalFollow = isFollowing // captures initial follow state
        setIsFollowing(!isFollowing)
        try {
            const response = await followUser(userProfile.id)
            console.log(response)
        } catch (error) {
            setIsFollowing(originalFollow) // reverts back to initial follow state 
            console.log(error.response.data.error)
        }
    }
    
  return (
    <div className="profile-page">
        <header className="page-header">
            <button type="button">Exit</button>
            <h4>Profile</h4>
        </header>
        {editing && <EditProfile
            username={userProfile.username}
            bio={(userProfile.biography)}
            onClose={() => setEditing(false)}
            onSave={handleProfileUpdate}
        
        />}
        {userProfile && 
            <section className="profile-info">
                <div className="profile-details">
                    <h1 className="profile-username">{userProfile.username}</h1>
                    {isMyProfile ? 
                        (<button className="profile-edit-btn" onClick={toggleEditForm}>Edit Profile</button>) 
                        : (<button onClick={handleFollow} className={isFollowing ? "unfollow" : "follow"}>{isFollowing ? "Following" : "Follow"}</button>)
                    }
                    
                    {userProfile.biography ? (
                        <p className="profile-bio">{userProfile.biography}</p>
                    ) : (
                        <p className="profile-bio">No Bio</p>
                    )}
                    <p className="profile-date">Joined {formatDate(userProfile.createdAt)}</p>
                    <div className="follow-display">
                        <p className="followers">{userProfile.follower.length} followers</p>
                        <p className="following">{userProfile.following.length} following</p>
                    </div>
                
                </div>
                
                
            </section>
        }   
        <section className="profile-feed"> 
            

        </section>

           

    </div>
  )
}
// start profile feed after posts model and routes