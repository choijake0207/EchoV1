import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const authorizeContext = createContext("")

export const authContextProvider = ({children}) => {
    const [authorizeState, setAuthorizeState] = useState({username: "", id: 0, authStatus: false})
    
    // auth check
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
    // login authorize
    const login = async (username, password) => {
        try {
            const userInfo = {username: username, password: password}
            const response = await axios.post("http://localhost:3001/user/login", userInfo)
            localStorage.setItem("accessToken", response.data)
            setAuthorizeState({username: userInfo.username, id: response.data.id, authStatus: true}) // optimistic state update for now => pessimistically render later + loading screen
        } catch (error) {
            throw error;
        }
    }
    // register authorize
    const register = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3001/user/register", {username, password})
            localStorage.setItem("accessToken", response.data)
            setAuthorizeState({username, id: response.data.id, authStatus: true })
        } catch (error) {
            throw error;
        }
    }
    // logout deauthorize
    const logOut = () => {
        localStorage.removeItem("accessToken")
        setAuthorizeState({username: "", id: 0, authStatus: false})
    }

    return (
        <authorizeContext.Provider value={{authorizeState, login, register, logOut}}>
            {children}
        </authorizeContext.Provider>
    )
}

export const useAuthorize = () => useContext(authorizeContext)