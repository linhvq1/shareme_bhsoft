import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";
import { feedQuery } from "../utils/data";

// {postedBy, image, _id, destination, }
function Pin({
  pin: { postedBy, image, _id, destination, save },
  index,
  handleViews,
  setReload
}) {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user.sub)
    ?.length;
  // neu nhu muon lay ra 1 trong [1,2,3] ->[1].length ->tuc la co so 1 va do dai tra ve la 1
  // -> !1 -> false -> !false -> true co nghia la da luu

  //nguoc lai muon lay ra 4 trong [1,2,3] ->[].length ->va mag tra ve k co so nap tuc la do dai tra ve la 0
  // -> !0 -> true -> !true -> false tuc la chua luu cai nao

  // muc dich cua cai nay la de luu lai state
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          //window.location.reload();
          setReload(true) // change
        });
    }
  };

  const unSave = (id) => {
    const toRemove = [`save[userId=="${user?.sub}"]`];
    client
      .patch(id)
      .unset(toRemove)
      .commit()
      .then(() => {
        //window.location.reload();
         setReload(true) // change
      });
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  const handleOnClickPins = (id) => {
    client.patch(id).setIfMissing({ views: 0 }).inc({ views: 1 }).commit();
  };
  return (
    <div className="m-2" onClick={() => handleOnClickPins(_id)}>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          navigate(`/pin-detail/${_id}`);
        }}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          src={urlFor(image).width(250).url()}
          alt="user post"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pr-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  //Phương thức stopPropagation() của đối tượng event được sử dụng để ngăn không cho sự kiện lan toả lên các phần tử mẹ của phần tử mà ở đó diễn ra sự kiện.
                  // binh thuong k co cai method nay thi khi nhan no se bay sag ben pindetail
                  onClick={(e) => {
                    client
                      .patch(_id)
                      .setIfMissing({ downloads: 0 })
                      .inc({ downloads: 1 })
                      .commit();
                    e.stopPropagation();
                   
                  }}
                  className="bg-white w-9 h-9 flex justify-center items-center rounded-full text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    unSave(_id);
                  }}
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? `${destination.slice(8, 17)}...`
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
}

export default Pin;
