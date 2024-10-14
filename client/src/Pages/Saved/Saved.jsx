import React , {useState, useEffect} from 'react'
import GenericPage from "../../Layouts/GenericPage"
import { fetchSavedPosts } from '../../Api/GET'
import Post from '../../Components/Post/Post'
import { useAuthorize } from '../../Context/AuthContext'

export default function Saved() {
    const [savedPosts, setSavedPosts] = useState([])
    const {authorizeState} = useAuthorize()

    useEffect(() => {
        const handleFetchSavedPosts = async () => {
            try {
                const response = await fetchSavedPosts()
                setSavedPosts(response)
                console.log(response)
            } catch (error) {
                console.log(error.response.data.error)
            }
        }
        handleFetchSavedPosts()
    }, [])





  return (
    <GenericPage headerTitle="Saved Posts" pageId="saved-page">
        <ul className="saved-posts">
            {savedPosts && savedPosts.map(post => {
                return (
                    <Post
                        key={post.id}
                        id={post.id}
                        text={post.text}
                        createdAt={post.createdAt}
                        userId={post.userId}
                        username={post.username}
                        comments={post.Comments}
                        isSaved={post.SavedPosts.some(obj => obj.userId === authorizeState.id)}
                        isHomeView={true}
                    />
                )
            })}
        </ul>

    </GenericPage>
  )
}
