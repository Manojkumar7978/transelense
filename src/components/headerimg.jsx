import React from 'react'
import image from '../assets/headerImg.jpeg'
import logo from '../assets/logo.jpeg'

export default function Haderimg() {
  return (
    <div className='header_img_container'>
    <img alt='header_img' src={image} />
    <div className='header_heading'>
        <h1>Partner With Us</h1>
        <p>Be our partner in just few steps and start Increasing your reach by gaining new customers.</p>
    </div>
<div>
<img alt='header_logo' className='header_logo' src={logo}/>
</div>
    </div>
  )
}
