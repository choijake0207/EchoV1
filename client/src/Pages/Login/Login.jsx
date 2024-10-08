import React, {useState, useContext} from 'react'
import "../../Components/Alerts/alert.css"
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthorize } from '../../Context/AuthContext'
import GenericPage from '../../Layouts/GenericPage'
import Alert from '../../Components/Alerts/Alert'
import "./login.css"

 
export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useAuthorize()
  const navigate = useNavigate()


  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      setUsername("")
      setPassword("")
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div  id="login-page">
      <header className="user-form-header">
        <h1 className="logo">echo</h1>
      </header>
      <form  className="user-form" onSubmit={onSubmit}>
        <h1 className="logreg-message">Welcome To Echo</h1>

        <label>
          Username
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Log In</button>
        <p>Don't Have An Account? Sign Up <NavLink to="/register">Here!</NavLink></p>
      </form>

    </div>
  )
}
