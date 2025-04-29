import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Trying to connect to DB...");

  mongoose.connection.on("connected", () => {
    console.log(`DB Connected`);
  });

  await mongoose.connect(`${process.env.MONGO_DB_URL}/vichar_social-media`);
};

export default connectDB;
