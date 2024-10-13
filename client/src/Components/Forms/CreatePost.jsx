import React, {useState} from 'react'
import { X } from 'phosphor-react'


export default function CreatePost({submitPost, toggleFormVisibility}) {

    const [postText, setPostText] = useState("")
    const handlePostSubmit = (e) => {
        e.preventDefault()
        submitPost(postText)
        toggleFormVisibility()
    }
    const maxChar = 300
   

  return (
    <div className="create-post-overlay">
        <form className="create-post-form" onSubmit={handlePostSubmit}>
            <button onClick={toggleFormVisibility} type="button" className="exit-create-btn"><X/></button>
            <textarea 
                type="text" 
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                maxLength={300}
                required
            />
            <p className="char-count">
                    {postText.length} / {maxChar}
                </p>
            <div className="create-post-btns">
                <button type="submit">Post</button>
            </div>
        </form>
    </div>
  )
}
