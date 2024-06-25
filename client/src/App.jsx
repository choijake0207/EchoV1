import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
// page imports
import RootLayout from './Layouts/RootLayout'
import Home from './Pages/Home'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
    </Route>
  )
)

function App() {
  <RouterProvider router={router}/>

}

export default App
