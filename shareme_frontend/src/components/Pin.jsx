import React from 'react'
import { urlFor } from '../client'

// {postedBy, image, _id, destination, }
function Pin(props) {
  return (
    <div>
        <img className='rounded-lg w-full' src={urlFor(props.pin.image).width(250).url()} alt="user post"/>
    </div>
  )
}

export default Pin