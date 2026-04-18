import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] px-8 pt-24 pb-12 overflow-hidden">
      {/* Decorative Top Border/Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo / Brand - Minimalist style */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center md:items-start"
          >
            <h2 className="text-2xl font-bold tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              FinTrack
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-light">Finance, refined.</p>
          </motion.div>

          {/* Nav Links - Subtle hover state */}
          <div className="flex space-x-8 text-sm font-medium text-gray-400">
            {['Features', 'About', 'Contact', 'Privacy'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[12px] tracking-widest uppercase">
            © {currentYear} FinTrack. Built for the future.
          </p>
          
          {/* Social Icons Placeholder */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all cursor-pointer">
              <span className="text-[10px]">𝕏</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all cursor-pointer">
              <span className="text-[10px]">IG</span>
            </div>
          </div>
        </div>
      </div>

      {/* Very subtle bottom aura */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
}