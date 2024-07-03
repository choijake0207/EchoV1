import axios from "axios";
// axios delete function only takes 2 arguments
export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/post/${id}`,  {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}