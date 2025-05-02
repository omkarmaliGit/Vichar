import axios from "axios";
import { VICHAR_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVichars } from "../redux/vicharSlice";

const useGetMyVichars = (id) => {
  const dispatch = useDispatch();
  const { refreshVichar } = useSelector((store) => store.vichar);
  const { refreshUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchMyVichars = async () => {
      try {
        const res = await axios.get(
          `${VICHAR_API_END_POINT}/getallvichar/${id}`,
          {
            withCredentials: true,
          }
        );

        dispatch(getAllVichars(res.data.vichars));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyVichars();
  }, [refreshUser, refreshVichar]);
};

export default useGetMyVichars;
