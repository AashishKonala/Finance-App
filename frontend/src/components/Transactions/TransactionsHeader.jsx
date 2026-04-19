import { Download, SlidersHorizontal, Plus } from "lucide-react";
import { GlassButton, PrimaryButton } from "./TxButtons";

export default function TransactionsHeader({ onAddClick }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-xl text-blue-500 font-medium">Transactions</h1>
        {/* <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mt-0.5">
          Ledger // April 2026
        </p> */}
      </div>

      <div className="flex items-center gap-2.5">
        <GlassButton icon={<Download size={13} />}          label="Export CSV" />
        <GlassButton icon={<SlidersHorizontal size={13} />} label="Filter" />
        <PrimaryButton
          icon={<Plus size={14} />}
          label="Add Transaction"
          onClick={onAddClick}
        />
      </div>
    </div>
  );
}