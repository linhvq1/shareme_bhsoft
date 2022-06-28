import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

// key: resolution, value: num Pics 
const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

function MasonryLayout(props) {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {props.pins?.map((items)=> <Pin key={items._id} pin={items} className="w-max"/>)}
    </Masonry>
  )
}

export default MasonryLayout