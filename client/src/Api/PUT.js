// extract API base url later

import axios from "axios";

export const updateUserProfile = async (currentUsername, newUsername, newBiography) => {
    try {
        const response = await axios.put(`http://localhost:3001/user/profile/${currentUsername}`, {
            newUsername, newBiography
        },{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

