import axios from "axios";

export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/post/${id}`, {}, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}