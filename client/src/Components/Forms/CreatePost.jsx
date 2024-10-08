import React, {useState} from 'react'
import { X } from 'phosphor-react'


export default function CreatePost({submitPost, toggleFormVisibility}) {

    const [postText, setPostText] = useState("")
    const handlePostSubmit = (e) => {
        e.preventDefault()
        submitPost(postText)
        toggleFormVisibility()
    }
   

  return (
    <div className="create-post-overlay">
        <form className="create-post-form" onSubmit={handlePostSubmit}>
            <button onClick={toggleFormVisibility} type="button"><X/></button>
            <textarea 
                type="text" 
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <button type="submit">Post</button>
        </form>
    </div>
  )
}
