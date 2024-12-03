import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./post.css"
import { useAuthorize } from '../../Context/AuthContext'
import { deletePost } from '../../Api/DELETE'
import { savePost } from '../../Api/POST'
import {HeartStraight, BookmarkSimple, ChatCircle, DotsThree} from "phosphor-react"
import UserIcon from '../UserIcon/UserIcon'
import { formatDate } from '../../Utility/FormatDate'
import PostModalMenu from '../PopUps/PostModalMenu'


function PostHeader ({username, auth, handleDelete, userId, createdAt, savePost, isSaved}) {
    const formattedDate = formatDate(createdAt)
    const [showPostModal, setShowPostModal] = useState(false)
  return (
    <header className="post-header">
      {showPostModal && 
        <PostModalMenu
          onClose={() => setShowPostModal(false)}
          handleDelete={handleDelete}
          auth={auth}
          userId={userId}
          username={username}
          savePost={savePost}
          isSaved={isSaved}
        />
      }
      
      <NavLink className="username" to={`/profile/${username}`}>
        <UserIcon username={username}/>
        <div className="username-date">
          <p>{username}</p>
          <p className="date">{formattedDate}</p>
        </div>
        
      </NavLink>
      <button className="post-modal-btn" onClick={() => setShowPostModal(true)}> 
        <DotsThree/>
      </button>
      {/* {userId === auth.id ? (
        <button
          onClick={handleDelete}
          className="delete-post-btn"
        >
          <DotsThree/>
        </button>
      ) : 
        <DotsThree/>
      } */}
    </header>
  )
}

function PostContent ({id, createdAt, text, navigate}) {

  return (
    <div className="post-content">
      <p className="text" onClick={() => navigate(`/post/${id}`)}>{text}</p>
    </div>
  )
}

function PostDetails ({isHomeView, id, comments, navigate, savePost, isSaved, auth}) {
  const [saveStatus, setSaveStatus] = useState(isSaved)

  const optimisticSave = async () => {
    const optimisticStatus = !saveStatus
    setSaveStatus(optimisticStatus)
    try {
      await savePost()
    } catch (error) {
      console.log(error.response.data.error)
      setSaveStatus(!optimisticStatus)
    }
  }

  return (
    <div className="post-details">
      <div className="post-likes">
        <button type="button"><HeartStraight/>
          <p>0</p>
        </button>
      </div>
      <div className="post-comments">
        <button onClick={isHomeView ? () => navigate(`/post/${id}`) : null}>
          <ChatCircle/>
          <p>{comments.length}</p>
        </button>
      </div>
      <div className="post-save">
        <button type="button" onClick={auth.authStatus ? optimisticSave : null}>
          <BookmarkSimple weight={saveStatus ? "fill" :  null}/>
        </button>
      </div>
    </div>
  )
}

export default function Post({id, username, text, createdAt, userId, onDelete, comments, isHomeView, isSaved}) {
  const navigate = useNavigate()
  const {authorizeState} = useAuthorize()
  const handleDelete = async () => {
    try {
      await deletePost(id)
      if (onDelete) {
        onDelete(id)
      }
      navigate("/")
    } catch (error) {
      console.log(error.response.data.error)
    }
  }
  const handleSave = async () => {
    try {
      await savePost(id)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <li className="post">
        <PostHeader 
          username={username} 
          auth={authorizeState} 
          handleDelete={handleDelete} 
          userId={userId}
          createdAt={createdAt} 
          savePost={handleSave}
          isSaved={isSaved}

        />
        <PostContent 
          id={id} 
          text={text}
          navigate={navigate}
        />
        <PostDetails
          isHomeView={isHomeView}
          id={id}
          comments={comments}
          navigate={navigate}
          savePost={handleSave}
          isSaved={isSaved}
          auth={authorizeState}
        />
    </li>
  )
}
