import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../Components/ChangePassword'
import { updateUserPassword } from '../Api/PUT'
import {useDarkMode} from '../Context/DarkContext'
import "../Styles/settings.css"

export default function Settings() {
    const {isDarkMode, toggleDarkMode} = useDarkMode()
    const [passwordForm, setPasswordForm] = useState(false)
    const navigate = useNavigate()
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
    <div className="page" id="settings-page">
        <header className="page-header">
            <button type="button" onClick={()=>navigate(-1)}>Exit</button>
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
                        <span className="slider"></span>
                    </label>
                </li>
            </ul>
        </section>
    </div>
  )
}
