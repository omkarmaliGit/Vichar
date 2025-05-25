import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

export const Register = async (req, res) => {
  try {
    // console.log(req.body);

    const { name, username, email, phone, password } = req.body;

    if (!name || !username || !email || !phone || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required.", success: false });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(401)
        .json({ message: "User already exist", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    await userModel.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required.", success: false });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User Not Exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const Logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "Lax",
      secure: true,
    })
    .json({
      message: "user logged out successfully",
      success: true,
    });
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherProfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUsers = await userModel.find({ _id: { $ne: id } });

    if (!otherUsers) {
      return res.status(401).json({
        message: "Currently do not have any users.",
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const userId = req.params.id;

    if (LoggedInUserId === userId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const loggedInUser = await userModel.findById(LoggedInUserId);
    const user = await userModel.findById(userId);

    if (!user || !loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.followers.includes(LoggedInUserId)) {
      await user.updateOne({ $push: { followers: LoggedInUserId } });
      await loggedInUser.updateOne({ $push: { followings: userId } });

      return res.status(200).json({
        message: `${loggedInUser.name} just followed to ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `You already followed to ${user.name}`,
      });
    }
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ message: "Internal server error - for Follow" });
  }
};

export const unfollow = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const userId = req.params.id;

    if (LoggedInUserId === userId) {
      return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    const loggedInUser = await userModel.findById(LoggedInUserId);
    const user = await userModel.findById(userId);

    if (!user || !loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (loggedInUser.followings.includes(userId)) {
      await user.updateOne({ $pull: { followers: LoggedInUserId } });
      await loggedInUser.updateOne({ $pull: { followings: userId } });

      return res.status(200).json({
        message: `${loggedInUser.name} just unfollowed to ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `You are not following ${user.name}`,
      });
    }
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // console.log(userId);
    // console.log(req.body, req.files);

    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    // console.log(req.body, req.files);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, username, profileBio } = req.body;

    if (!name || !username) {
      return res
        .status(400)
        .json({ message: "Required fields missing", success: false });
    }

    // console.log(`name, username, profileBio = ${(name, username, profileBio)}`);

    const profileImage = req.files?.profileImage?.[0];
    let profileImageUrl = "";
    if (profileImage) {
      const result = await cloudinary.uploader.upload(profileImage.path, {
        resource_type: "image",
        folder: `vichar_social/user`,
      });
      profileImageUrl = result.secure_url;
    }

    const coverImage = req.files?.coverImage?.[0];
    let coverImageUrl = "";
    if (coverImage) {
      const result = await cloudinary.uploader.upload(coverImage.path, {
        resource_type: "image",
        folder: `vichar_social/user`,
      });
      coverImageUrl = result.secure_url;
    }

    // console.log(
    //   `profileImageUrl, coverImageUrl = ${
    //     (profileImageUrl, "euuuuuuuuuuueuuuuuuu", coverImageUrl)
    //   }`
    // );

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          name: name,
          username: username,
          profileBio: profileBio,
          profileImage: profileImageUrl,
          coverImage: coverImageUrl,
        },
        { new: true, runValidators: true }
      )
      .select("-password");

    // console.log(`in last`);

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json({ message: "Failed to update profile", success: false });
  }
};
