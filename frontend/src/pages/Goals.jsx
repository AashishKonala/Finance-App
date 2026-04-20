import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import GoalsHeader from "../components/goals/GoalsHeader";
import SavingsGoalCard from "../components/goals/SavingsGoalCard";
import SavingSummaryCard from "../components/goals/SavingSummaryCard";
import CategoryGrid from "../components/goals/CategoryGrid";

const Goals = () => {
  return (
    /* 1. Wrapper matches Dashboard: Fixed height, hidden overflow, flex for Sidebar */
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden relative font-sans">
      
      {/* Background Subtle Glow - Synced with Dashboard positions */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-64 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Sidebar remains fixed on the left */}
      <Sidebar />

      {/* Main content area with the same scroll behavior and padding as Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto custom-scrollbar relative z-10">
        
        {/* TOP HEADER ANIMATION: Matches Dashboard TopHeader entrance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GoalsHeader />
        </motion.div>

        <div className="space-y-8 mt-4">
          
          {/* TOP SECTION: Savings and Summary Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <SavingsGoalCard />
            <SavingSummaryCard />
          </motion.div>

          {/* BOTTOM SECTION: Category Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CategoryGrid />
          </motion.div>

        </div>

        {/* Footer padding to prevent content clipping */}
        <div className="h-20" />
      </main>
    </div>
  );
};

export default Goals;