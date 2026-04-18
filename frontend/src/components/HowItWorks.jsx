import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      desc: "Create your free account in seconds.",
    },
    {
      title: "Add Transactions",
      desc: "Track your income and expenses easily.",
    },
    {
      title: "Get Insights",
      desc: "Understand your spending and save smarter.",
    },
  ];

  return (
    <section className="relative px-8 py-24 bg-[#050505] text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
          >
            The Path to Weightless Finance
          </motion.h2>

          <p className="text-gray-400 text-lg">
            Start managing your wealth in three fluid steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-12 text-center">
          
          {/* Connecting Line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              
              {/* Step Circle */}
              <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md group-hover:border-blue-500/50 transition-colors duration-500">
                
                <span className="text-3xl font-light text-white/40 group-hover:text-white transition-colors">
                  0{index + 1}
                </span>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-semibold mb-4 text-white/90">
                {step.title}
              </h3>

              <p className="text-gray-400 leading-relaxed px-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
