import React, { useState } from "react";
import Avatar from "./Avatar";
import {
  GoBookmark,
  GoHeart,
  GoComment,
  GoHeartFill,
  GoBookmarkFill,
} from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { BsSend, BsDot } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import axios from "axios";
import { VICHAR_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefreshVichar } from "../../redux/vicharSlice";
import { Link } from "react-router-dom";
// import { getRefreshUser } from "../../redux/userSlice";

const Vichar = ({ vichar }) => {
  // const [imgError, setImgError] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  // Split by line breaks
  const lines = vichar?.description.split("\n");
  const shouldTruncate = lines.length > 5;
  const visibleLines = expanded ? lines : lines.slice(0, 5);

  const date = new Date(vichar?.createdAt);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${VICHAR_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        // console.log(vichar?.likes?.length);
        toast.success(res.data.message);
        dispatch(getRefreshVichar());
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.put(
        `${VICHAR_API_END_POINT}/bookmark/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        // console.log(vichar?.likes?.length);
        toast.success(res.data.message);
        dispatch(getRefreshVichar());
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${VICHAR_API_END_POINT}/delete/${id}`);
      // console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(getRefreshVichar());
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  // console.log(vichar?.userDetails[0]);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex m-4">
        <Link to={`/profile/${vichar?.userId}`}>
          <Avatar
            name={vichar?.userDetails[0]?.name}
            imageUrl={vichar?.userDetails[0]?.profileImage}
            size={50}
          />
        </Link>
        <div className="ml-4 w-[90%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <Link
                to={`/profile/${vichar?.userId}`}
                className="flex items-center gap-0.5"
              >
                <h1 className="font-bold">{vichar?.userDetails[0]?.name}</h1>
                <p className="text-gray-700 text-sm ml-1">{`@${vichar?.userDetails[0]?.username}`}</p>
              </Link>
              <BsDot className="pt-1" />
              <p className="text-gray-500 text-xs ml-1">{formattedDate}</p>
            </div>
            <div>
              <IoIosMore size={24} />
            </div>
          </div>
          <div className="mt-5 w-[92%]">
            {vichar.images?.length > 0 && (
              <div
                className={`mt-4 rounded overflow-hidden transition-all duration-300 ease-in-out ${
                  vichar.images.length === 1
                    ? "w-full"
                    : "grid grid-cols-1 sm:grid-cols-2 gap-1"
                }`}
              >
                {vichar.images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative group cursor-pointer overflow-hidden rounded transition-all duration-300 ease-in-out ${
                      vichar.images.length === 1
                        ? "w-full h-auto"
                        : hoveredIndex === null
                        ? ""
                        : hoveredIndex === index
                        ? "z-10 scale-125"
                        : "opacity-30 scale-75"
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={img}
                      alt={`media-${index}`}
                      className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
                        vichar.images.length === 1
                          ? "aspect-auto"
                          : "aspect-square sm:aspect-auto group-hover:scale-105"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="min-h-5 mt-3 mb-4 mx-auto">
            <p className="whitespace-pre-wrap">{visibleLines.join("\n")}</p>
            {shouldTruncate && (
              <button
                className="mt-2 text-blue-500 hover:underline"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div
                onClick={() => likeOrDislikeHandler(vichar?._id)}
                className="p-2 hover:bg-pink-100 hover:text-pink-700 rounded-full cursor-pointer transition-all duration-200"
              >
                {vichar?.likes?.includes(user?._id) ? (
                  <GoHeartFill size={24} className="text-pink-600" />
                ) : (
                  <GoHeart size={24} />
                )}
              </div>
              <p className="text-gray-500">{vichar?.likes?.length} likes</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2 hover:bg-green-100 hover:text-green-700 rounded-full cursor-pointer ">
                <GoComment size={24} />
              </div>
              <p className="text-gray-500">0 comments</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2 hover:bg-yellow-100 hover:text-yellow-700 rounded-full cursor-pointer">
                <BsSend size={20} />
              </div>
              <p className="text-gray-500">0 shares</p>
            </div>
            <div className="flex gap-2 items-center">
              <div
                onClick={() => bookmarkHandler(vichar?._id)}
                className="p-2 hover:bg-blue-100 hover:text-blue-700 rounded-full cursor-pointer"
              >
                {vichar?.bookmarks?.includes(user?._id) ? (
                  <GoBookmarkFill size={24} className="text-blue-600" />
                ) : (
                  <GoBookmark size={24} />
                )}
              </div>
              <p className="text-gray-500">
                {vichar?.bookmarks?.length} bookmarks
              </p>
            </div>
            {user?._id === vichar?.userId && (
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => deleteHandler(vichar?._id)}
                  className="p-2 hover:bg-red-100 hover:text-red-700 rounded-full cursor-pointer"
                >
                  <AiOutlineDelete size={24} />
                </div>
                {/* <p className="text-gray-500">0 bookmarks</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vichar;
