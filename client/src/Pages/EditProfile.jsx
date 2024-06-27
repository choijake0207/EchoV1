import React, {useState} from 'react'


export default function EditProfile({username, bio}) {

    const [newUsername, setNewUsername] = useState("")
    const [newBio, setNewBio] = useState("")


  return (
    <div className="edit-profile-page">
        <form className="edit-profile-form" id="user-form">
            <label>Username</label>
            <input type="text"/>
            <label>Bio</label>
            <input type="text"/>
            <button>Save Changes</button>
        </form>
    </div>
  )
}
