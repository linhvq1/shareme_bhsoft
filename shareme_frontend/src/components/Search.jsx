import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery, sortBy } from "../utils/data";
import Spinner from "./Spinner";
import { IoMdSwitch } from "react-icons/io";
import FloatSortBy from "./FloatSortBy";
import { useParams } from "react-router-dom";

const isActiveStyle =
  "flex justify-center items-center w-10 h-10 rounded-full bg-black text-white";
const isNotActiveStyle =
  "flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-200";

function Search({ searchTerm }) {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  const [reloadPin, setReloadPin] = useState(false);
  const [sortedBy, setSortedBy] = useState("_createdAt");

  const [isActive, setIsActive] = useState(false);
  const [checkSortBy, setCheckSortBy] = useState([...sortBy]);
  const { pinId } = useParams();

  const handleSortBy = (s) => {
    setCheckSortBy((prevCheck) =>
      prevCheck.map((sB) => {
        if (sB.name === s) {
          setSortedBy(sB.fields);
          return { ...sB, isChecked: !sB.isChecked };
        } else {
          return { ...sB, isChecked: false };
        }
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    let query = searchTerm
      ? searchQuery(searchTerm.toLowerCase(), sortedBy)
      : feedQuery(sortedBy);

    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
      setReloadPin(false);
    });
  }, [searchTerm, reloadPin, sortedBy]);

  return (
    <div>
      {loading && <Spinner message="Searching for pins..." />}
      {pins?.length !== 0 && (
        <div onWheel={() => setIsActive(false)}>
          {pins && (
            <div>
              {pinId === undefined && (
                <div
                  className={isActive ? isActiveStyle : isNotActiveStyle}
                  onClick={() => setIsActive(!isActive)}
                >
                  <IoMdSwitch className="text-3xl" />
                  {isActive && (
                    <div
                      className="absolute flex flex-col shadow-xl shadow-gray-700 bg-white text-black mt-56 ml-56 z-50 p-3 rounded-lg"
                      style={{ width: "270px", height: "auto" }}
                    >
                      <p className="text-sm">Sort by</p>
                      <div className="flex flex-col font-bold text-lg">
                        {checkSortBy.map((items, i) => (
                          <FloatSortBy
                            key={i}
                            name={items.name}
                            isChecked={items.isChecked}
                            handleSortBy={handleSortBy}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <MasonryLayout pins={pins} setReload={setReloadPin} />
            </div>
          )}
        </div>
      )}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found!</div>
      )}
    </div>
  );
}

export default Search;
