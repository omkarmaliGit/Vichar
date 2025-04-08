import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Profile = () => {
  return (
    <div className="w-full">
      <div className="">
        <div className="flex items-center m-2 gap-2">
          <Link to={"/"}>
            <IoArrowBackCircleOutline size={36} />
          </Link>
          <div>
            <h1 className="font-bold text-sm">Omakr</h1>
            <p className="text-sm text-gray-500">10 posts</p>
          </div>
        </div>
        <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyaLOrbOHCW530SUaJ6GrHdzO3lwfyvyJ_iewHJhWGWzHD1NC3XAkUpZjEFbLyxrWFQfw&usqp=CAU')] bg-cover bg-center bg-no-repeat h-72"></div>
        <div className="w-full flex h-32">
          <div className="px-10 relative -top-24">
            <div className="p-1 bg-white inline-block rounded-full">
              <Avatar
                name={"Sneha Reddy"}
                imageUrl={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgufd6O_cyhVZrKhqOcv4Ew2c-IYGcIr8KL5u9Gg3Mt4OqY8v5-l6-pbwdftTGonX162c&usqp=CAU"
                }
                size={200}
              />
            </div>
          </div>
          <div className="pt-5 w-[50%]">
            <h1 className="font-bold text-2xl">Sneha Reddy</h1>
            <p className="text-gray-500 ">@senhareddyvichar</p>
          </div>
          <div className="pt-7">
            <button className="border-gray-500 border rounded-full px-4 py-1 hover:bg-gray-200">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="px-8">
          <h1 className="font-bold">headline</h1>
          <p>Lorem ipsum dolor sit, Doloremque, fugit!</p>
          <p>Lorem it Lorem, ipsum dolor amet.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
