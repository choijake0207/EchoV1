import React, {useEffect, useState} from 'react'
import { fetchSinglePost } from '../Api/GET'
import { useParams } from 'react-router-dom'
import Post from '../Components/Post'

export default function SingleView() {
  const {id} = useParams()
  const [singlePost, setSinglePost] = useState(null)
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
      <Post
        id = {singlePost.id}
        username = {singlePost.username}
        text = {singlePost.text}
        createdAt={singlePost.createdAt}
      />

    </div>
  )
}
