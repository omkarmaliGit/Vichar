import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { followingUpdate, getRefreshUser } from "../../redux/userSlice";

const WhoToFollow = ({ userId, name, userName, imgUrl }) => {
  const { user } = useSelector((store) => store.user);
  const id = userId;
  const dispatch = useDispatch();

  let isFollowing = user.followings.includes(id);

  const followAndUnfollowHandler = async () => {
    if (isFollowing) {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefreshUser());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefreshUser());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center w-full justify-between py-2">
        <Link to={`/profile/${userId}`}>
          <div className="flex items-center gap-4">
            <Avatar name={name} imageUrl={imgUrl} size={45} />
            <div className="cursor-pointer">
              <h1 className="font-bold">{name}</h1>
              <p>{userName}</p>
            </div>
          </div>
        </Link>
        <button
          onClick={followAndUnfollowHandler}
          className={`${
            isFollowing
              ? "bg-blue-100 text-black font-semibold hover:bg-red-200"
              : "bg-blue-950 text-white hover:bg-green-900 "
          } px-2 min-w-24 py-1.5 rounded-full border border-gray-800`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default WhoToFollow;
