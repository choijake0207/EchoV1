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

export const fetchSinglePost = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/post/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

// export const fetchComments = async (id) => {
//     try {
//         const response = await axios.get(`http://localhost:3001/comment/${id}`)
//         return response.data
//     } catch (error) {
//         throw error
//     }
// }