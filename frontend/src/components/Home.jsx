import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-between w-[97vw] h-[94vh] mx-6 my-5 ">
      <LeftSidebar />
      <div className="w-[55%] border border-gray-200 overflow-scroll feed-container">
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
