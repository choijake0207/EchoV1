import React, {useState} from 'react'

export default function ChangePassword({onClose, onSave}) {

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(currentPassword, newPassword)
    }

  return (
    <div className="form-page" id="change-password-page">
        <header className="form-header">
            <h4>Change Password</h4>
        </header>
        <form className="user-form" id="change-password-form" onSubmit={handleSubmit}>
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
