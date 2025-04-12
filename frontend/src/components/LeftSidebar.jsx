import React from "react";
// import logo from "../assets/logo-color.png";
import logo from "../assets/logo-no-background - Copy.png";
import { IoMdHome, IoMdBookmark, IoMdSettings } from "react-icons/io";
import {
  MdOutlineExplore,
  MdNotificationsActive,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <>
      <div className="w-[20%] flex flex-col pr-5 ">
        <div className="flex flex-col justify-center ml-5 mt-1">
          <img className="w-20" src={logo} alt="logo" />
        </div>
        <div className="mt-4 h-full flex flex-col justify-between">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold" : "hover:bg-gray-200"
                }`
              }
            >
              <IoMdHome size="24px" />
              <h1 className="font-bold text-lg">Home</h1>
            </NavLink>

            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold" : "hover:bg-gray-200"
                }`
              }
            >
              <MdOutlineExplore size="24px" />
              <h1 className="font-bold text-lg">Explore</h1>
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold" : "hover:bg-gray-200"
                }`
              }
            >
              <MdNotificationsActive size="24px" />
              <h1 className="font-bold text-lg">Notifications</h1>
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold " : "hover:bg-gray-200"
                }`
              }
            >
              <PiChatsCircleDuotone size="24px" />
              <h1 className="font-bold text-lg">Messages</h1>
            </NavLink>

            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold " : "hover:bg-gray-200"
                }`
              }
            >
              <IoMdBookmark size="24px" />
              <h1 className="font-bold text-lg">Bookmarks</h1>
            </NavLink>

            <button className="px-4 py-2 mt-2 border-none text-md bg-blue-950 w-full rounded-full text-white font-bold">
              Post
            </button>
          </div>
          <div>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold" : "hover:bg-gray-200"
                }`
              }
            >
              <CgProfile size="24px" />
              <h1 className="font-bold text-lg">Profile</h1>
            </NavLink>

            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `flex items-center my-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold" : "hover:bg-gray-200"
                }`
              }
            >
              <IoMdSettings size="24px" />
              <h1 className="font-bold text-lg">Setting</h1>
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center mt-2 gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  isActive ? "bg-blue-100 font-bold " : "hover:bg-gray-200"
                }`
              }
            >
              <MdOutlineLogout size="24px" />
              <h1 className="font-bold text-lg">Logout</h1>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
