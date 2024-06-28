import React, {useState} from 'react'
import ChangePassword from '../Components/ChangePassword'

export default function Settings() {

    const [passwordForm, setPasswordForm] = useState(false)
    const togglePasswordForm = () => {
        setPasswordForm(true)
    }

  return (
    <div className="settings-page">
        <header>
            <button type="button">Exit</button>
            <h4>Settings</h4>
        </header>
        {passwordForm && <ChangePassword/>}
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
        </section>
    </div>
  )
}
