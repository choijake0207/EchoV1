import axios from "axios";

export const authorizeUser = async () => {
    const response = await axios.get("http://localhost:3001/user/auth", {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response.data
}

export const login = async (username, password) => {
    const response = await axios.post("http://localhost:3001/user/login", {
        username, 
        password
    })
    return response.data
}

export const register = async (username, password) => {
    const response = await axios.post("http://localhost:3001/user/register", {
        username,
        password
    })
    return response.data
}