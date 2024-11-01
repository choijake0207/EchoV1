import React, { useRef, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Trash, UserCircle, BookmarkSimple } from 'phosphor-react'
import { savePost } from '../../Api/POST'

export default function PostModalMenu({onClose, handleDelete, auth, userId, username, savePost}) {
  

  const modalRef = useRef(null)
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return (() => document.removeEventListener("mousedown", handleOutsideClick))
  },[])
  const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose()
      }
    }
  return (
    <div className="post-modal-menu" ref={modalRef} onClick={onClose}>
        <NavLink to={`/profile/${username}`}>
          <UserCircle/>View {username}'s Profile
        </NavLink>
        <button onClick={savePost}>
          <BookmarkSimple/>Save Post
        </button>
        {auth.id === userId && 
          <button onClick={handleDelete}><Trash/>Delete Post</button>
        }
    </div>
  )
}
