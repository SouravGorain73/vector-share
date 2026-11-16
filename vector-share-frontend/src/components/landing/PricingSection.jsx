import { Check, ArrowRight } from 'lucide-react';

function PricingSection({ pricingPlans }) {
  return (
    <section id="pricing" className="relative py-28 bg-[#111827] text-[#F5F3EB] border-b border-[#E5E3DA]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#E5E3DA]/15 text-xs font-mono text-[#D7FF64] mb-4">
            <span>[02 // ALLOCATION TIERS]</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[#FFFFFF]">
            TRANSPARENT REPOSITORIES.
          </h2>
          <p className="mt-3 text-base text-[#737373] font-sans">
            Predictable bandwidth and dedicated storage quotas. Upgrade or downgrade without locking restrictions.
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan, index) => {
            const isFeatured = plan.highlighted;
            return (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-lg transition-all duration-200 ${
                  isFeatured
                    ? 'bg-[#151F2E] border-2 border-[#D7FF64] shadow-2xl scale-[1.02] z-10'
                    : 'bg-[#0E1522] border border-[#E5E3DA]/15 hover:border-[#E5E3DA]/30'
                }`}
              >
                {isFeatured && (
                  <div className="bg-[#D7FF64] text-[#111827] px-4 py-1.5 text-center text-xs font-mono font-bold uppercase tracking-wider rounded-t-[6px]">
                    ★ Recommended Ingest Specification
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tier Name & Description */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-2xl text-[#FFFFFF]">
                        {plan.name}
                      </h3>
                      <span className="text-xs font-mono text-[#737373]">
                        SPEC_0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-sans text-[#737373]">
                      {plan.description}
                    </p>

                    {/* Numerical Price */}
                    <div className="my-8 pb-6 border-b border-[#E5E3DA]/10">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#FFFFFF]">
                          {plan.price}
                        </span>
                        {plan.price !== '₹0' && (
                          <span className="text-xs font-mono text-[#737373]">/MONTH</span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#737373] block mt-1">
                        {plan.name === 'Free' ? 'NO CREDIT CARD REQUIRED' : 'BILLED MONTHLY • CANCEL ANYTIME'}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-xs font-sans">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isFeatured ? 'bg-[#D7FF64]/20 text-[#D7FF64]' : 'bg-[#151F2E] text-[#737373]'
                          }`}>
                            <Check size={11} />
                          </div>
                          <span className="text-[#F5F3EB]/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action */}
                  <button
                    className={`w-full py-3.5 px-6 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-[#D7FF64] text-[#111827] hover:bg-[#c9f550] shadow-md'
                        : 'bg-[#151F2E] text-[#F5F3EB] border border-[#E5E3DA]/20 hover:border-[#D7FF64] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
