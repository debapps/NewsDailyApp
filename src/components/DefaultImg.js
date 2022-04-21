import React from 'react'
import defaultImg from './images/NewsDailyLogo.png'

export default function DefaultImg () {
  return (
    <img src={defaultImg} alt="Default" style={{maxHeight: "180px"}}/>
  )
}
