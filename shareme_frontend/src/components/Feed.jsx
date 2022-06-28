import React, {useState, useEffect} from 'react'
// mot loai tronh router
// no tra ve 1 object cua params dong tu URL hien tai, cai ma no match voi route
import {useParams} from 'react-router-dom'
import {client} from '../client'
import { searchQuery } from '../utils/data'
import { feedQuery } from '../utils/data'

//cai layout giup cho may cai anh no so le y, nhin dep mat lam :))
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

function Feed() {
    const [loading, setLoading] = useState(false)
    const {categoryId} = useParams()
    const [pins, setPins] = useState(null)

    useEffect(() => {
      setLoading(true)
      if(categoryId){
        const query = searchQuery(categoryId)

        client.fetch(query)
        .then((data)=>{
            setPins(data)
            setLoading(false)
        })
      }else{
        client.fetch(feedQuery)
        .then((data)=>{ 
            setPins(data) 
            setLoading(false)
        })
      }
    }, [categoryId])
    

    if(loading) return <Spinner message="We are adding new ideas to your feed!" />

  return (
    <div>
        {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed