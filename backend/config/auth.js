import jwt from "jsonwebtoken";
import "dotenv/config";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.userId;
    next();
  } catch (error) {}
};

export default isAuth;
