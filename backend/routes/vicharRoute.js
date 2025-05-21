import { Router } from "express";
import {
  bookmarks,
  createVichar,
  deleteVichar,
  getAllVichar,
  getFollowingVichar,
  likeOrDislike,
} from "../controllers/vicharController.js";
import isAuth from "../config/auth.js";
import upload from "../middleware/multer.js";

const vicharRouter = Router();

vicharRouter
  .route("/create")
  .post(isAuth, upload.array("images", 4), createVichar);
vicharRouter.route("/delete/:id").delete(isAuth, deleteVichar);
vicharRouter.route("/like/:id").put(isAuth, likeOrDislike);
vicharRouter.route("/bookmark/:id").put(isAuth, bookmarks);
vicharRouter.route("/getallvichar/:id").get(isAuth, getAllVichar);
vicharRouter.route("/getfollowingvichar/:id").get(isAuth, getFollowingVichar);

export default vicharRouter;
