import React, { useState } from "react";
import logo from "../assets/logo-color.png";
import { NavLink, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(getUser(res?.data?.user));
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="border border-gray-300 px-10 pb-5 rounded-3xl flex flex-col items-center "
        >
          <div>
            <img className="w-40" src={logo} alt="logo" />
          </div>
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            // type="submit"
            className=" bg-blue-900 text-white my-7 border border-gray-300 px-20 py-2 rounded-3xl mb-2 hover:bg-blue-950"
          >
            Log in
          </button>
          <div className="inline-flex gap-2 py-4">
            Don't have an account?
            <NavLink to={"/signup"} className={"text-blue-900 font-semibold"}>
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
