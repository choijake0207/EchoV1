import React, {useState} from 'react'

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="login-page">
      <form className="login-form">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>
      </form>
      <p>Don't Have An Account? Sign Up!</p>

    </div>
  )
}
