import React from 'react'
import {ArrowCircleLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

export default function GenericPage({children, headerTitle, pageId}) {
    const navigate = useNavigate()
  return (
    <div className="page" id={pageId}>
        <header className="page-header">
            <button 
                type="button"
                onClick={() => navigate(-1)}
            >
                <ArrowCircleLeft size={"2em"}/>
            </button>
            <h4>{headerTitle}</h4>
        </header>
        {children}
    </div>
  )
}
