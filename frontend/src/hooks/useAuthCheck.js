import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { getUser } from "../redux/userSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      const checkLogin = async () => {
        try {
          const res = await axios.get(`${USER_API_END_POINT}/check-auth`, {
            withCredentials: true,
          });

          if (res.data.success) {
            dispatch(getUser(res.data.user));
          }
        } catch (err) {
          console.log(err, "User not logged in");

          // optionally clear user from redux here
        }
      };

      checkLogin();
    }
  }, [dispatch]);
};

export default useAuthCheck;
