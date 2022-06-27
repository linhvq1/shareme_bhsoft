import React, {useState, useEffect} from 'react'
// mot loai tronh router
// no tra ve 1 object cua params dong tu URL hien tai, cai ma no match voi route
import {useParams} from 'react-router-dom'
import {client} from '../client'

//cai layout giup cho may cai anh no so le y, nhin dep mat lam :))
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

function Feed() {
  return (
    <div>Feed</div>
  )
}

export default Feed