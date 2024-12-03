import React from 'react'
import { Pen } from 'phosphor-react'
export default function InfoCreator() {
  return (
    <section className="info-creator">
      <h4>Creator's Note <Pen size="1.25em"/> </h4>
      <p className="creator-summary">
        Echo is a full stack application built with React.js, Express, Node.js, and MySQL.
        More features to be added soon!
      </p>
     
    </section>
  )
}
