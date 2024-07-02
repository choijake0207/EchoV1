

import axios from "axios";

export const followUser = async (id) => {
    try {
        const response = await axios.post(`http://localhost:3001/follow/${id}`,{}, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const createPost = async (postText) => {
    try {
        const response = await axios.post("http://localhost:3001/post", {
            text: postText
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}