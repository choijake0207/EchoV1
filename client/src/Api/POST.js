

import axios from "axios";

export const followUser = async (id) => {
    try {
        const response = await axios.post(`http://localhost:3001/follow/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}