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
  const query = categoryId ? searchQuery(categoryId) : feedQuery;
  async function fetchData() {
    const result = await client.fetch(query);
    setPins(result);
  }
  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [categoryId, fetchData]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

<<<<<<< HEAD
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
=======
    if(loading) return <Spinner message="We are adding new ideas to your feed!" />

    if(!pins?.length) return <h2>No pins available</h2>
  return (
    <div>
        {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
>>>>>>> 44f5f2a598e4c19808303ededd7de311dfde4154
}

export default Feed;
