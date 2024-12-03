import React from 'react'
import { Info } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export default function InfoLinks() {
  return (
    <section className="info-links">
        <div className="info-about">
            <Info className="info-icon" weight="fill"/>
            <NavLink>About</NavLink>
        </div>
        <div className="info-gh">
            <img
                className='info-icon'
                src='/github-logo-fill.svg'
            />
            <a href="https://github.com/choijake0207/EchoV1">Github</a>
        </div>      
    </section>
  )
}
