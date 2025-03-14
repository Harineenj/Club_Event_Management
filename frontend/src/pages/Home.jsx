import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-green-200">
      <div className="text-center p-6 max-w-lg">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
          Welcome to <span className="text-blue-700">Event Portal</span>
        </h1>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">
          Discover, register, and manage events effortlessly with a seamless experience.
        </p>
        <div className="flex gap-6 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
