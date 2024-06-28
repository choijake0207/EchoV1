import React, {useState} from 'react'


export default function EditProfile({username, bio, onClose, onSave}) {

    const [newUsername, setNewUsername] = useState(username)
    const [newBio, setNewBio] = useState(bio)

    const handleSubmit = (e) => {
      e.preventDefault()
      onSave(newUsername, newBio)
    }


  return (
    <div className="edit-profile-page" id="form-page">
        <header className="form-header">
          <h4>Edit Profile</h4>
        </header>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
            <label>Bio</label>
            <input type="text" value={newBio} onChange={(e) => setNewBio(e.target.value)}/>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Exit</button>
        </form>
    </div>
  )
}
