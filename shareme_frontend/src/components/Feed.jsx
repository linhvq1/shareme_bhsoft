import React, { useState, useEffect } from "react";
// mot loai tronh router
// no tra ve 1 object cua params dong tu URL hien tai, cai ma no match voi route
import { useParams } from "react-router-dom";
import { client } from "../client";
import { searchQuery } from "../utils/data";
import { feedQuery } from "../utils/data";

//cai layout giup cho may cai anh no so le y, nhin dep mat lam :))
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

function Feed() {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState([]);
  const [reloadPin, setReloadPin] = useState(false);
  const [sortedBy, setSortedBy] = useState('_createdAt')
  // const query = categoryId ? searchQuery(categoryId) : feedQuery;
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
  return <div>{pins && <MasonryLayout pins={pins} setReload={setReloadPin} setSortBy={setSortedBy}/>}</div> //change
}

export default Feed;
