import { Router } from "express";
import {
  follow,
  getMyProfile,
  getOtherProfiles,
  Login,
  Logout,
  Register,
  unfollow,
  updateProfile,
} from "../controllers/userController.js";
import isAuth from "../config/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.route("/auth").get(isAuth, (req, res) => {
  res.json({ success: true, message: "Authenticated", userId: req.user });
});
userRouter.route("/register").post(Register);
userRouter.route("/login").post(Login);
userRouter.route("/logout").get(Logout);
userRouter.route("/profile/:id").get(isAuth, getMyProfile);
userRouter.route("/otherprofile/:id").get(isAuth, getOtherProfiles);
userRouter.route("/follow/:id").post(isAuth, follow);
userRouter.route("/unfollow/:id").post(isAuth, unfollow);
userRouter.route("/updateprofile/:id").put(
  isAuth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateProfile
);

export default userRouter;
