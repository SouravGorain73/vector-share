import { pricingPlans } from '../assets/data';
import { Check, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

function Subsciption() {
  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Dossier Header */}
      <div className="pb-6 border-b border-[#E5E3DA]/10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
          [COMMERCE // CAPACITY TIERS]
        </div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight flex items-center gap-3">
          <CreditCard size={26} className="text-[#D7FF64]" />
          STORAGE ALLOCATION TIERS
        </h1>
        <p className="mt-1 text-xs text-[#737373] font-mono">
          SCALE ENCRYPTED CAPACITY • INSTANT PROVISIONING • ZERO LOCK-IN
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64]">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase text-[#737373]">ACTIVE SPECIFICATION</p>
            <p className="font-display font-bold text-lg text-[#FFFFFF]">FREE COMMUNITY REPOSITORY</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#D7FF64]/10 border border-[#D7FF64]/30 text-xs font-mono text-[#D7FF64] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF64] animate-pulse"></span>
          <span>ONLINE // PROVISIONED</span>
        </div>
      </div>

      {/* Plans Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {pricingPlans.map((plan, index) => {
          const isFeatured = plan.highlighted;
          return (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-lg transition-all duration-200 ${
                isFeatured
                  ? 'bg-[#151F2E] border-2 border-[#D7FF64] shadow-2xl scale-[1.02] z-10'
                  : 'bg-[#0E1522] border border-[#E5E3DA]/15 hover:border-[#E5E3DA]/30'
              }`}
            >
              {isFeatured && (
                <div className="bg-[#D7FF64] text-[#111827] px-4 py-1.5 text-center text-xs font-mono font-bold uppercase tracking-wider rounded-t-[6px]">
                  ★ Recommended Specification
                </div>
              )}

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-[#FFFFFF]">
                      {plan.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[#737373]">
                      TIER_0{index + 1}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#737373] font-sans">
                    {plan.description}
                  </p>

                  <div className="my-6 pb-6 border-b border-[#E5E3DA]/10">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#FFFFFF]">
                        {plan.price}
                      </span>
                      {plan.price !== '₹0' && (
                        <span className="text-xs font-mono text-[#737373]">/MONTH</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-xs font-sans">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isFeatured ? 'bg-[#D7FF64]/20 text-[#D7FF64]' : 'bg-[#151F2E] text-[#737373]'
                        }`}>
                          <Check size={11} />
                        </div>
                        <span className="text-[#F5F3EB]/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 px-5 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.name === 'Free'
                      ? 'bg-[#151F2E] text-[#737373] border border-[#E5E3DA]/10 cursor-default'
                      : isFeatured
                        ? 'bg-[#D7FF64] text-[#111827] hover:bg-[#c9f550] shadow-md'
                        : 'bg-[#151F2E] text-[#F5F3EB] border border-[#E5E3DA]/20 hover:border-[#D7FF64]'
                  }`}
                >
                  <span>{plan.name === 'Free' ? 'Current Allotment' : plan.cta}</span>
                  {plan.name !== 'Free' && <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Subsciption;
