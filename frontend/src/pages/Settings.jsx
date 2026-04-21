import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Bell, Shield, Palette, CreditCard, Globe,
  ChevronRight, Camera, Check, Eye, EyeOff, Smartphone,
  Moon, Sun, Monitor, LogOut, Trash2, Download, Key,
  Mail, Phone, Lock,
} from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";

// ─── Reusable primitives ────────────────────────────────────────────────────

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
      enabled ? "bg-blue-500" : "bg-white/10"
    }`}
  >
    <motion.span
      animate={{ x: enabled ? 20 : 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md block"
    />
  </button>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
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

const SettingRow = ({ label, description, children, border = true }) => (
  <div
    className={`flex items-center justify-between py-4 ${
      border ? "border-b border-white/5" : ""
    }`}
  >
    <div className="flex-1 pr-4">
      <p className="text-sm text-white/80 font-medium">{label}</p>
      {description && (
        <p className="text-xs text-white/35 mt-0.5">{description}</p>
      )}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const InputField = ({ label, value, onChange, type = "text", placeholder, icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-mono uppercase tracking-widest text-white/40">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
        />
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all duration-200 py-2.5 ${
          Icon ? "pl-9 pr-4" : "px-4"
        }`}
      />
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-mono uppercase tracking-widest text-white/40">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white/80 focus:outline-none focus:border-blue-500/40 transition-all duration-200 py-2.5 px-4 appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#0d0d0d]">
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

// ─── Nav tabs ────────────────────────────────────────────────────────────────

const NAV_TABS = [
  { id: "profile",       label: "Profile",       icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security",      label: "Security",      icon: Shield },
  { id: "appearance",    label: "Appearance",    icon: Palette },
  { id: "billing",       label: "Billing",       icon: CreditCard },
  { id: "preferences",   label: "Preferences",   icon: Globe },
];

// ─── Section panels ──────────────────────────────────────────────────────────

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

// ... (NotificationsSection, SecuritySection, AppearanceSection, BillingSection, PreferencesSection remain same)
const NotificationsSection = () => {
  const [settings, setSettings] = useState({
    emailDigest: true,
    transactionAlerts: true,
    goalMilestones: true,
    weeklyReport: false,
    budgetWarnings: true,
    marketUpdates: false,
    pushMobile: true,
    smsAlerts: false,
  });

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const groups = [
    {
      title: "Email Notifications",
      icon: Mail,
      items: [
        { key: "emailDigest",       label: "Daily digest",          desc: "Summary of your daily transactions" },
        { key: "weeklyReport",       label: "Weekly report",         desc: "Detailed weekly financial overview" },
        { key: "goalMilestones",    label: "Goal milestones",       desc: "When you hit a savings milestone" },
        { key: "marketUpdates",     label: "Market updates",        desc: "Investment market alerts" },
      ],
    },
    {
      title: "Push & SMS",
      icon: Smartphone,
      items: [
        { key: "transactionAlerts", label: "Transaction alerts",    desc: "Instant alerts for every transaction" },
        { key: "budgetWarnings",    label: "Budget warnings",       desc: "Alert when nearing budget limits" },
        { key: "pushMobile",        label: "Mobile push",           desc: "Push notifications on your phone" },
        { key: "smsAlerts",         label: "SMS alerts",            desc: "Critical alerts via text message" },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <GlassCard key={group.title} className="p-6">
          <SectionHeader icon={group.icon} title={group.title} subtitle="Manage alerts" />
          {group.items.map((item, i) => (
            <SettingRow
              key={item.key}
              label={item.label}
              description={item.desc}
              border={i < group.items.length - 1}
            >
              <Toggle enabled={settings[item.key]} onToggle={() => toggle(item.key)} />
            </SettingRow>
          ))}
        </GlassCard>
      ))}
    </div>
  );
};

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

const BillingSection = () => {
  const invoices = [
    { date: "Apr 1, 2025",  amount: "$12.00", status: "Paid" },
    { date: "Mar 1, 2025",  amount: "$12.00", status: "Paid" },
    { date: "Feb 1, 2025",  amount: "$12.00", status: "Paid" },
    { date: "Jan 1, 2025",  amount: "$12.00", status: "Paid" },
  ];

  return (
    <div className="space-y-5">
      <GlassCard className="p-6">
        <SectionHeader icon={CreditCard} title="Current Plan" subtitle="Subscription" />
        <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 mb-5">
          <div>
            <p className="text-sm font-medium text-white">Premium Plan</p>
            <p className="text-xs text-white/40 mt-0.5">$12 / month · Renews May 1, 2025</p>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg">
            Active
          </span>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/50 hover:border-white/20 hover:text-white/70 transition-all duration-200">
            Change Plan
          </button>
          <button className="flex-1 py-2 rounded-xl bg-red-500/[0.05] border border-red-500/20 text-xs text-red-400/70 hover:text-red-400 transition-all duration-200">
            Cancel Subscription
          </button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={CreditCard} title="Payment Method" subtitle="Billing details" />
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white/50 tracking-wider">VISA</span>
            </div>
            <div>
              <p className="text-sm text-white/70">•••• •••• •••• 4242</p>
              <p className="text-xs text-white/30 font-mono mt-0.5">Expires 09/27</p>
            </div>
          </div>
          <button className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors">Edit</button>
        </div>
        <button className="w-full py-2.5 rounded-xl bg-white/[0.02] border border-white/10 border-dashed text-xs text-white/30 hover:border-blue-500/30 hover:text-blue-400/60 transition-all duration-200">
          + Add payment method
        </button>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={Download} title="Invoice History" subtitle="Past billing" />
        <div className="space-y-2">
          {invoices.map((inv, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
            >
              <div>
                <p className="text-sm text-white/60">{inv.date}</p>
                <p className="text-xs text-white/30 font-mono mt-0.5">{inv.amount}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-green-400/70 font-mono uppercase tracking-widest">
                  {inv.status}
                </span>
                <button className="text-white/20 hover:text-blue-400 transition-colors">
                  <Download size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

const PreferencesSection = () => {
  const [currency, setCurrency] = useState("usd");
  const [language, setLanguage] = useState("en");
  const [dateFormat, setDateFormat] = useState("mdy");
  const [timezone, setTimezone] = useState("pst");
  const [compactNumbers, setCompactNumbers] = useState(false);
  const [showCents, setShowCents] = useState(true);

  return (
    <div className="space-y-5">
      <GlassCard className="p-6">
        <SectionHeader icon={Globe} title="Locale" subtitle="Regional settings" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Currency"
            value={currency}
            onChange={setCurrency}
            options={[
              { value: "usd", label: "USD — US Dollar" },
              { value: "eur", label: "EUR — Euro" },
              { value: "gbp", label: "GBP — British Pound" },
              { value: "inr", label: "INR — Indian Rupee" },
            ]}
          />
          <SelectField
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
            ]}
          />
          <SelectField
            label="Date Format"
            value={dateFormat}
            onChange={setDateFormat}
            options={[
              { value: "mdy", label: "MM/DD/YYYY" },
              { value: "dmy", label: "DD/MM/YYYY" },
              { value: "ymd", label: "YYYY-MM-DD" },
            ]}
          />
          <SelectField
            label="Timezone"
            value={timezone}
            onChange={setTimezone}
            options={[
              { value: "pst", label: "PST — Pacific Standard" },
              { value: "est", label: "EST — Eastern Standard" },
              { value: "utc", label: "UTC — Universal Time" },
              { value: "ist", label: "IST — India Standard" },
            ]}
          />
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <SectionHeader icon={Globe} title="Display Options" subtitle="Number formatting" />
        <SettingRow label="Compact numbers" description="Show 1.2k instead of 1,200">
          <Toggle enabled={compactNumbers} onToggle={() => setCompactNumbers(!compactNumbers)} />
        </SettingRow>
        <SettingRow label="Show cents" description="Display two decimal places in amounts" border={false}>
          <Toggle enabled={showCents} onToggle={() => setShowCents(!showCents)} />
        </SettingRow>
      </GlassCard>
    </div>
  );
};

const SECTIONS = {
  profile:       <ProfileSection />,
  notifications: <NotificationsSection />,
  security:      <SecuritySection />,
  appearance:    <AppearanceSection />,
  billing:       <BillingSection />,
  preferences:   <PreferencesSection />,
};

// ─── Main page ───────────────────────────────────────────────────────────────

export default function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <div className="flex-1 overflow-y-auto relative transition-all duration-300">
        {/* AUTO-LAYOUT WRAPPER 
          - w-full and max-w-[1400px] allows it to fill the void when sidebar closes
          - px-[5%] creates fluid margins that scale with the window size
        */}
        <div className="w-full max-w-[1400px] px-[5%] py-12">
          
          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-3xl font-medium text-white tracking-tight">Settings</h1>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mt-2">
              Account & Preferences
            </p>
          </div>

          {/* FLEX CONTAINER 
            - Uses gap-[4%] for fluid spacing between nav and content
          */}
          <div className="flex flex-col lg:flex-row gap-[4%]">
            
            {/* Left nav - Adjusted width for better hierarchy */}
            <div className="w-full lg:w-64 shrink-0">
              <nav className="space-y-1.5 sticky top-0">
                {NAV_TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 text-left ${
                      activeTab === id
                        ? "bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="font-medium">{label}</span>
                    {activeTab === id && (
                      <motion.div layoutId="activeGlow" className="ml-auto">
                        <ChevronRight size={14} className="text-blue-400/50" />
                      </motion.div>
                    )}
                  </button>
                ))}

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200">
                    <LogOut size={16} />
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Content Area - Automatically expands to fill 100% of the remaining space */}
            <div className="flex-1 min-w-0 mt-8 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {SECTIONS[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}