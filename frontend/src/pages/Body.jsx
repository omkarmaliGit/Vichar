import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Feed from "../components/Feed";
import Profile from "../components/Profile";
import Signup from "./Signup";
import { Toaster } from "react-hot-toast";
import Setting from "../components/Setting";
import NotFoundPage from "../components/NotFoundPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/", element: <Feed /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/setting", element: <Setting /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  );
};

export default Body;
