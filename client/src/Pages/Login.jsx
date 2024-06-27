import React, {useState, useContext} from 'react'
import "../Styles/alert.css"
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useAuthorize } from '../Context/AuthContext'
import Alert from '../Components/Alert'

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const {login} = useAuthorize()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      setUsername("")
      setPassword("")
    } catch (error) {
      setIsAlertVisible(true)
      setAlertMessage(error.response.data.error)
    }
  }

  const closeAlert = () => {
    setIsAlertVisible(false)
  }

  return (
    <div className="login-page">
      {isAlertVisible && <Alert message={alertMessage} onClose={closeAlert}/> }
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
