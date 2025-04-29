import React, { useState } from "react";
import CreatePost from "./subComponents/CreatePost";
import Vichar from "./subComponents/Vichar";
import { useSelector } from "react-redux";

const Feed = () => {
  const { user } = useSelector((store) => store.user);
  const { vichars, followingVichars } = useSelector((store) => store.vichar);
  // console.log(vichars, followingVichars);

  const [activeTab, setActiveTab] = useState("forYou");

  const tabs = [
    { id: "forYou", label: "For You" },
    { id: "following", label: "Following" },
  ];

  // Logic to choose the right vichars based on the tab
  const filteredVichars =
    activeTab === "forYou"
      ? vichars?.filter((vichar) => vichar.userId !== user?._id).reverse()
      : followingVichars
          ?.filter((vichar) => vichar.userId !== user?._id)
          .reverse();

  return (
    <div>
      {/* Navigation Tabs */}
      <nav className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full px-4 py-3 text-center transition-colors duration-200 focus:outline-none 
              font-semibold text-gray-600 text-lg hover:bg-gray-200 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Create Post */}
      <CreatePost />

      {/* Feed Section */}
      <div className="mt-4 space-y-4">
        {filteredVichars && filteredVichars.length > 0 ? (
          filteredVichars.map((vichar) => {
            return (
              <Vichar
                key={vichar?._id}
                vichar={vichar}
                imageUrl={
                  "https://dreamlandmunnar.in/wp-content/uploads/2023/11/ezgif.com-gif-maker-3-1000x565.webp"
                }
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500">No vichars to show here.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
