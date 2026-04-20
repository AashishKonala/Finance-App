import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageBtn } from "./TxButtons";

export default function TransactionsPagination({
  page,
  totalPages,
  totalCount,
  rowsPerPage,
  onPageChange,
}) {
  const start = Math.min((page - 1) * rowsPerPage + 1, totalCount);
  const end   = Math.min(page * rowsPerPage, totalCount);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
    .reduce((acc, n, idx, arr) => {
      if (idx > 0 && n - arr[idx - 1] > 1) acc.push("…");
      acc.push(n);
      return acc;
    }, []);

  return (
    <div className="flex justify-between items-center px-5 py-3.5 border-t border-white/[0.05]">
      <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wide">
        Showing {start}–{end} of {totalCount} transactions
      </p>

      <div className="flex items-center gap-1.5">
        <PageBtn
          onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft size={13} />
        </PageBtn>

        {pageNumbers.map((n, i) =>
          n === "…" ? (
            <span key={`e-${i}`} className="text-[10px] font-mono text-gray-600 px-1">…</span>
          ) : (
            <PageBtn key={n} onClick={() => onPageChange(n)} active={page === n}>
              {n}
            </PageBtn>
          )
        )}

        <PageBtn
          onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight size={13} />
        </PageBtn>
      </div>
    </div>
  );
}