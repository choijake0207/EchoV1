import React from 'react'
import { Info } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
export default function InfoCreator() {
  return (
    <section className="info-creator">
      <h4>Creator's Note</h4>
      <p className="creator-summary">
        Echo is a full stack application built with React.js, Express, Node.js, and MySQL.
        More features to be added soon!
      </p>
     
    </section>
  )
}
