export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
