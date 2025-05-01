import React, { useState } from "react";
import Avatar from "./Avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { VICHAR_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../../redux/vicharSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${VICHAR_API_END_POINT}/create`,
        {
          description,
          id: user?._id,
        },
        { withCredentials: true }
      );

      dispatch(getRefresh());

      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="flex items-center p-4">
        <div>
          <Avatar
            name="Omkar Mali"
            imageUrl="https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Jan/12/blog_images/e46601974389fe0cab04c746fe55c4cf.jpg"
            size={50}
          />
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full outline-none border-none text-lg ml-4 dark:bg-black dark:text-white dark:placeholder-gray-400"
          type="text"
          placeholder="What is happening?"
        />
      </div>
      <div className="flex items-center justify-between px-6 pt-2 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <CiImageOn size="28px" />
        </div>
        <button
          onClick={submitHandler}
          className="bg-blue-950 px-4 py-1 text-lg border-none rounded-full text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
