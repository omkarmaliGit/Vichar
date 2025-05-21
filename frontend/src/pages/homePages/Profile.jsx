import React, { useState } from "react";
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
import EditProfile from "../../components/subComponents/EditProfile";

const Profile = () => {
  const { vichars } = useSelector((store) => store.vichar);
  const { user } = useSelector((store) => store.user);
  const { profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const date = new Date(profile?.createdAt);
  const formattedDate = date.toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const followAndUnfollowHandler = async () => {
    if (user?.followings?.includes(id)) {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
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
        <div
          style={{
            backgroundImage: profile?.coverImage
              ? `url(${profile.coverImage})`
              : undefined,
          }}
          className={`bg-cover bg-center bg-no-repeat h-72 ${
            !profile?.coverImage ? "hidden" : ""
          }`}
        ></div>
        <div
          className={`w-full flex h-32 ${!profile?.coverImage ? "mt-28" : ""}`}
        >
          <div className="px-10 relative -top-24">
            <div className="p-1 bg-white inline-block rounded-full">
              <Avatar
                name={profile?.name}
                imageUrl={profile?.profileImage}
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
              <button
                className="border-gray-500 border rounded-full px-4 py-1 hover:bg-gray-500"
                onClick={() => setIsEditing(true)}
              >
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
          <p className="whitespace-pre-wrap">{profile?.profileBio}</p>
          <p className="text-gray-500">Joined {formattedDate}</p>
          <div className="text-gray-500 flex gap-4">
            <p>
              <b className="text-black dark:text-white">
                {
                  vichars.filter((vichar) => vichar.userId === profile?._id)
                    .length
                }
              </b>{" "}
              Posts
            </p>
            <p>
              <b className="text-black dark:text-white">
                {profile?.followings?.length}
              </b>{" "}
              Following
            </p>
            <p>
              <b className="text-black dark:text-white">
                {profile?.followers?.length}
              </b>{" "}
              Followers
            </p>
          </div>
          {/* <p className="text-sm text-gray-500">
            Not followed by anyone you’re following
          </p> */}
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
              ?.filter((vichar) => vichar?.userId === profile?._id)
              .reverse()
              .map((vichar) => {
                return <Vichar key={vichar?._id} vichar={vichar} />;
              })}
          </div>
        </div>
      </div>

      {isEditing && (
        <EditProfile profile={profile} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default Profile;
