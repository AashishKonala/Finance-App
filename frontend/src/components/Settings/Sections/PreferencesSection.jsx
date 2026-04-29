import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Camera, Check, Trash2, Download, Mail, Phone, Globe } from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import SettingRow from "../Ui/SettingRow"
import Toggle from "../Ui/Toggle"

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

export default PreferencesSection;