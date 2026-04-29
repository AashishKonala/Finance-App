import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {User, Camera, Check, Trash2, Download, Mail, Phone, Key, Eye, EyeOff, Shield, Monitor, LogOut, Lock} from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import SettingRow from "../Ui/SettingRow"
import Toggle from "../Ui/Toggle"

const SecuritySection = () => {
  const [showPw, setShowPw] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  const sessions = [
    { device: "MacBook Pro", location: "San Francisco, US", time: "Active now",   current: true },
    { device: "iPhone 15",   location: "San Francisco, US", time: "2 hours ago",  current: false },
    { device: "Chrome / Win","location": "New York, US",    time: "3 days ago",   current: false },
  ];

  return (
    <div className="space-y-5">
      <GlassCard className="p-6">
        <SectionHeader icon={Key} title="Password" subtitle="Authentication" />
        <div className="space-y-4">
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type={showPw ? "text" : "password"}
              placeholder="Current password"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 transition-all duration-200 py-2.5 pl-9 pr-10"
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="New Password" value="" onChange={() => {}} type="password" placeholder="New password" />
            <InputField label="Confirm" value="" onChange={() => {}} type="password" placeholder="Confirm password" />
          </div>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-blue-500/40 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white shadow-lg shadow-blue-500/10 transition-all duration-200 text-sm font-medium">
              Update Password
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={Shield} title="Security Options" subtitle="Account protection" />
        <SettingRow label="Two-factor authentication" description="Require a code from your authenticator app">
          <Toggle enabled={twoFA} onToggle={() => setTwoFA(!twoFA)} />
        </SettingRow>
        <SettingRow label="Biometric login" description="Use Face ID or fingerprint to sign in">
          <Toggle enabled={biometric} onToggle={() => setBiometric(!biometric)} />
        </SettingRow>
        <SettingRow label="Session alerts" description="Email me when a new session is started" border={false}>
          <Toggle enabled={sessionAlerts} onToggle={() => setSessionAlerts(!sessionAlerts)} />
        </SettingRow>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={Monitor} title="Active Sessions" subtitle="Logged-in devices" />
        <div className="space-y-2">
          {sessions.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    s.current ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-white/20"
                  }`}
                />
                <div>
                  <p className="text-sm text-white/70">{s.device}</p>
                  <p className="text-xs text-white/30 font-mono mt-0.5">
                    {s.location} · {s.time}
                  </p>
                </div>
              </div>
              {!s.current && (
                <button className="text-xs text-red-400/60 hover:text-red-400 transition-colors">
                  Revoke
                </button>
              )}
              {s.current && (
                <span className="text-xs text-green-400/60 font-mono uppercase tracking-widest">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-xs text-red-400/60 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5 py-2">
          <LogOut size={12} /> Revoke all other sessions
        </button>
      </GlassCard>
    </div>
  );
};

export default SecuritySection;