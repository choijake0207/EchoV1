import React, {useState} from 'react'

export default function ChangePassword(onClose, onSave) {

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

  return (
    <div className="change-password-page">
        <header>
            
            <h4>Change Password</h4>
        </header>
        <form className="change-password-form" id="user-form" onSubmit={handleSubmit}>
            <label>Current Password</label>
            <input type="password" onChange={(e)=> setCurrentPassword(e.target.value)} value={currentPassword}/>
            <label>New Password</label>
            <input type="password" onChange={(e)=> setNewPassword(e.target.value)} value={newPassword}/>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Exit</button>
        </form>
    </div>
  )
}
