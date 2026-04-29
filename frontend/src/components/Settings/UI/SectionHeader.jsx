export default function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <Icon size={16} className="text-blue-400" />
      </div>
      <div>
        <h2 className="text-lg font-medium text-white">{title}</h2>
        {subtitle && (
          <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
