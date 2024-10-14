import React, {useState} from 'react'
import ChangePassword from '../../Components/Forms/ChangePassword'
import { updateUserPassword } from '../../Api/PUT'
import {useDarkMode} from '../../Context/DarkContext'
import { useAuthorize } from '../../Context/AuthContext'
import GenericPage from '../../Layouts/GenericPage'
import { CaretRight } from 'phosphor-react'
import { deleteAccount } from '../../Api/DELETE'
import "./settings.css"

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
    const handleDeleteAccount = async () => {
        try {
            const response = await deleteAccount()
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
                <div className="account-options">
                    <button type="button">Edit Profile <CaretRight/></button>
                    <button type="button" onClick={togglePasswordForm}>Change Password <CaretRight/></button>
                    <button type="button" onClic={handleDeleteAccount}>Delete Account <CaretRight/></button>
                </div>
            </section>
        )}
        <section className="general-settings">
            <h3>General</h3>
            <div className="general-options">
                <div className="dark-mode-container">
                    Dark Mode
                    <label className="switch">
                        <input 
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </section>
    </GenericPage>
  )
}
