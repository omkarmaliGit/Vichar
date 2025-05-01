import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../../redux/userSlice";

const WhoToFollow = ({ userId, name, userName, imgUrl }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isFollowing = user?.followings?.includes(userId);

  // const [isFollowing, setIsFollowing] = useState(false);

  // useEffect(() => {
  //   if (user?.followings?.includes(userId)) {
  //     setIsFollowing(true);
  //   } else {
  //     setIsFollowing(false);
  //   }
  // }, [user?.followings, userId]);

  // const isUserFollowing = useMemo(() => {
  //   return user?.followings?.includes(userId);
  // }, [user?.followings, userId]);

  // console.log(userId, user?.followings, isUserFollowing);

  const followHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/follow/${userId}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // setIsFollowing(true);
        dispatch(getRefresh()); // refresh user data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Follow failed");
    }
  };

  const unfollowHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/unfollow/${userId}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // setIsFollowing(false);
        dispatch(getRefresh()); // refresh user data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unfollow failed");
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
          onClick={isFollowing ? unfollowHandler : followHandler}
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
