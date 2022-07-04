import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";

import { categories, getAssetPinDetailQuery, pinDetailQuery } from "../utils/data";
import Switch from "./Switch";

function CreatePin({ user }) {
  const [pin, setPin] = useState(null)
  const {pinId} = useParams()
  const [assetPin, setAssetPin] = useState(null)
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [publicPin, setPublicPin] = useState(true) 
  
  useEffect(() => {
    if(pinId){
      client.fetch(pinDetailQuery(pinId))
      .then((data)=>{
        setPin(data[0])
        setTitle(data[0].title)
        setAbout(data[0].about)
        setDestination(data[0].destination)
        setCategory(data[0].category)
        setPublicPin(data[0].publicPin)
        setImageAsset(data[0].image.asset)
      })

      client.fetch(getAssetPinDetailQuery(pinId))
      .then(data => {
        setAssetPin(data[0].image.asset)
      })
    }
  }, [])


  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error", error);
        });
    } else setWrongImageType(true);
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title, // neu key va value giong nhau thi chi can viet 1 cai thoi
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
        views: 0,
        downloads: 0,
        publicPin: publicPin? publicPin: false,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };


  const updatePin = ()=>{
    if (title && about && destination && category) {
      const doc = {
        _type: "pin",
        title, // neu key va value giong nhau thi chi can viet 1 cai thoi
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: assetPin?._ref,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
        views: pin?.views,
        downloads: pin?.downloads,
        publicPin: publicPin,
      };
      console.log(doc)
      client.patch(pinId).set(doc).commit().then(() => {
          navigate("/");
        });
      // client.createOrReplace(doc).then(() => {
      //   navigate("/");
      // });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  }

  
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full ">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full ">
          <div className="flex justify-center items-center flex-col border-2 border-1 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}

            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, PNG, GIF or less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="upload-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md translate-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                alt="user-pic"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-lg">
                Choose pin category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-grat-200 rounded-md cursor-pointer"
                value={category? category:""}
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories.map((category,i) => (
                  <option
                    key={i}
                    value={category.name}
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-4 mt-6 items-center">
              <p className="font-semibold text-lg sm:text-lg">Public for everyone?</p>
             <Switch publicPin={publicPin} setPublicPin={setPublicPin}/>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={pinId?updatePin: savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                {pinId?'Update Pin': 'Save Pin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePin;
