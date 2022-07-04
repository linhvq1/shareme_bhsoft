import React, { useState, useEffect } from "react";
import { IoMdSwitch } from "react-icons/io";
// mot loai tronh router
// no tra ve 1 object cua params dong tu URL hien tai, cai ma no match voi route
import { useParams } from "react-router-dom";
import { client } from "../client";
import { searchQuery, sortBy } from "../utils/data";
import { feedQuery } from "../utils/data";
import FloatSortBy from "./FloatSortBy";

//cai layout giup cho may cai anh no so le y, nhin dep mat lam :))
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const isActiveStyle = "flex justify-center items-center w-10 h-10 rounded-full bg-black text-white"
const isNotActiveStyle = "flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-200"

function Feed() {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState([]);
  const [reloadPin, setReloadPin] = useState(false);
  const [sortedBy, setSortedBy] = useState('_createdAt')
  
  const [isActive, setIsActive] = useState(false);
  const [checkSortBy, setCheckSortBy] = useState([...sortBy])
  const {pinId} = useParams()
  
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
    if(!reloadPin) setLoading(true)
    const query = categoryId? searchQuery(categoryId,sortedBy) : feedQuery(sortedBy)
      client.fetch(query)
      .then((data)=>{
          setPins(data)
          setLoading(false)
          setReloadPin(false) // change
      })

  }, [categoryId, reloadPin,sortedBy])

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h2>No pins available</h2>;
  return (
    <div onWheel={()=>setIsActive(false)}>
      {pins && 
        (
          <div>
            {pinId=== undefined && (
            <div className={isActive ? isActiveStyle : isNotActiveStyle}
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
          )}
          <MasonryLayout pins={pins} setReload={setReloadPin}/>
          </div>
        )
      }
    </div>
  )
}

export default Feed;
