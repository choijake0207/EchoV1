import React, {useState} from 'react'
import ChangePassword from '../Components/ChangePassword'
import { updateUserPassword } from '../Api/PUT'
import {useDarkMode} from '../Context/DarkContext'

export default function Settings() {
    const {isDarkMode, toggleDarkMode} = useDarkMode()
    const [passwordForm, setPasswordForm] = useState(false)
    const togglePasswordForm = () => {
        setPasswordForm(true)
    }
    
    const handlePasswordUpdate = async (currentPassword, newPassword) => {
        try {
            const response = await updateUserPassword(currentPassword, newPassword)
            setPasswordForm(false)
            console.log(response)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

  return (
    <div className="settings-page">
        <header className="page-header">
            <button type="button">Exit</button>
            <h4>Settings</h4>
        </header>
        {passwordForm && <ChangePassword
            onClose={() => setPasswordForm(false)}
            onSave={handlePasswordUpdate}
        
        />}
        <section className="account-settings">
            <h3>Account</h3>
            <ul>
                <li>
                    <button type="button" onClick={togglePasswordForm}>Change Password</button>
                </li>
            </ul>
        </section>
        <section className="general-settings">
            <h3>General</h3>
            <ul>
                <li>
                    Dark Mode
                    <label className="switch">
                        <input 
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />
                        <span className="slider-round"></span>
                    </label>
                </li>
            </ul>
        </section>
    </div>
  )
}
