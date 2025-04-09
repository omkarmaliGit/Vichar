import React from "react";
import Avatar from "./Avatar";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { GoBookmark, GoHeart, GoComment } from "react-icons/go";

const Vichar = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex m-4">
        <Avatar
          name="Omkar Mali"
          imageUrl="https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Jan/12/blog_images/e46601974389fe0cab04c746fe55c4cf.jpg"
          size={50}
        />
        <div className="ml-4 w-[90%]">
          <div className="flex items-center">
            <h1 className="font-bold">Omkar</h1>
            <p className="text-gray-500 text-sm ml-1">@omkarmernstack</p>
            <p className="text-gray-500 text-sm ml-1"> · 1m</p>
          </div>
          <div className="min-h-5 mt-3 mb-4">
            <p>
              Hello develeopers lets connect and grow together Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Dolor beatae tenetur
              iusto asperiores, sint ipsum quo magnam quod, consequatur,
              repellat nihil iste nobis quae. Similique rerum est sequi quae non
              ipsa aspernatur. Vero voluptatem amet ipsa deleniti, dolor eaque
              asperiores, debitis incidunt voluptas, beatae voluptates ut rem
              non. Consequatur accusantium, commodi ipsa aspernatur delectus
              aperiam possimus velit in omnis dolorem dicta, quidem pariatur
              neque magnam animi unde voluptate quas cum distinctio a harum
              voluptates? Aliquid nemo quod totam, quaerat aliquam culpa
              molestiae voluptatum sint dolores at, consectetur corrupti,
              tempora alias repellat? Eos a minima veniam alias voluptates
              libero optio quam.
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-2 hover:bg-red-100 rounded-full cursor-pointer">
                <GoHeart size={24} />
              </div>
              <p className="text-gray-500">0 likes</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2 hover:bg-green-100 rounded-full cursor-pointer">
                <GoComment size={24} />
              </div>
              <p className="text-gray-500">0 comments</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2 hover:bg-blue-100 rounded-full cursor-pointer">
                <GoBookmark size={24} />
              </div>
              <p className="text-gray-500">0 bookmarks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vichar;
