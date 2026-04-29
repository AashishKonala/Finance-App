export default function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-white/40">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white/80 py-2.5 px-4"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0d0d0d]">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
