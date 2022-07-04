import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

// key: resolution, value: num Pics
const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

function MasonryLayout({ pins, setReload }) {
  return (
    <div>
      <Masonry
        className="relative flex animate-slide-fwd"
        breakpointCols={breakpointObj}
      >
        {pins?.map((pin, index) => {
          return (
            <Pin
              key={pin._id}
              pin={pin}
              className="w-max"
              index={index}
              setReload={setReload}
            />
          );
        })}
      </Masonry>
    </div>
  );
}

export default MasonryLayout;
