import React, { useState } from "react";
import Avatar from "./Avatar";
import { GoBookmark, GoHeart, GoComment } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { BsSend, BsDot } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import axios from "axios";
import { VICHAR_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../../redux/vicharSlice";

const Vichar = ({ vichar, imageUrl }) => {
  const [imgError, setImgError] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

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
        dispatch(getRefresh());
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
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(getRefresh());
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex m-4">
        <Avatar
          name="Omkar Mali"
          imageUrl="https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Jan/12/blog_images/e46601974389fe0cab04c746fe55c4cf.jpg"
          size={50}
        />
        <div className="ml-4 w-[90%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <h1 className="font-bold">{vichar?.userDetails[0]?.name}</h1>
              <p className="text-gray-700 text-sm ml-1">{`@${vichar?.userDetails[0]?.username}`}</p>
              <BsDot className="pt-1" />
              <p className="text-gray-500 text-xs ml-1">{formattedDate}</p>
            </div>
            <div>
              <IoIosMore size={24} />
            </div>
          </div>
          <div className="mt-5 w-[92%]">
            {!imgError && imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover border rounded-xl"
                onError={() => setImgError(true)}
              />
            ) : (
              ""
            )}
          </div>
          <div className="min-h-5 mt-3 mb-4 mx-auto">
            <p>{vichar?.description}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div
                onClick={() => likeOrDislikeHandler(vichar?._id)}
                className="p-2 hover:bg-pink-100 hover:text-pink-700 rounded-full cursor-pointer "
              >
                <GoHeart size={24} />
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
              <div className="p-2 hover:bg-blue-100 hover:text-blue-700 rounded-full cursor-pointer">
                <GoBookmark size={24} />
              </div>
              <p className="text-gray-500">0 bookmarks</p>
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
