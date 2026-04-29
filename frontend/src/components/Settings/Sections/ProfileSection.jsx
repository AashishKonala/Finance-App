import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Camera, Check, Trash2, Download, Mail, Phone } from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import SettingRow from "../Ui/SettingRow"
import Toggle from "../Ui/Toggle"


const ProfileSection = () => {
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [phone, setPhone] = useState("+1 (555) 000-1234");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <SectionHeader icon={User} title="Profile Information" subtitle="Personal details" />
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/10 border border-blue-500/20 flex items-center justify-center text-2xl font-medium text-blue-300">
              AM
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-blue-500 border border-[#050505] flex items-center justify-center hover:bg-blue-400 transition-colors">
              <Camera size={11} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-white/40 mt-0.5">Premium Plan · Member since Jan 2023</p>
            <button className="text-xs text-blue-400 hover:text-blue-300 mt-1.5 transition-colors">
              Change avatar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Full Name" value={name} onChange={setName} icon={User} placeholder="Your name" />
          <InputField label="Email" value={email} onChange={setEmail} type="email" icon={Mail} placeholder="your@email.com" />
          <InputField label="Phone" value={phone} onChange={setPhone} icon={Phone} placeholder="+1 (555) 000-0000" />
          <SelectField
            label="Country"
            value="us"
            onChange={() => {}}
            options={[
              { value: "us", label: "United States" },
              { value: "gb", label: "United Kingdom" },
              { value: "in", label: "India" },
              { value: "ca", label: "Canada" },
            ]}
          />
        </div>
        <div className="flex justify-end mt-5">
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 border border-blue-500/40 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white shadow-lg shadow-blue-500/10 transition-all duration-200 text-sm font-medium"
          >
            <AnimatePresence mode="wait">
              {saved ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={14} /> Saved
                </motion.span>
              ) : (
                <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Save Changes
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </GlassCard>

      <GlassCard className="p-6 border-red-500/10">
        <SectionHeader icon={Trash2} title="Danger Zone" subtitle="Irreversible actions" />
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <p className="text-sm text-white/70">Export all data</p>
              <p className="text-xs text-white/30 mt-0.5">Download a copy of your account data</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
              <Download size={12} /> Export
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/[0.03] border border-red-500/10">
            <div>
              <p className="text-sm text-red-400/80">Delete account</p>
              <p className="text-xs text-white/30 mt-0.5">Permanently remove your account and data</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 bg-red-500/[0.05] border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors">
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProfileSection;