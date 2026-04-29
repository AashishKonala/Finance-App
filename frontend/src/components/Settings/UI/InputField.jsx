export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-white/40">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] py-2.5 ${
            Icon ? "pl-9 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
