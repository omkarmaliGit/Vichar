import { Link } from "react-router-dom"; // Make sure you're using React Router

function NotFoundPage() {
  return (
    <div className="text-center p-8 dark:bg-black h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
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
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
