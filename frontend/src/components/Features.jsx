import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      title: "Expense Tracking",
      desc: "Monitor your daily spending and stay in control with a fluid, real-time ledger designed for clarity.",
      icon: "💸",
    },
    {
      title: "Smart Analytics",
      desc: "Deep-dive into your habits. Our AI synthesizes your data into visual stories that actually make sense.",
      icon: "📊",
    },
    {
      title: "Budget Planning",
      desc: "Set boundaries without the stress. Build sustainable wealth with goal-oriented budgeting tools.",
      icon: "🎯",
    },
    {
      title: "Secure Data",
      desc: "Military-grade encryption ensures your financial footprint remains invisible to everyone but you.",
      icon: "🔒",
    },
  ];

  return (
    <section className="relative px-6 md:px-16 py-32 bg-[#050505] text-white overflow-hidden">
      {/* Background Accents - Larger for more screen coverage */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(30,58,138,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />

      {/* Increased max-width to 1440px for that expansive feel */}
      <div className="relative z-10 max-w-[1470px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-48">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent tracking-tighter"
          >
            Engineered for Precision
          </motion.h2>
        </div>

        {/* Feature Rows */}
        <div className="flex flex-col gap-64 md:gap-32">
          {features.map((f, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Smoother cinematic easing
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between w-full`} 
              >
                
                {/* Visual Side - Anchored to the edge */}
                <div className={`w-full md:w-[45%] flex ${isEven ? 'justify-start' : 'justify-end'}`}>
                  <div className="w-full max-w-2xl relative group"> 
                    <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000" />
                    <div className="relative aspect-video md:aspect-[16/10] w-full rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl flex items-center justify-center text-[100px] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.03]">
                      {f.icon}
                      {/* Glass Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[40px] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Text Side - Anchored to the opposite edge */}
                <div className={`w-full md:w-[40%] mt-12 md:mt-0 flex flex-col ${isEven ? 'items-start md:pl-12' : 'items-end md:pr-12'} text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-blue-500 font-mono text-sm tracking-[0.5em] uppercase mb-8 block"
                  >
                    Module 0{index + 1}
                  </motion.span>
                  
                  <h3 className="text-4xl md:text-6xl font-bold mb-10 text-white leading-[1.1] tracking-tight">
                    {f.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-lg">
                    {f.desc}
                  </p>

                  <motion.button
                    whileHover={{ x: isEven ? 10 : -10 }}
                    className="mt-10 flex items-center gap-2 text-white font-medium group transition-all"
                  >
                    Learn more 
                    <span className="group-hover:text-blue-500 transition-colors">→</span>
                  </motion.button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}