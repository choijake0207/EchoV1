import { createContext, useState, useEffect, useContext } from "react";

const darkContext = createContext(false)
export const DarkContextProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("isDarkMode")
        return savedMode ? JSON.parse(savedMode) : "false"
    })

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev)
    }

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode))
    }, [isDarkMode])

    return (
        <darkContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </darkContext.Provider>
    )
}
export const useDarkMode = () => useContext(darkContext)