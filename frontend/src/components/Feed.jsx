import React from "react";
import CreatePost from "./CreatePost";
import Vichar from "./Vichar";

const Feed = () => {
  return (
    <div>
      <CreatePost />
      <Vichar
        imageUrl={
          "https://dreamlandmunnar.in/wp-content/uploads/2023/11/ezgif.com-gif-maker-3-1000x565.webp"
        }
      />
      <Vichar />
      <Vichar />
      <Vichar />
      <Vichar />
    </div>
  );
};

export default Feed;
