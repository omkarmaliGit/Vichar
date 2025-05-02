import { Link } from "react-router-dom";
import errorImg from "../assets/error404.png";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center p-8 dark:bg-black h-screen">
      <h1 className="text-2xl font-bold text-red-400 ">
        Something Went Wrong!
      </h1>
      <img src={errorImg} alt="" className="m-4" />
      <p className="text-lg mb-2 dark:text-white">
        The page you're looking for doesn't exist or might still be under
        construction.
      </p>
      <p className="text-md mb-6 text-gray-600">
        We're working on bringing this functionality soon. Stay tuned!
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
      >
        For Now Go Back To Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
