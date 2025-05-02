import React, { useState } from "react";

const EditProfile = ({ profile, onClose, onSave }) => {
  const [name, setName] = useState(profile?.name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { ...profile, name, username, bio };
    onSave(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
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
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
