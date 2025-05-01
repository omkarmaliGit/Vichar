import React, { useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetMyVichars from "../hooks/useGetMyVichars";
import useFollowingVichars from "../hooks/useFollowingVichars";

const Home = () => {
  const { user, otherUsers } = useSelector((store) => store.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useOtherUsers(user?._id);
  useGetMyVichars(user?._id);
  // console.log(user?._id);
  useFollowingVichars(user?._id);

  return (
    <div className="flex justify-between w-[100vw] h-[100vh] px-6 py-5  dark:bg-black dark:text-white">
      <LeftSidebar />
      <div className="w-[55%] border border-gray-200 dark:border-gray-800 overflow-scroll scroll-container">
        <Outlet />
      </div>
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
