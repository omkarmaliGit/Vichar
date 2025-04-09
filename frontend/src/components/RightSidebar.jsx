import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import WhoToFollow from "./WhoToFollow";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const RightSidebar = () => {
  return (
    <>
      <div className="w-[25%] pl-5 pt-1">
        <div>
          <div className="px-4 py-2 bg-gray-100 rounded-full  w-full flex items-center gap-2 text-gray-800 font-semibold">
            <IoSearchSharp size={20} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none border-none w-full"
            />
          </div>
          <div className="p-3 mt-4 border border-gray-200 rounded-3xl">
            <h1 className="font-bold text-xl py-2">Who to follow</h1>
            <div>
              <WhoToFollow
                name={"Akshara"}
                userName={"@omkarvichar31"}
                imgUrl={
                  "https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Jan/12/blog_images/e46601974389fe0cab04c746fe55c4cf.jpg"
                }
              />
              <WhoToFollow
                name={"Omkar"}
                userName={"@omkarvichar31"}
                imgUrl={
                  "https://media.istockphoto.com/id/973481674/photo/stylish-man-posing-on-grey-background.jpg?s=612x612&w=0&k=20&c=zn4YXiU1RX4-DHz8XNSSB3PoEKBxpfeFtRTESWX6OWQ="
                }
              />
              <WhoToFollow
                name={"Neha"}
                userName={"@omkarvichar31"}
                imgUrl={
                  "https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Feb/18/blog_images/353aaae1728f1967aeed1b6985f1bd6b.jpg"
                }
              />
              <WhoToFollow
                name={"Vrinda"}
                userName={"@omkarvichar31"}
                imgUrl={
                  "https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Feb/18/blog_images/43b6b34c9d64d40ba7fb7be86d6f35fb.jpg"
                }
              />
            </div>
          </div>
          <div className="p-3 mt-4 border border-gray-200 rounded-3xl">
            <h1 className="font-bold text-xl py-2">What’s happening</h1>
            <div className="h-40"></div>
          </div>
          <div className="fixed bottom-6 right-6 w-20 ">
            <DotLottieReact
              src="https://lottie.host/d4ee8244-6959-4843-9734-82ac71f11ab5/gxXT2Z7thJ.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
