import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { updateProfile } from "../../redux/userSlice";
import upload_area from "../../assets/upload_area.png";

const EditProfile = ({ profile, onClose }) => {
  const [name, setName] = useState(profile?.name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [profileBio, setProfileBio] = useState(profile?.profileBio || "");

  const [profileImage, setProfileImage] = useState(false);
  const [coverImage, setCoverImage] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("profileBio", profileBio);

    if (profileImage) formData.append("profileImage", profileImage);
    if (coverImage) formData.append("coverImage", coverImage);

    // console.log(formData);

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/updateprofile/${profile?._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(updateProfile(res.data.user));
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  // console.log(profile.profileImage, profile.coverImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-9">
            <div>
              <label className="mb-block text-sm text-gray-900 dark:text-gray-300 mb-1">
                Profile Photo
              </label>
              <div className="flex gap-2">
                <label htmlFor="profileImage">
                  <img className="w-20" src={upload_area} alt="" />
                  <input
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    type="file"
                    id="profileImage"
                    hidden
                  />
                </label>
                <img
                  className="w-20"
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : profile.profileImage
                    // ? `${USER_API_END_POINT}/uploads/${profile.profileImage}`
                    // : ""
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <label className="mb-block text-sm text-gray-900 dark:text-gray-300 mb-1">
                Cover Photo
              </label>
              <div className="flex gap-2">
                <label htmlFor="coverImage">
                  <img className="w-20" src={upload_area} alt="" />
                  <input
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    type="file"
                    id="coverImage"
                    hidden
                  />
                </label>
                <img
                  className="w-20"
                  src={
                    coverImage
                      ? URL.createObjectURL(coverImage)
                      : profile.coverImage
                    // ? `${USER_API_END_POINT}/uploads/${profile.coverImage}`
                    // : ""
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm text-gray-900 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-900 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-900 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              rows={3}
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
            >
              Save
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
