import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Camera, Check, Trash2, Download, Mail, Phone, CreditCard } from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import SettingRow from "../Ui/SettingRow"
import Toggle from "../Ui/Toggle"

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

export default BillingSection;