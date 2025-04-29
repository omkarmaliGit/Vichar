import { Router } from "express";
import {
  bookmarks,
  follow,
  getMyProfile,
  getOtherProfiles,
  Login,
  Logout,
  Register,
  unfollow,
} from "../controllers/userController.js";
import isAuth from "../config/auth.js";

const userRouter = Router();

userRouter.route("/register").post(Register);
userRouter.route("/login").post(Login);
userRouter.route("/logout").get(Logout);
userRouter.route("/bookmark/:id").put(isAuth, bookmarks);
userRouter.route("/profile/:id").get(isAuth, getMyProfile);
userRouter.route("/otherprofile/:id").get(isAuth, getOtherProfiles);
userRouter.route("/follow/:id").post(isAuth, follow);
userRouter.route("/unfollow/:id").post(isAuth, unfollow);

export default userRouter;
