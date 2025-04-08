import React from "react";
import Avatar from "./Avatar";
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">For You</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                name="Omkar Mali"
                imageUrl="https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Jan/12/blog_images/e46601974389fe0cab04c746fe55c4cf.jpg"
                size={50}
              />
            </div>
            <input
              className="w-full outline-none border-none text-lg ml-4"
              type="text"
              placeholder="What is happening?"
            />
          </div>
          <div className="flex items-center justify-between px-6 pt-2 p-4 border-b border-gray-300">
            <div className="flex items-center">
              <CiImageOn size="28px" />
            </div>
            <button className="bg-blue-950 px-4 py-1 text-lg border-none rounded-full text-white">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
