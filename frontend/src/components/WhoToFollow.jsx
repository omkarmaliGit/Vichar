import React from "react";
import Avatar from "./Avatar";

const WhoToFollow = ({ name, userName, imgUrl }) => {
  return (
    <div>
      <div className="flex items-center w-full justify-between py-2">
        <Avatar name={name} imageUrl={imgUrl} size={45} />
        <div>
          <h1 className="font-bold">{name}</h1>
          <p>{userName}</p>
        </div>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1 rounded-full">
          Follow
        </button>
      </div>
    </div>
  );
};

export default WhoToFollow;
