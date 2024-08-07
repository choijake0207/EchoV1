import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'
import { getUserProfile } from '../Api/GET'
import { formatDate } from '../Utility/FormatDate'
import { updateUserProfile } from '../Api/PUT'
import { followUser } from '../Api/POST'
import EditProfile from '../Components/EditProfile'
import FollowList from '../Components/FollowList'
import { ArrowCircleLeft } from 'phosphor-react'
import GenericPage from '../Components/GenericPage'
import "../Styles/profile.css"

export default function Profile() {
    const {authorizeState, updateUserProfileState} = useAuthorize()
    const { username} = useParams()
    const [userProfile, setUserProfile] = useState(null)
    const [editing, setEditing] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followListType, setFollowListType] = useState("")
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
    <GenericPage headerTitle="Profile" pageId="profile-page">
        {editing && <EditProfile
            username={userProfile.username}
            bio={(userProfile.biography)}
            onClose={() => setEditing(false)}
            onSave={handleProfileUpdate}
        
        />}
        {followListType && (
            <FollowList
                list={followListType === "followers" ? userProfile.follower : userProfile.following}
                type={followListType}
                onClose={()=>setFollowListType("")}
            />
        )}
        {userProfile && 
            <section className="profile-info">
                <div className="profile-details">
                    <h1 className="profile-username">{userProfile.username}</h1>
                    {isMyProfile ? 
                        (<button className="profile-edit-btn" onClick={()=>setEditing(true)}>Edit Profile</button>) 
                        : (<button onClick={handleFollow} className={isFollowing ? "unfollow" : "follow"}>{isFollowing ? "Following" : "Follow"}</button>)
                    }
                    
                    {userProfile.biography ? (
                        <p className="profile-bio">{userProfile.biography}</p>
                    ) : (
                        <p className="profile-no-bio">No Bio</p>
                    )}
                    <p className="profile-date">Joined {formatDate(userProfile.createdAt)}</p>
                    <div className="follow-display">
                        <p className="followers"
                          onClick={() => setFollowListType("followers")}
                        >{userProfile.follower.length} followers</p>
                        <p className="following"
                            onClick={() => setFollowListType("following")}
                        >{userProfile.following.length} following</p>
                    </div>
                
                </div>
                
                
            </section>
        }   
        <section className="profile-feed"> 
            

        </section>

           

    </GenericPage>
  )
}
// start profile feed after posts model and routes