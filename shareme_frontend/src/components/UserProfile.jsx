import React, {useState, useEffect} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useParams, useNavigate} from 'react-router-dom'

import {sortBy, userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/data.js'
import { client } from '../client'
import {fetchUser} from '../utils/fetchUser.js'

import MasonryLayout from './MasonryLayout.jsx'
import Spinner from './Spinner.jsx'
import { IoMdSwitch } from 'react-icons/io'
import FloatSortBy from './FloatSortBy.jsx'

const randomImage = 'https://source.unsplash.com/1600x900/?nature,phography,technology'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

const isActiveStyleFloatBtn = "flex justify-center items-center w-10 h-10 rounded-full bg-black text-white"
const isNotActiveStyleFloatBtn = "flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-200"

function UserProfile() {

  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created') // create or save
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const {userId} = useParams()
  const [reloadPin, setReloadPin] = useState(false);
  const [sortedBy, setSortedBy] = useState('_createdAt')
  
  const [isActive, setIsActive] = useState(false);
  const [checkSortBy, setCheckSortBy] = useState([...sortBy])
  
  const handleSortBy = (s) => {
    setCheckSortBy(prevCheck => prevCheck.map(sB =>{
      if(sB.name === s){
        setSortedBy(sB.fields)
        return {...sB, isChecked: !sB.isChecked}
      }
      else 
      {return {...sB, isChecked:false}}
    }))
  }

  useEffect(() => {
    const query = userQuery(userId)

    client.fetch(query)
      .then((data)=>{
        setUser(data[0])
      })
  }, [userId])

  useEffect(() => {
    let query = text === "Created"? userCreatedPinsQuery(userId,sortedBy) :userSavedPinsQuery(userId,sortedBy)
    client.fetch(query)
      .then((data)=>{
        setPins(data)
        setReloadPin(false)
      })
  }, [text, userId,reloadPin,sortedBy])
  
  
  const logout = ()=>{
    localStorage.clear()
    navigate('/login')
  }

  if(!user) return <Spinner message="Loading profile..."/>

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img 
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner"
            />
            <img className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover' 
            src={user.image}
            alt="user-profile"
            />
            <h1 className="font-bold text-3xl text-center mt-3">{user.userName}</h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === fetchUser()?.sub && (
                <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={logout}
                //disabled={renderProps.disabled}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
              )}
            </div>
          </div>
          <div className='text-center mb-7 mt-3'>
              <button
                type="button"
                onClick={(e)=>{
                  setText(e.target.textContent)
                  setActiveBtn('created')
                }}
                className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e)=>{
                  setText(e.target.textContent)
                  setActiveBtn('saved')
                }}
                className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Saved
              </button>
          </div>
          {pins?.length ? (    
              <div className='px-2'>
                
                <div className={isActive ? isActiveStyleFloatBtn : isNotActiveStyleFloatBtn}
                onClick={()=>setIsActive(!isActive)}
                >
                  <IoMdSwitch className="text-3xl"/>
                  {isActive && (
                    <div className="absolute flex flex-col shadow-xl shadow-gray-700 bg-white text-black mt-56 ml-56 z-50 p-3 rounded-lg"
                      style={{width:'270px', height:'auto'}}
                    >
                      <p className="text-sm">Sort by</p>
                      <div className="flex flex-col font-bold text-lg">
                        {checkSortBy.map((items,i) => (
                          <FloatSortBy key={i} name={items.name} isChecked={items.isChecked} handleSortBy={handleSortBy}/>
                        ))
                          }
                      </div>
                    </div>
                  )}
                </div>
                
                <MasonryLayout pins={pins} setReload={(e)=>setReloadPin(e)}/>
              </div>
          ):(
            <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile