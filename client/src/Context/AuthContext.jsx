import { createContext, useState, useEffect, useContext } from "react";
import { authorizeUser as authorizeUserAPI, login as loginAPI, register as registerAPI } from "../Api/AUTH";


const authorizeContext = createContext("")

export const AuthContextProvider = ({children}) => {
    const [authorizeState, setAuthorizeState] = useState({username: "", id: 0, authStatus: false})
    
    // auth check
    useEffect(() => { // add either interval check or localStorage event listener to detect token tampering
        const authorizeUser = async () => {
          try {
            const response = await authorizeUserAPI()
            setAuthorizeState({username: response.username, id: response.id, authStatus: true})
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
            const response = await loginAPI(userInfo)
            localStorage.setItem("accessToken", response)
            setAuthorizeState({username: userInfo.username, id: response.id, authStatus: true}) // optimistic state update for now => pessimistically render later + loading screen
        } catch (error) {
            throw error;
        }
    }
    // register authorize
    const register = async (username, password) => {
        try {
            const response = await registerAPI(username, password)
            localStorage.setItem("accessToken", response)
            setAuthorizeState({username, id: response.id, authStatus: true })
        } catch (error) {
            throw error;
        }
    }
    // logout deauthorize
    const logOut = () => {
        localStorage.removeItem("accessToken")
        setAuthorizeState({username: "", id: 0, authStatus: false})
    }

    // updated profile state: needs to update username stored in authorizeState
    const updateUserProfileState = (newUsername) => {
        setAuthorizeState(prevState => ({
            ...prevState,
            username: newUsername
        }))
    }

    return (
        <authorizeContext.Provider value={{authorizeState, login, register, logOut, updateUserProfileState}}>
            {children}
        </authorizeContext.Provider>
    )
}

export const useAuthorize = () => useContext(authorizeContext)