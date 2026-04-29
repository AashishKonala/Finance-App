import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Camera, Check, Trash2, Download, Mail, Phone, Moon, Sun, Monitor, Palette } from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import SettingRow from "../Ui/SettingRow"
import Toggle from "../Ui/Toggle"

const AppearanceSection = () => {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("blue");
  const [density, setDensity] = useState("comfortable");
  const [animations, setAnimations] = useState(true);
  const [blur, setBlur] = useState(true);

  const themes = [
    { id: "dark",   icon: Moon,    label: "Dark" },
    { id: "light",  icon: Sun,     label: "Light" },
    { id: "system", icon: Monitor, label: "System" },
  ];

  const accents = [
    { id: "blue",   color: "bg-blue-500" },
    { id: "violet", color: "bg-violet-500" },
    { id: "emerald",color: "bg-emerald-500" },
    { id: "rose",   color: "bg-rose-500" },
    { id: "amber",  color: "bg-amber-500" },
  ];

  const densities = ["compact", "comfortable", "spacious"];

  return (
    <div className="space-y-5">
      <GlassCard className="p-6">
        <SectionHeader icon={Palette} title="Theme" subtitle="Display mode" />
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                theme === id
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
                  : "border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              <Icon size={18} />
              <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={Palette} title="Accent Color" subtitle="UI highlight color" />
        <div className="flex gap-3">
          {accents.map(({ id, color }) => (
            <button
              key={id}
              onClick={() => setAccent(id)}
              className={`w-8 h-8 rounded-xl ${color} transition-all duration-200 ${
                accent === id
                  ? "scale-110 ring-2 ring-white/30 ring-offset-1 ring-offset-[#050505]"
                  : "opacity-50 hover:opacity-80"
              }`}
            />
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={Monitor} title="Display" subtitle="Layout density" />
        <div className="mb-5">
          <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Density</p>
          <div className="grid grid-cols-3 gap-2">
            {densities.map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`py-2 rounded-xl border text-xs font-mono tracking-widest transition-all duration-200 capitalize ${
                  density === d
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
                    : "border-white/10 bg-white/[0.02] text-white/30 hover:border-white/20"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <SettingRow label="Animations" description="Enable motion and transitions">
          <Toggle enabled={animations} onToggle={() => setAnimations(!animations)} />
        </SettingRow>
        <SettingRow label="Blur effects" description="Enable glassmorphism backdrop blur" border={false}>
          <Toggle enabled={blur} onToggle={() => setBlur(!blur)} />
        </SettingRow>
      </GlassCard>
    </div>
  );
};

export default AppearanceSection;