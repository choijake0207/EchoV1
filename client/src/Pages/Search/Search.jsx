import React, {useState, useEffect} from 'react'
import GenericPage from "../../Layouts/GenericPage"
import "./search.css"

export default function Search() {
  const [searchInput, setSearchInput] = useState("")




  return (
    <GenericPage headerTitle="Search" pageId="search-page">
      <section className="search-form">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        
      </section>
      
      <section className="search-results">
        <div className="results-filter">
          <button>Top</button>
          <button>Latest</button>
          <button>Accounts</button>
        </div>
        
      </section>
    </GenericPage>
  )
}
