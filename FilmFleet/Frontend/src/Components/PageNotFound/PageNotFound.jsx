import React from 'react'
import image from "../../assets/404-Page.jpg"

const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center'>
      <img src={image} alt="404" className='w-full h-1/2'  />
    </div>
  )
}

export default PageNotFound
