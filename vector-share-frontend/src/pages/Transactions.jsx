import { Receipt, ArrowUpDown, ShieldCheck } from 'lucide-react';

function Transactions() {
  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Dossier Header */}
      <div className="pb-6 border-b border-[#E5E3DA]/10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
          [ACCOUNTING // SETTLEMENT AUDIT]
        </div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight flex items-center gap-3">
          <Receipt size={26} className="text-[#D7FF64]" />
          TRANSACTION & INVOICE LEDGER
        </h1>
        <p className="mt-1 text-xs text-[#737373] font-mono">
          IMMUTABLE SETTLEMENT RECORDS • CRYPTOGRAPHIC RECEIPT VERIFICATION
        </p>
      </div>

      {/* Architectural Ledger Container */}
      <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-8 sm:p-12 shadow-2xl">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded bg-[#151F2E] border border-[#E5E3DA]/20 flex items-center justify-center text-[#737373] mb-4">
            <ArrowUpDown size={24} />
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
            [LEDGER // ZERO COMMITS]
          </div>
          <h3 className="font-display font-extrabold text-xl text-[#FFFFFF]">
            No Invoiced Settlements Located
          </h3>
          <p className="mt-2 text-xs font-mono text-[#737373] leading-relaxed">
            When you purchase supplementary capacity quotas or upgrade repository specifications, cryptographic settlement proofs will be recorded here.
          </p>

          {/* Architectural Skeleton Table Ledger */}
          <div className="mt-8 border border-[#E5E3DA]/10 rounded overflow-hidden">
            <div className="bg-[#111827] px-4 py-3 flex items-center text-[10px] font-mono uppercase text-[#737373] tracking-wider border-b border-[#E5E3DA]/10">
              <span className="flex-1 text-left">TRANSACTION REFERENCE</span>
              <span className="w-20 text-center">QUANTITY</span>
              <span className="w-24 text-center">CLEARANCE</span>
              <span className="w-28 text-right">TIMESTAMP</span>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-4 py-3.5 border-t border-[#E5E3DA]/5 flex items-center">
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-6 h-2 bg-[#151F2E] rounded animate-shimmer" />
                  <div className="w-28 h-2 bg-[#151F2E] rounded animate-shimmer" />
                </div>
                <div className="w-20 flex justify-center">
                  <div className="w-12 h-2 bg-[#151F2E] rounded animate-shimmer" />
                </div>
                <div className="w-24 flex justify-center">
                  <div className="w-16 h-2 bg-[#151F2E] rounded animate-shimmer" />
                </div>
                <div className="w-28 flex justify-end">
                  <div className="w-20 h-2 bg-[#151F2E] rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-[#737373]">
            <ShieldCheck size={13} className="text-[#D7FF64]" />
            <span>FINANCIAL INTEGRITY ASSURED</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Transactions;
