import React, { memo, useEffect, useState } from 'react'
import {TrendUp} from "phosphor-react"
import { fetchNews } from '../../Api/GET'



export default function InfoContent() {

  const [news, setNews] = useState([])

  useEffect(() => {
    const handleFetchNews = async () => {

      const memoizedNews = localStorage.getItem("memoizedNews")
      const memoizedTime = localStorage.getItem("memoizedTime")
      const now = new Date().getTime()

      if (memoizedNews && memoizedTime && now - memoizedTime < 86400000) {
        setNews(JSON.parse(memoizedNews))
      } else {
        try {
          const response = await fetchNews()
          console.log("news fetch called")
          setNews(response.articles.slice(0,5))
          localStorage.setItem("memoizedNews", JSON.stringify(response.articles.slice(0,3)))
          localStorage.setItem("memoizedTime", now.toString())
          console.log(response)
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
    }
    handleFetchNews()
  }, []) 

  return (
    <section className="info-content">

      <h4>Trending Topics <TrendUp size="1.25em"/></h4>
      <ul className="news-feed">
        {news.map((article, index) => {
          return (
            <li className="news-article" key={index}>
              <a href={article.url}>{article.title.slice(0, article.title.indexOf("-"))}</a>
              <p>{article.source.name}</p>
            </li>
          )
        })}
      </ul>
      
    </section>
  )
}
