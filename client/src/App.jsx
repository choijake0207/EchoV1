import {useState, useEffect} from "react"
import './App.css'
import axios from "axios"
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
// page imports
import RootLayout from './Layouts/RootLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from "./Pages/Profile"
// context
import { AuthContextProvider } from './Context/AuthContext'

 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Route>
  )
)

function App() {

  
  

  
  return (
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
    
  )
 
}

export default App
