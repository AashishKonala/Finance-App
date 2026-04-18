// import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white px-6">
      
      {/* 1. The "Aura" Background (Antigravity Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center">
        {/* 2. Floating Badge */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-300">New: AI Insights 2.0</span>
        </motion.div> */}

        {/* 3. High-Impact Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
        >
          Finance, <br />
          <span className="italic font-light">weightless.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Stop wrestling with spreadsheets. Experience a fluid, AI-driven 
          interface that manages your wealth while you sleep.
        </motion.p>

        {/* 4. Minimalist Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/Dashboard">
            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Start Your Journey
            </button>
          </Link>
          <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
            Watch the Film
          </button>
        </motion.div>
      </div>

      {/* 5. The "Antigravity" Dashboard Preview */}
      {/* <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 40 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="relative mt-16 w-full max-w-5xl group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative aspect-video rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
          
          <div className="p-8 flex flex-col gap-6">
            <div className="h-4 w-1/4 bg-white/5 rounded" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-32 bg-white/5 rounded-lg border border-white/5" />
              <div className="h-32 bg-blue-500/10 rounded-lg border border-blue-500/20" />
              <div className="h-32 bg-white/5 rounded-lg border border-white/5" />
            </div>
          </div>
        </div>
      </motion.div> */}
    </section>
  );
}