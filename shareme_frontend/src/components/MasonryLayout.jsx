import React from "react";
import { useState } from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import { useParams } from "react-router-dom";
import {IoMdSwitch} from 'react-icons/io';
import FloatSortBy from "./FloatSortBy";

const isActiveStyle = "flex justify-center items-center w-10 h-10 rounded-full bg-black text-white"
const isNotActiveStyle = "flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-200"

// key: resolution, value: num Pics
const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const sortBy =[
  {
      name: 'A to Z',
      fields: 'title',
      isChecked: false
  },
  {
      name: 'Most recently created',
      fields: '_createdAt',
      isChecked: true
  },
  {
      name: 'Most view',
      fields: 'views',
      isChecked: false
  },
  {
      name: 'Most download',
      fields: 'downloads',
      isChecked: false
  },
]

function MasonryLayout({ pins, setReload, setSortBy}) {
  const [isActive, setisActive] = useState(false);
  const [checkSortBy, setCheckSortBy] = useState([...sortBy])
  const {pinId} = useParams()
  
  const handleSortBy = (s) => {
    setCheckSortBy(prevCheck => prevCheck.map(sB =>{
      if(sB.name === s){
        setSortBy(sB.fields)
        return {...sB, isChecked: !sB.isChecked}
      }
      else 
      {return {...sB, isChecked:false}}
    }))
  }

  return (
    <div 
     onWheel={()=>setisActive(false)}
    >
      {pinId=== undefined && (
        <div className={isActive ? isActiveStyle : isNotActiveStyle}
        onClick={()=>setisActive(!isActive)}
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
      <Masonry className="relative flex animate-slide-fwd" breakpointCols={breakpointObj}>
      
        {pins?.map((pin, index) => {
          return <Pin key={pin._id} pin={pin} className="w-max" index={index} setReload={setReload}/> // change
        })}
      </Masonry>
    </div>
  );
}

export default MasonryLayout;
