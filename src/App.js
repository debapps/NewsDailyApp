import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import NewsPlane from './components/NewsPlane'


export default function App () {

  // Get the environment veriables.  
  const API_KEY = process.env.REACT_APP_NEWS_KEY;
  const NEWS_COUNT = parseInt(process.env.REACT_APP_NEWS_COUNT);

  // Query String hook.
  const [queryStr, setQueryStr] = useState(" ");


  const setQueryString = (querySTR) => {
    setQueryStr(querySTR);
  }

  return (
    <>
      <Navbar queryStr={setQueryString}/>
      <Routes>
        <Route path="/" element={<NewsPlane key="general"
                                            apiKey={API_KEY}
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="general" />} />
        <Route path="/business" element={<NewsPlane key="business"
                                            apiKey={API_KEY} 
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="business" />} />
        <Route path="/entertainment" element={<NewsPlane key="entertainment"
                                            apiKey={API_KEY}
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="entertainment" />} />
        <Route path="/sports" element={<NewsPlane key="sports"
                                            apiKey={API_KEY}
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="sports" />} />  
        <Route path="/health" element={<NewsPlane key="health" 
                                            apiKey={API_KEY} 
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="health" />} />
        <Route path="/science" element={<NewsPlane key="science"
                                            apiKey={API_KEY} 
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="science" />} />  
        <Route path="/technology" element={<NewsPlane key="technology"
                                            apiKey={API_KEY}
                                            newsCount={NEWS_COUNT} 
                                            country="in"
                                            category="technology" />} /> 
        <Route path="/search" element={<NewsPlane key={queryStr}
                                            apiKey={API_KEY}
                                            newsCount={NEWS_COUNT} 
                                            querySTR={queryStr} />} />                                                            
      </Routes>
      <Footer />
    </>
  )
}

