import {useState, useEffect} from "react"
import './App.css'
import axios from "axios"
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
// page imports
import RootLayout from './Layouts/RootLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
// context
import { authorizeContext } from './Context/AuthContext'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Route>
  )
)

function App() {

  const [authorizeState, setAuthorizeState] = useState({username: "", id: 0, authStatus: false})

  useEffect(() => { // add either interval check or localStorage event listener to detect token tampering
    const authorizeUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/auth", {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        })
        setAuthorizeState({username: response.data.username, id: response.data.id, authStatus: true})
      } catch (error) {
        console.log(error)
        setAuthorizeState({...authorizeState, status: false})
      }
    }
    authorizeUser()
  }, [])

  console.log(authorizeState)
  return (
    <authorizeContext.Provider value={{authorizeState, setAuthorizeState}}>
      <RouterProvider router={router}/>
    </authorizeContext.Provider>
    
  )
 
}

export default App
