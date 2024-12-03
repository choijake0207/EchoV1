import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAuthorize } from '../../Context/AuthContext'
import { getUserProfile } from '../../Api/GET'
import { formatDate } from '../../Utility/FormatDate'
import { updateUserProfile } from '../../Api/PUT'
import { followUser } from '../../Api/POST'
import EditProfile from '../../Components/Forms/EditProfile'
import FollowList from '../../Components/PopUps/FollowList'
import GenericPage from '../../Layouts/GenericPage'
import UserIcon from '../../Components/UserIcon/UserIcon'
import Post from '../../Components/Post/Post'
import Comment from '../../Components/Comment/Comment'
import "./profile.css"


export default function Profile() {
    const {authorizeState, updateUserProfileState, isAuthLoading} = useAuthorize()
    const { username} = useParams()
    const [userProfile, setUserProfile] = useState(null)
    const [editing, setEditing] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followListType, setFollowListType] = useState("")
    const [profileHistoryType, setProfileHistoryType] = useState("Posts")
    const isMyProfile = authorizeState.username === username
    const [userColor, setUserColor] = useState("")
 


    useEffect(() => {
        const userProfileRequest = async () => {
            // if (authorizeState.authStatus) {
                try {
                    const data = await getUserProfile(username)
                    setUserProfile(data)
                    // checks to see if logged in user is already following current profile user
                    setIsFollowing(data.follower?.some(follower => follower.id === authorizeState.id)) 
                } catch (error) {
                    console.log(error.response.data.error)
                }
            // }
        } 
        userProfileRequest()
        
    }, [username]) // need dependency 

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
        } catch (error) {
            setIsFollowing(originalFollow) // reverts back to initial follow state 
            console.log(error.response.data.error)
        }
    }

    const handleColorChange = (color) => {
        setUserColor(color)
    }

   
      
  return (
    <GenericPage headerTitle="Profile" pageId="profile-page">
        {editing && 
            <EditProfile
            username={userProfile.username}
                bio={(userProfile.biography)}
                onClose={() => setEditing(false)}
                onSave={handleProfileUpdate}
            />
        }
        {followListType && 
            <FollowList
                list={followListType === "followers" ? userProfile.follower : userProfile.following}
                type={followListType}
                onClose={()=>setFollowListType("")}
            />
        }
        {userProfile && 
            <section className="profile-info">
                <div className="profile-banner" style={{background: userColor}}></div>
                <h1 className="profile-username">
                    <UserIcon username={username} handleColor={(handleColorChange)}/>
                    {userProfile.username}
                </h1>

                {isMyProfile ? 
                    (<button className="edit-btn profile-btn" onClick={()=>setEditing(true)}>Edit Profile</button>) 
                    : (<button onClick={handleFollow} className={isFollowing ? "unfollow profile-btn" : "follow profile-btn"}>{isFollowing ? "Following" : "Follow"}</button>)
                }
                
                {userProfile.biography && (
                    <p className="profile-bio">{userProfile.biography}</p>
                )}

                <p className="profile-date">Joined {formatDate(userProfile.createdAt)}</p>

                <div className="follow-display">
                    <p className="followers"
                        onClick={() => setFollowListType("followers")}
                    >
                        <span className="follow-count">{userProfile.follower.length}</span> followers
                    </p>

                    <p className="following"
                        onClick={() => setFollowListType("following")}
                    >
                        <span className="follow-count">{userProfile.following.length}</span> following
                    </p>
                </div>
            </section>
        }   
        <section className="profile-history"> 
            <div className="feed-options">
                <button 
                    onClick={() => setProfileHistoryType("Posts")}
                    className={profileHistoryType === "Posts" && "active"}
                > Posts </button>
                <button 
                    onClick={() => setProfileHistoryType("Comments")}
                    className={profileHistoryType === "Comments" && "active"}
                > Comments</button>
            </div>

            <ul className="profile-feed">
                {userProfile && profileHistoryType === "Posts" && userProfile.Posts.map(post => {
                    return (
                        <Post
                            key={post.id}
                            id={post.id} 
                            username={post.username}
                            text={post.text}
                            comments={post.Comments}
                            isHomeView={true}
                            createdAt={post.createdAt}
                            userId={post.userId}
                            isSaved={post.SavedPosts.some(obj => obj.userId === authorizeState.id)}
                        />
                    )
                })}
                {userProfile && profileHistoryType === "Comments" && userProfile.Comments.map(comment => {
                    return (
                        <Comment
                            key={comment.id}
                            text={comment.text}
                            username={comment.username}
                        />
                    )
                })
                }
                {userProfile && (
                    (profileHistoryType === "Posts" && userProfile.Posts.length === 0) ||
                    (profileHistoryType === "Comments" && userProfile.Comments.length === 0)
                ) &&
                    <div className="empty-profile-history">
                        <h5>@{username} hasn't {profileHistoryType === "Posts" ? "posted" : "commented"} anything yet</h5>
                    </div>
                }
            </ul>
        </section>
    </GenericPage>
  )
}
// start profile feed after posts model and routes