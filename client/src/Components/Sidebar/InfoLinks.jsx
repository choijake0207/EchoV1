import React from 'react'
import { Info } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export default function InfoLinks() {
  return (
    <div className="info-links">
        <div className="creator-about">
            <Info className="creator-icon" weight="fill"/>
            <NavLink>About</NavLink>
        </div>
        <div className="creator-gh">
            <img
                className='creator-icon'
                src='/github-logo-fill.svg'
            />
            <a href="https://github.com/choijake0207/EchoV1">Github</a>
        </div>      
    </div>
  )
}
