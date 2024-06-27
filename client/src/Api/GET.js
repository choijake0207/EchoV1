// extract API base url later

import axios from "axios";

export const getUserProfile = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3001/user/profile/${username}`)
        return response.data
    } catch (error) {
        throw error
    }

}