import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  console.log(children);

  // const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/auth`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setAuthenticated(true);
          console.log("data suCCeSS", res.data.message);
        } else {
          console.log(res.data.message);
        }
      } catch (err) {
        // console.log(err);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
        setAuthenticated(false);
      } finally {
        // setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // if (loading) return <div>Loading...</div>;

  if (!authenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
