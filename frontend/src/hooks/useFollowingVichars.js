import axios from "axios";
import { VICHAR_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingVichars } from "../redux/vicharSlice";

const useFollowingVichars = (id) => {
  const dispatch = useDispatch();
  const { refreshVichar } = useSelector((store) => store.vichar);
  const { refreshUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchFollowingVichars = async () => {
      try {
        // console.log(id);
        const res = await axios.get(
          `${VICHAR_API_END_POINT}/getfollowingvichar/${id}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        dispatch(getFollowingVichars(res.data.followingVichars));
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowingVichars();
  }, [refreshUser, refreshVichar]);
};

export default useFollowingVichars;
