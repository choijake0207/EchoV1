import React, {useState} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const userInfo = {username: username, password: password}
      const response = await axios.post("http://localhost:3001/user/login", userInfo)
      setUsername("")
      setPassword("")
      localStorage.setItem("accessToken", response.data)
    } catch (error) {
      alert(error)
    }


  }

  return (
    <div className="login-page">
      <h3>Log In</h3>
      <form className="login-form" id="user-form" onSubmit={onSubmit}>
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
      <p>Don't Have An Account? Sign Up <NavLink to="/register">Here!</NavLink></p>

    </div>
  )
}
