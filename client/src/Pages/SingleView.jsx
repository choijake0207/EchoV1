import React, {useEffect, useState} from 'react'
import { fetchSinglePost } from '../Api/GET'
import { useParams, useNavigate } from 'react-router-dom'
import Post from '../Components/Post'

export default function SingleView() {
  const {id} = useParams()
  const [singlePost, setSinglePost] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchSinglePost(id)
        setSinglePost(response)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchPost()
  }, [])



  return (
    <div className="page" id="single-post-page">
      <header className="page-header">
        <button type="button" onClick={() => navigate(-1)}>Exit</button>
      </header>
      {singlePost && (
        <Post
         id = {singlePost.id}
         username = {singlePost.username}
         text = {singlePost.text}
         createdAt={singlePost.createdAt}
        />
      )}
     

    </div>
  )
}
