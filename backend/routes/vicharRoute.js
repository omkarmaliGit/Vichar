import { Router } from "express";
import {
  createVichar,
  deleteVichar,
  getAllVichar,
  getFollowingVichar,
  likeOrDislike,
} from "../controllers/vicharController.js";
import isAuth from "../config/auth.js";

const vicharRouter = Router();

vicharRouter.route("/create").post(isAuth, createVichar);
vicharRouter.route("/delete/:id").delete(isAuth, deleteVichar);
vicharRouter.route("/like/:id").put(isAuth, likeOrDislike);
vicharRouter.route("/getallvichar/:id").get(isAuth, getAllVichar);
vicharRouter.route("/getfollowingvichar/:id").get(isAuth, getFollowingVichar);

export default vicharRouter;
