import React from "react";
import logo from "../assets/logo-color.png";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-evenly">
        <div>
          <img className="w-80" src={logo} alt="logo" />
        </div>
        <form className="border border-gray-300 px-10 pt-10 pb-5 rounded-3xl flex flex-col items-center ">
          <h1 className="mb-5 font-bold text-xl">Join Today</h1>
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="text"
            placeholder="name"
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="text"
            placeholder="username"
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="email"
            placeholder="email"
          />
          <input
            className="min-w-72 bg-gray-100 border border-gray-300 px-4 py-2 rounded-sm mb-2"
            type="number"
            placeholder="phone number"
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
