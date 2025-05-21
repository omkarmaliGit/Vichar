import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import WhoToFollow from "./subComponents/WhoToFollow";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoIosMore } from "react-icons/io";

const RightSidebar = ({ otherUsers }) => {
  return (
    <>
      <div className="w-[25%] h-[100%] pl-5 pt-1">
        <div className="h-[100%]">
          <div className="px-4 py-2 bg-gray-100 rounded-full  w-full flex items-center gap-2 text-gray-800 font-semibold dark:bg-black dark:text-white dark:placeholder-gray-400 dark:border dark:border-gray-800">
            <IoSearchSharp size={20} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none border-none w-full dark:bg-black dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div className="p-3 mt-4 border border-gray-200 rounded-3xl h-[55%] dark:border-gray-800">
            <h1 className="font-bold text-xl py-2">Who to follow</h1>
            <div className="overflow-scroll scroll-container h-[90%] mx-2">
              {otherUsers
                ?.map((user) => {
                  return (
                    <WhoToFollow
                      key={user._id}
                      userId={user._id}
                      name={user.name}
                      userName={`@${user.username}`}
                      imgUrl={user.profileImage}
                    />
                  );
                })
                .reverse()}
            </div>
          </div>
          <div className="p-3 mt-4 border border-gray-200 rounded-3xl dark:border-gray-800 ">
            <h1 className="font-bold text-xl py-2">What’s happening</h1>
            <div className="h-40 flex flex-col justify-center mx-2">
              <div className="flex gap-2 py-2">
                <img
                  src="https://pbs.twimg.com/semantic_core_img/1875997496851263488/BLI4C75l?format=jpg&name=240x240"
                  alt=""
                  className="h-16 border rounded-lg"
                />
                <div>
                  <h1 className="font-semibold text-sm">
                    Khloé in Wonder Land
                  </h1>
                  <p className="text-sm text-gray-400">LIVE</p>
                </div>
              </div>
              <div className="my-2 flex justify-between items-center">
                <p className="text-sm text-gray-400">Trending in india</p>
                <h1 className="text-md font-bold">#Modi</h1>
                <p className="text-sm text-gray-400">297K posts</p>
                <IoIosMore size={18} />
              </div>
              <div>
                <p className="text-blue-500">Show more</p>
              </div>
            </div>
          </div>
          {/* <div className="fixed bottom-6 right-6 w-20 ">
            <DotLottieReact
              src="https://lottie.host/d4ee8244-6959-4843-9734-82ac71f11ab5/gxXT2Z7thJ.lottie"
              loop
              autoplay
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
