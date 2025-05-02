import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../components/subComponents/Avatar";
import Vichar from "../../components/subComponents/Vichar";
import { PiSquaresFourLight, PiBookmarkSimpleLight } from "react-icons/pi";
import useGetProfile from "../../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../../redux/userSlice";
import { getRefreshVichar } from "../../redux/vicharSlice";

const Profile = () => {
  const { vichars } = useSelector((store) => store.vichar);
  const { user } = useSelector((store) => store.user);
  const { profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if (user.followings.includes(id)) {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefreshVichar());
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
        dispatch(getRefreshVichar());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      <div className="">
        {/* <div className="w-[53.3%] flex items-center px-2 py-1 gap-2">
          <Link to={"/"}>
            <IoArrowBackCircleOutline size={36} />
          </Link>
          <div>
            <h1 className="font-bold text-sm">{profile?.name}</h1>
            <p className="text-sm text-gray-800">10 posts</p>
          </div>
        </div> */}
        <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyaLOrbOHCW530SUaJ6GrHdzO3lwfyvyJ_iewHJhWGWzHD1NC3XAkUpZjEFbLyxrWFQfw&usqp=CAU')] bg-cover bg-center bg-no-repeat h-72"></div>
        <div className="w-full flex h-32">
          <div className="px-10 relative -top-24">
            <div className="p-1 bg-white inline-block rounded-full">
              <Avatar
                name={"Sneha Reddy"}
                imageUrl={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgufd6O_cyhVZrKhqOcv4Ew2c-IYGcIr8KL5u9Gg3Mt4OqY8v5-l6-pbwdftTGonX162c&usqp=CAU"
                }
                size={200}
              />
            </div>
          </div>
          <div className="pt-5 w-[45%]">
            <h1 className="font-bold text-2xl">{profile?.name}</h1>
            <p className="text-gray-500 ">{`@${profile?.username}`}</p>
          </div>
          <div className="pt-7 ml-3">
            {profile?._id === user?._id ? (
              <button className="border-gray-500 border rounded-full px-4 py-1 hover:bg-gray-500">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followAndUnfollowHandler}
                className="border-gray-500 bg-gray-900 text-white  border rounded-full px-4 py-1 hover:bg-gray-700"
              >
                {user.followings.includes(id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <div className="px-8">
          <p>
            Frontend Development ⋆ UI Design ⋆ Freelance ⋆ Former Paralegal ⋆
            Self-care 🌴🌊☕
          </p>
          <p className="text-gray-500">Joined June 2011</p>
          <div className="text-gray-500 flex gap-4">
            <p>
              <b className="text-black dark:text-white">159</b> Following
            </p>
            <p>
              <b className="text-black dark:text-white">153.5K</b> Followers
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Not followed by anyone you’re following
          </p>
        </div>
        <div className="mt-8">
          <div className="border-b border-gray-200 flex dark:border-gray-800">
            <h1 className="font-bold text-lg ml-8 mb-2 flex items-center gap-1">
              <PiSquaresFourLight /> Posts
            </h1>
            <h1 className="font-bold text-lg ml-8 mb-2 flex items-center gap-1">
              <PiBookmarkSimpleLight /> Saved
            </h1>
          </div>
          <div className="mx-4">
            {vichars
              ?.filter((vichar) => vichar.userId === profile?._id)
              .reverse()
              .map((vichar) => {
                return <Vichar key={vichar?._id} vichar={vichar} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
