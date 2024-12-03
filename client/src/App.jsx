import {useState, useEffect} from "react"
import axios from "axios"
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
// page imports
import RootLayout from './Layouts/RootLayout'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Profile from "./Pages/Profile/Profile"
import Settings from "./Pages/Settings/Settings"
import Search from "./Pages/Search/Search"
import SingleView from "./Pages/SingleView/SingleView"
import Saved from "./Pages/Saved/Saved"
// context
import { AuthContextProvider } from './Context/AuthContext'
import { DarkContextProvider } from "./Context/DarkContext"
// tools
import { ScrollRestoration } from "react-router-dom" 

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
      
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/post/:id" element={<SingleView/>}/>
        <Route path="/saved" element={<Saved/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

    </>
  )
)

function App() {

  
  

  
  return (
    <DarkContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router}/>
      </AuthContextProvider>
    </DarkContextProvider>
  )
 
}

export default App
