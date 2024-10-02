import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-4 sm:p-8"
      style={{ backgroundImage: 'url("/Welcome-screen.jpeg")' }}
    >
      <header className="mb-8 text-center">
        <h1 className="text-white text-3xl sm:text-4xl font-bold">🎬 WATCH</h1>
        <p className="text-white text-lg sm:text-xl mt-2">
          Enjoy the newest movies
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/login">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto">
            Log in
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-transparent hover:bg-white text-white hover:text-purple-600 border border-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
