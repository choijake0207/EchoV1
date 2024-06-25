import './App.css'
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

  return (
    <authorizeContext.Provider value={{authorizeState, setAuthorizeState}}>
      <RouterProvider router={router}/>
    </authorizeContext.Provider>
    
  )
 
}

export default App
