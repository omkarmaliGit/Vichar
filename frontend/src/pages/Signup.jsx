import React, { useState } from "react";
import logo from "../assets/logo-color.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(name, username, email, phone, password);

    try {
      const res = await axios.post(
        USER_API_END_POINT + "/register",
        {
          name,
          username,
          email,
          phone,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-evenly">
        <div>
          <img className="w-80" src={logo} alt="logo" />
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="border border-gray-300 px-10 pt-10 pb-5 rounded-3xl flex flex-col items-center "
        >
          <h1 className="mb-5 font-bold text-xl">Join Today</h1>
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="number"
            placeholder="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" bg-blue-900 text-white my-7 border border-gray-300 px-20 py-2 rounded-3xl mb-2 hover:bg-blue-950">
            Sign Up
          </button>
          <div className="inline-flex gap-2 py-4">
            Don't have an account?
            <NavLink to="/login" className={"text-blue-900 font-semibold"}>
              Log in
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
