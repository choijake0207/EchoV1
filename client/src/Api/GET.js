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

export const fetchPosts = async () => {
    try {
        const response = await axios.get("http://localhost:3001/post")
        return response.data
    } catch (error) {
        throw error
    }

}

export const fetchSinglePost = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:3001/post/${postId}`)
        return response.data
    } catch (error) {
        throw error
    }
}