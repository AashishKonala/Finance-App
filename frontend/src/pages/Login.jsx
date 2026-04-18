import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 text-white">
      
      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-5">
          
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
