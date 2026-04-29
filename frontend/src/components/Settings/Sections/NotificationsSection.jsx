import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Camera, Check, Trash2, Download, Mail, Phone, Smartphone } from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import SettingRow from "../Ui/SettingRow"
import Toggle from "../Ui/Toggle"

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

export default NotificationsSection;