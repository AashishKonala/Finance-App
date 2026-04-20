import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { ALL_TRANSACTIONS, ROWS_PER_PAGE } from "../components/Transactions/transactionsData";
import TransactionsHeader     from "../components/Transactions/TransactionsHeader";
import TransactionsStatsGrid  from "../components/Transactions/TransactionsStatsGrid";
import TransactionsToolbar    from "../components/Transactions/TransactionsToolbar";
import TransactionsTable      from "../components/Transactions/TransactionsTable";
import TransactionsPagination from "../components/Transactions/TransactionsPagination";
import AddTransactionModal    from "../components/Transactions/AddTransactionModal";
import Sidebar from "../components/dashboard/Sidebar";

export default function Transactions() {
  const [activeTab,   setActiveTab]   = useState("All");
  const [search,      setSearch]      = useState("");
  const [page,        setPage]        = useState(1);
  const [showAdd,     setShowAdd]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => {
    let list = [...ALL_TRANSACTIONS];
    if (activeTab === "Income")     list = list.filter((t) => t.type === "credit");
    if (activeTab === "Expenses")   list = list.filter((t) => t.type === "debit" && t.category !== "Investment");
    if (activeTab === "Investment") list = list.filter((t) => t.category === "Investment");
    if (activeTab === "Transfers")  list = [];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleTabChange = (tab) => { setActiveTab(tab); setPage(1); };
  const handleSearch    = (e)   => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .blink { animation: blink 1.5s infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
      `}</style>

      {/* Sidebar — same position as Dashboard & Goals */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto relative">

        {/* Background aura glows */}
        <div
          className="pointer-events-none absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 p-6 space-y-6">

          {/* Page header */}
          <TransactionsHeader onAddClick={() => setShowAdd(true)} />

          {/* Stats row */}
          <TransactionsStatsGrid transactions={ALL_TRANSACTIONS} />

          {/* Main glass panel — same card style as SavingsGoalCard */}
          <motion.div
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          >
            <TransactionsToolbar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              search={search}
              onSearchChange={handleSearch}
            />
            <TransactionsTable rows={paginated} />
            <TransactionsPagination
              page={page}
              totalPages={totalPages}
              totalCount={filtered.length}
              rowsPerPage={ROWS_PER_PAGE}
              onPageChange={setPage}
            />
          </motion.div>

        </div>
      </div>

      {/* Modal */}
      <AddTransactionModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}