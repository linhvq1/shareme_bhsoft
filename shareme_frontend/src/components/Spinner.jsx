import React from 'react'
import {BallTriangle} from 'react-loader-spinner'

function Spinner(props) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <BallTriangle
            color="#00BFFF"
            height={50}
            width={200}
            className='m-5'
        />
        <p className='text-lg text-center px-2'>{props.message}</p>
    </div>
  )
}

export default Spinner