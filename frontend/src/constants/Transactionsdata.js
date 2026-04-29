export const ALL_TRANSACTIONS = [
  { id: 1,  name: "Salary Deposit",        desc: "Employer · ACH Transfer",   category: "Income",        date: "Apr 01, 2026", time: "09:00 AM", amount: 7500.00,  type: "credit", status: "completed", icon: "💼" },
  { id: 2,  name: "Zomato Order",           desc: "Food & Dining · UPI",        category: "Food",          date: "Apr 03, 2026", time: "07:45 PM", amount: -42.80,   type: "debit",  status: "completed", icon: "🍜" },
  { id: 3,  name: "Ola Ride",               desc: "Transport · Wallet",         category: "Transport",     date: "Apr 04, 2026", time: "08:12 AM", amount: -14.20,   type: "debit",  status: "completed", icon: "🚗" },
  { id: 4,  name: "Zerodha — NIFTY ETF",   desc: "Investment · Net Banking",   category: "Investment",    date: "Apr 05, 2026", time: "10:30 AM", amount: -500.00,  type: "debit",  status: "completed", icon: "📈" },
  { id: 5,  name: "Amazon Purchase",        desc: "Shopping · Credit Card",     category: "Shopping",      date: "Apr 06, 2026", time: "02:15 PM", amount: -128.99,  type: "debit",  status: "pending",   icon: "🛍️" },
  { id: 6,  name: "Apollo Pharmacy",        desc: "Health · Debit Card",        category: "Health",        date: "Apr 07, 2026", time: "06:00 PM", amount: -35.00,   type: "debit",  status: "completed", icon: "💊" },
  { id: 7,  name: "APSPDCL Electricity",   desc: "Utilities · Auto Debit",     category: "Utility",       date: "Apr 09, 2026", time: "12:00 AM", amount: -62.00,   type: "debit",  status: "completed", icon: "⚡" },
  { id: 8,  name: "Freelance Payment",      desc: "Client · Bank Transfer",     category: "Income",        date: "Apr 10, 2026", time: "11:20 AM", amount: 2340.00,  type: "credit", status: "completed", icon: "💰" },
  { id: 9,  name: "Netflix Subscription",  desc: "Entertainment · Auto Pay",   category: "Entertainment", date: "Apr 12, 2026", time: "03:00 AM", amount: -15.49,   type: "debit",  status: "failed",    icon: "🎬" },
  { id: 10, name: "Starbucks",              desc: "Food & Dining · Card Tap",   category: "Food",          date: "Apr 14, 2026", time: "09:35 AM", amount: -6.80,    type: "debit",  status: "completed", icon: "☕" },
  { id: 11, name: "SIP — Axis Bluechip",   desc: "Mutual Fund · Auto Debit",   category: "Investment",    date: "Apr 15, 2026", time: "08:00 AM", amount: -300.00,  type: "debit",  status: "pending",   icon: "🏦" },
  { id: 12, name: "Dividend Credit",        desc: "HDFC Bank · Dividend",       category: "Income",        date: "Apr 17, 2026", time: "10:00 AM", amount: 3000.00,  type: "credit", status: "completed", icon: "💵" },
  { id: 13, name: "Swiggy Instamart",       desc: "Groceries · UPI",            category: "Food",          date: "Apr 18, 2026", time: "05:30 PM", amount: -89.40,   type: "debit",  status: "completed", icon: "🛒" },
  { id: 14, name: "Gym Membership",         desc: "Health · Standing Order",    category: "Health",        date: "Apr 18, 2026", time: "01:00 PM", amount: -45.00,   type: "debit",  status: "completed", icon: "🏋️" },
  { id: 15, name: "Upstox Brokerage",       desc: "Investment · Debit Card",    category: "Investment",    date: "Apr 19, 2026", time: "02:45 PM", amount: -750.00,  type: "debit",  status: "pending",   icon: "💹" },
  { id: 16, name: "Airtel Postpaid",        desc: "Utilities · Auto Pay",       category: "Utility",       date: "Apr 19, 2026", time: "07:00 AM", amount: -18.99,   type: "debit",  status: "completed", icon: "📱" },
];

export const TABS = ["All", "Income", "Expenses", "Transfers", "Investment"];

export const ROWS_PER_PAGE = 8;

export const CAT_STYLE = {
  Income:        { bg: "bg-emerald-500/10",  text: "text-emerald-400", border: "border-emerald-500/20" },
  Food:          { bg: "bg-orange-500/10",   text: "text-orange-400",  border: "border-orange-500/20"  },
  Transport:     { bg: "bg-blue-500/10",     text: "text-blue-400",    border: "border-blue-500/20"    },
  Shopping:      { bg: "bg-violet-500/10",   text: "text-violet-400",  border: "border-violet-500/20"  },
  Health:        { bg: "bg-emerald-500/10",  text: "text-emerald-400", border: "border-emerald-500/20" },
  Investment:    { bg: "bg-yellow-500/10",   text: "text-yellow-400",  border: "border-yellow-500/20"  },
  Utility:       { bg: "bg-slate-500/10",    text: "text-slate-400",   border: "border-slate-500/20"   },
  Entertainment: { bg: "bg-rose-500/10",     text: "text-rose-400",    border: "border-rose-500/20"    },
};

export const ICON_BG = {
  Income:        "bg-emerald-500/10",
  Food:          "bg-orange-500/10",
  Transport:     "bg-blue-500/10",
  Shopping:      "bg-violet-500/10",
  Health:        "bg-emerald-500/10",
  Investment:    "bg-yellow-500/10",
  Utility:       "bg-slate-500/10",
  Entertainment: "bg-rose-500/10",
};