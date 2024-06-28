import React from 'react'

export default function Settings() {
  return (
    <div className="settings-page">
        <header>
            <button type="button">Exit</button>
            <h4>Settings</h4>
        </header>
        <section className="account-settings">
            <h3>Account</h3>
            <ul>
                <li>
                    <button type="button">Change Password</button>
                </li>
            </ul>
        </section>
        <section className="general-settings">
            <h3>General</h3>
        </section>
    </div>
  )
}
