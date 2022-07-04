import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import {Navbar, Feed, PinDetail, CreatePin, Search} from '../components'


function Pins(props) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm = {searchTerm} setSearchTerm={setSearchTerm} user={props.user}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />}/>
          <Route path='/category/:categoryId' element={<Feed />}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail user={props.user} />}/>
          <Route path='/create-pin' element={<CreatePin user={props.user}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
          <Route path='*' 
            element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>}
          />
        </Routes>
      </div>
    </div>
  )
}

export default Pins