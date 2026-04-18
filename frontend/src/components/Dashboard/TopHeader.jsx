import { Search, Bell } from 'lucide-react';

export default function TopHeader() {
  return (
    <header className="flex justify-between items-center mb-10 relative z-20">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="relative">
          <img 
            src="https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff" 
            className="w-12 h-12 rounded-2xl border border-white/10 object-cover transition-transform group-hover:scale-105" 
            alt="profile" 
          />
          {/* Online Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#050505] rounded-full" />
        </div>
        <div>
          <p className="text-[10px] text-blue-400 font-mono uppercase tracking-[0.2em]">System Active</p>
          <h2 className="text-xl font-bold text-white tracking-tight">John Doe</h2>
        </div>
      </div>
      
      {/* Search and Notifications */}
      <div className="flex items-center gap-4">
        {/* Search Bar - Glass Effect */}
        <div className="bg-white/5 backdrop-blur-md flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 focus-within:border-blue-500/50 transition-all group">
          <Search size={18} className="text-gray-500 group-focus-within:text-blue-400" />
          <input 
            type="text" 
            placeholder="Search terminal..." 
            className="bg-transparent border-none outline-none text-sm w-48 text-white placeholder:text-gray-600 font-medium" 
          />
        </div>

        {/* Notification Button */}
        <button className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all relative group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          {/* Notification Dot - Blue to match landing page */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </button>
      </div>
    </header>
  );
}