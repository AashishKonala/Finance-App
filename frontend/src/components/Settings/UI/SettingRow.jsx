export default function SettingRow({ label, description, children, border = true }) {
  return (
    <div className={`flex items-center justify-between py-4 ${border ? "border-b border-white/5" : ""}`}>
      <div className="flex-1 pr-4">
        <p className="text-sm text-white/80 font-medium">{label}</p>
        {description && (
          <p className="text-xs text-white/35 mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
