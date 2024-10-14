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

export const fetchSavedPosts = async () => {
    try {
        const response = await axios.get("http://localhost:3001/saved-posts")
        return response.data
    } catch (error) {
        throw error
    }
}

// News API
export const fetchNews = async () => {
    try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=01ce040548c3439688b75813bd12c836")
        return response.data
    } catch (error) {
        throw error
    }
}


