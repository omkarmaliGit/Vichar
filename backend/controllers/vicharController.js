import userModel from "../models/userSchema.js";
import vicharModel from "../models/vicharSchema.js";

import { v2 as cloudinary } from "cloudinary";

export const createVichar = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required.",
        success: false,
      });
    }

    const images = req.files || [];

    let imagesUrl = [];

    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
            folder: `vichar_social/vichar`,
          });
          return result.secure_url;
        })
      );
    }

    const user = await userModel.findById(id).select("-password");

    await vicharModel.create({
      description,
      userId: id,
      userDetails: user,
      images: imagesUrl,
    });

    return res.status(201).json({
      message: "Vichar created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const deleteVichar = async (req, res) => {
  try {
    const { id } = req.params;
    await vicharModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Vichar deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const vicharId = req.params.id;

    const vichar = await vicharModel.findById(vicharId);

    if (vichar.likes.includes(LoggedInUserId)) {
      await vicharModel.findByIdAndUpdate(vicharId, {
        $pull: { likes: LoggedInUserId },
      });
      return res.status(200).json({
        message: `Disliked vichar.`,
        success: true,
      });
    } else {
      await vicharModel.findByIdAndUpdate(vicharId, {
        $push: { likes: LoggedInUserId },
      });
      return res.status(200).json({
        message: "Liked vichar.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const bookmarks = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const vicharId = req.params.id;

    const vichar = await vicharModel.findById(vicharId);

    if (vichar.bookmarks.includes(LoggedInUserId)) {
      await vicharModel.findByIdAndUpdate(vicharId, {
        $pull: { bookmarks: LoggedInUserId },
      });
      return res.status(200).json({
        message: "Removed from bookmarks.",
        success: true,
      });
    } else {
      await vicharModel.findByIdAndUpdate(vicharId, {
        $push: { bookmarks: LoggedInUserId },
      });
      return res.status(200).json({
        message: "Saved to bookmarks.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingVichar = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);

    const followingUserVichars = await Promise.all(
      loggedInUser.followings.map((otherUsersId) => {
        return vicharModel.find({ userId: otherUsersId });
      })
    );

    return res.status(200).json({
      followingVichars: [].concat(...followingUserVichars),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllVichar = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);
    const loggedInUserVichars = await vicharModel.find();

    // { userId: id }

    // const followingUserVichars = await Promise.all(
    //   loggedInUser.followings.map((otherUsersId) => {
    //     return vicharModel.find({ userId: otherUsersId });
    //   })
    // );

    return res.status(200).json({
      vichars: loggedInUserVichars,
      // .concat(...followingUserVichars),
    });

    // const allVichars = await vicharModel.find({});

    // return res.status(200).json({
    //   vichars: allVichars,
    // });
  } catch (error) {
    console.log(error);
  }
};
