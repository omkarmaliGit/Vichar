import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    console.log(req.body);

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
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logged out successfully",
    success: true,
  });
};

export const bookmarks = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const vicharId = req.params.id;

    const user = await userModel.findById(LoggedInUserId);

    if (user.bookmarks.includes(vicharId)) {
      await userModel.findByIdAndUpdate(LoggedInUserId, {
        $pull: { bookmarks: vicharId },
      });
      return res.status(200).json({
        message: "Removed from bookmarks.",
        success: true,
      });
    } else {
      await userModel.findByIdAndUpdate(LoggedInUserId, {
        $push: { bookmarks: vicharId },
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
    const { name, username, profileBio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      return res
        .status(400)
        .json({ message: "Required fields missing", success: false });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { name, username, profileBio, profileImage, coverImage },
        { new: true, runValidators: true }
      )
      .select("-password");

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
