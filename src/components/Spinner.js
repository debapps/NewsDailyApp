import React from 'react'
import loadingImg from './images/loading.gif'

export default function Spinner() {
  return (
    <div className="text-center my-5">
        <img src={loadingImg} alt="Loading"/>
    </div>
  )
}
