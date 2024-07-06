import React, {useState} from 'react'
import ChangePassword from '../Components/ChangePassword'
import { updateUserPassword } from '../Api/PUT'
import {useDarkMode} from '../Context/DarkContext'
import { useAuthorize } from '../Context/AuthContext'
import GenericPage from '../Components/GenericPage'
import "../Styles/settings.css"

export default function Settings() {
    const {isDarkMode, toggleDarkMode} = useDarkMode()
    const [passwordForm, setPasswordForm] = useState(false)
    const {authorizeState} = useAuthorize()
    
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
    <GenericPage 
        headerTitle="Settings"
        pageId="settings-page"
    >
        {passwordForm && <ChangePassword
            onClose={() => setPasswordForm(false)}
            onSave={handlePasswordUpdate}
        
        />}
        {authorizeState.authStatus && (
            <section className="account-settings">
                <h3>Account</h3>
                <ul>
                    <li>
                        <button type="button" onClick={togglePasswordForm}>Change Password</button>
                    </li>
                </ul>
            </section>
        )}
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
    </GenericPage>
  )
}
