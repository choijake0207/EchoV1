import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'
import { getUserProfile } from '../Api/GET'
import { formatDate } from '../Utility/FormatDate'
import { updateUserProfile } from '../Api/PUT'
import EditProfile from '../Components/EditProfile'

export default function Profile() {
    const {authorizeState, updateUserProfileState} = useAuthorize()
    const { username } = useParams()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState(null)
    const [editing, setEditing] = useState(false)
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

    const handleProfileUpdate = async (newUsername, newBiography) => {
        try {
            const updatedProfile = await updateUserProfile(username, newUsername, newBiography)
            setUserProfile(updatedProfile)
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
                    <button>Follow</button>
                    {userProfile.biography ? (
                        <p className="profile-bio">{userProfile.biography}</p>
                    ) : (
                        <p className="profile-bio">No Bio</p>
                    )}
                    <p className="profile-date">Joined {formatDate(userProfile.createdAt)}</p>
                </div>
                {isMyProfile && <button className="profile-edit-btn" onClick={toggleEditForm}>Edit Profile</button>}
                
            </section>
        }   
        <section className="profile-feed"> 
            

        </section>

           

    </div>
  )
}
// start profile feed after posts model and routes