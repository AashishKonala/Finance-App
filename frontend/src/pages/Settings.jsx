import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Bell, Shield, Palette, CreditCard, Globe,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import SettingsNav from "../components/settings/SettingsNav";

import ProfileSection from "../components/settings/sections/ProfileSection";
import NotificationsSection from "../components/settings/sections/NotificationsSection";
import SecuritySection from "../components/settings/sections/SecuritySection";
import AppearanceSection from "../components/settings/sections/AppearanceSection";
import BillingSection from "../components/settings/sections/BillingSection";
import PreferencesSection from "../components/settings/sections/PreferencesSection";

const NAV_TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "preferences", label: "Preferences", icon: Globe },
];

const SECTIONS = {
  profile: <ProfileSection />,
  notifications: <NotificationsSection />,
  security: <SecuritySection />,
  appearance: <AppearanceSection />,
  billing: <BillingSection />,
  preferences: <PreferencesSection />,
};

export default function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 overflow-y-auto p-10">
        <div className="flex gap-10">
          
          <div className="w-64">
            <SettingsNav
              tabs={NAV_TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {SECTIONS[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
