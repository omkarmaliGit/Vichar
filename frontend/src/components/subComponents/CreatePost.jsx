import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { CiImageOn } from "react-icons/ci";
import { FaHashtag } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { VICHAR_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefreshVichar } from "../../redux/vicharSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset height
      el.style.height = `${el.scrollHeight}px`; // Set new height
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [description]);

  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...files]);
  };

  const removePreview = (indexToRemove) => {
    setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("id", user?._id);

      files.forEach((file) => {
        formData.append("images", file); // name "images" should match backend
      });

      const res = await axios.post(`${VICHAR_API_END_POINT}/create`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getRefreshVichar());

      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
        setPreviews([]);
        setFiles([]);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="flex items-center p-4">
        <div>
          <Avatar
            name="Omkar Mali"
            imageUrl="https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Jan/12/blog_images/e46601974389fe0cab04c746fe55c4cf.jpg"
            size={50}
          />
        </div>
        <textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full outline-none border-none text-lg ml-4 dark:bg-black dark:text-white dark:placeholder-gray-400"
          type="text"
          placeholder="What is happening?"
          rows={1}
        />
      </div>

      <div className="flex flex-wrap gap-4 my-4 ml-20">
        {previews.map((src, index) => (
          <div key={index} className="relative w-32 h-32">
            <img
              src={src}
              alt={`preview-${index}`}
              className="w-full h-full object-cover rounded border"
            />
            <button
              onClick={() => removePreview(index)}
              className="absolute top-0.5 right-0.5 bg-transparent text-black hover:text-red-500 transition"
            >
              <MdClose size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-6 pt-2 p-4 pl-20 pr-7 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <label htmlFor="image-upload" className="cursor-pointer rounded">
            <CiImageOn size="28px" />
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <FaHashtag
            size="22px"
            className="border-2 rounded p-0.5 border-black dark:border-white"
          />
        </div>
        <button
          onClick={submitHandler}
          className="bg-blue-950 px-4 py-1 text-lg border-none rounded-full text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
