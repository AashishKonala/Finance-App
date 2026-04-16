export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-r from-blue-50 to-white">
      
      {/* Left Content */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Take Control of Your Finances Effortlessly
        </h1>

        <p className="text-gray-600 mb-6 text-lg">
          Track expenses, manage budgets, and gain insights — all in one place.
        </p>

        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>

          <button className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            View Demo
          </button>
        </div>
      </div>

      {/* Right Side (Preview Box) */}
      <div className="mt-10 md:mt-0">
        <div className="w-80 h-56 bg-white rounded-xl shadow-lg flex items-center justify-center">
          <span className="text-gray-400">Dashboard Preview</span>
        </div>
      </div>

    </section>
  );
}
