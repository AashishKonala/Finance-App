import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center bg-transparent text-white">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-white">
        FinTrack
      </h1>

      {/* Links */}
      <div className="space-x-6 hidden md:block text-gray-300">
        <a href="#" className="hover:text-white transition">Product</a>
        <a href="#" className="hover:text-white transition">Use Cases</a>
        <a href="#" className="hover:text-white transition">Pricing</a>
        <a href="#" className="hover:text-white transition">Blog</a>
        <a href="#" className="hover:text-white transition">Resources</a>
      </div>

      {/* Buttons */}
      <div className="space-x-4">
        <Link to="/login">
          <button className="text-gray-300 hover:text-white transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
            Sign Up
          </button>
        </Link>
      </div>

    </nav>
  );
}
