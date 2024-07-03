import { createContext, useState, useEffect, useContext } from "react";

const darkContext = createContext(false)
export const DarkContextProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(true)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    return (
        <darkContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </darkContext.Provider>
    )
}
export const useDarkMode = () => useContext(darkContext)