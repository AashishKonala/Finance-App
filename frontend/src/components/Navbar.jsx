export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-blue-600">FinTrack</h1>

      <div className="space-x-6 hidden md:block">
        <a href="#" className="hover:text-blue-600">Product</a>
        <a href="#" className="hover:text-blue-600">Use Cases</a>
        <a href="#" className="hover:text-blue-600">Pricing</a>
        <a href="#" className="hover:text-blue-600">Blog</a>
        <a href="#" className="hover:text-blue-600">Resources</a>
      </div>

      <div className="space-x-4">
        <button className="text-gray-700 hover:text-blue-600">
          Login
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
