import React from 'react'
import aeroplane from '../../../assets/pictures/aeroplane.png'
import plane from '../../../assets/pictures/plane.png'
import nature from '../../../assets/pictures/nature.mp4'
import city_sky from '../../../assets/pictures/city-sky.mp4'

import './VideoHeader.css'

export const VideoHeader = () => {
  return (
    <div className='video-header'>
      <div className='text'>Create Ever-lasting Memories With Us</div>
        <div className='video-section'>
            <video src={city_sky} autoPlay muted loop></video>
        </div>
        <img src={plane} className='picture-section' />
    </div>
  )
}

export default VideoHeader