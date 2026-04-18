import Sidebar from "../components/dashboard/Sidebar";
import TopHeader from "../components/dashboard/TopHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import MainChart from "../components/dashboard/MainChart";
import BalanceCard from "../components/dashboard/BalanceCard";
import InvestmentList from "../components/dashboard/InvestmentList";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    /* 1. Background changed to #050505 to match Landing Page.
       2. Added relative and overflow-hidden to contain background glows.
    */
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden relative font-sans">
      
      {/* Background Subtle Glow - Matching Landing Page Theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-64 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Sidebar remains fixed on the left */}
      <Sidebar />
      
      {/* Main content area with custom scrollbar.
          Added a slight backdrop blur and z-index to stay above background glows.
      */}
      <main className="flex-1 p-8 overflow-y-auto custom-scrollbar relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TopHeader />
        </motion.div>
        
        <div className="grid grid-cols-12 gap-8 mt-4">
          
          {/* LEFT COLUMN: Stats & Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 lg:col-span-8 space-y-8"
          >
            <StatsGrid />
            <MainChart />
          </motion.div>

          {/* RIGHT COLUMN: Balance & Investments */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 lg:col-span-4 space-y-8"
          >
            <BalanceCard />
            <InvestmentList />
          </motion.div>

        </div>

        {/* Padding at the bottom so the last card doesn't touch the edge */}
        <div className="h-20" />
      </main>
    </div>
  );
}