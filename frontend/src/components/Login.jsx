import React from "react";
import logo from "../assets/logo-color.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <form className="border border-gray-300 px-10 pb-5 rounded-3xl flex flex-col items-center ">
          <div>
            <img className="w-40" src={logo} alt="logo" />
          </div>
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="text"
            placeholder="username, email or phone"
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button
            type="submit"
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
