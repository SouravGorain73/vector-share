import { Receipt, ArrowUpDown } from 'lucide-react';

function Transactions() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
          <Receipt size={28} className="text-purple-400" />
          Transactions
        </h1>
        <p className="mt-1 text-gray-400">Your credit purchase and usage history</p>
      </div>

      {/* Empty State */}
      <div className="glass-card p-12 animate-fade-in-up">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-800/60 flex items-center justify-center mb-6">
            <ArrowUpDown size={36} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300">No transactions yet</h3>
          <p className="mt-2 text-gray-500">
            When you purchase credits or upgrade your plan, your transaction history will appear here.
          </p>

          {/* Placeholder table header */}
          <div className="mt-10 border border-gray-800/50 rounded-xl overflow-hidden">
            <div className="bg-gray-800/30 px-5 py-3 flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span className="flex-1 text-left">Transaction</span>
              <span className="w-24 text-center">Amount</span>
              <span className="w-24 text-center">Status</span>
              <span className="w-32 text-right">Date</span>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-5 py-4 border-t border-gray-800/30 flex items-center">
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-8 h-3 bg-gray-800/40 rounded animate-shimmer"></div>
                  <div className="w-32 h-3 bg-gray-800/40 rounded animate-shimmer"></div>
                </div>
                <div className="w-24 flex justify-center">
                  <div className="w-16 h-3 bg-gray-800/40 rounded animate-shimmer"></div>
                </div>
                <div className="w-24 flex justify-center">
                  <div className="w-12 h-3 bg-gray-800/40 rounded animate-shimmer"></div>
                </div>
                <div className="w-32 flex justify-end">
                  <div className="w-20 h-3 bg-gray-800/40 rounded animate-shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
