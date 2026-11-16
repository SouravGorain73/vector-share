import { Check, ArrowRight } from 'lucide-react';

function PricingSection({ pricingPlans }) {
  return (
    <section id="pricing" className="relative py-28 bg-app text-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs font-semibold text-accent mb-4">
            <span>Plans & Pricing</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-primary">
            Simple, transparent pricing.
          </h2>
          <p className="mt-3 text-base text-secondary font-sans">
            Choose the plan that fits your storage needs. Upgrade, downgrade, or cancel anytime with no surprises.
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan, index) => {
            const isFeatured = plan.highlighted;
            return (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-xl transition-all duration-200 ${
                  isFeatured
                    ? 'bg-card border-2 border-accent shadow-2xl scale-[1.02] z-10'
                    : 'bg-card border border-border hover:border-accent/40 shadow-sm'
                }`}
              >
                {isFeatured && (
                  <div className="bg-accent text-accent-contrast px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wider rounded-t-[10px]">
                    ★ Most Popular
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tier Name & Description */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-2xl text-primary">
                        {plan.name}
                      </h3>
                      <span className="text-xs font-medium text-muted">
                        Plan {index + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-sans text-secondary">
                      {plan.description}
                    </p>

                    {/* Numerical Price */}
                    <div className="my-8 pb-6 border-b border-border">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-extrabold text-4xl sm:text-5xl text-primary">
                          {plan.price}
                        </span>
                        {plan.price !== '₹0' && (
                          <span className="text-xs font-medium text-muted uppercase">/month</span>
                        )}
                      </div>
                      <span className="text-[11px] font-sans text-muted block mt-1">
                        {plan.name === 'Free' ? 'No credit card required' : 'Billed monthly • Cancel anytime'}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-xs font-sans">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isFeatured ? 'bg-accent/20 text-accent' : 'bg-surface-elevated text-secondary'
                          }`}>
                            <Check size={11} />
                          </div>
                          <span className="text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action */}
                  <button
                    className={`w-full py-3.5 px-6 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-accent text-accent-contrast hover:bg-accent-hover shadow-md'
                        : 'bg-surface-elevated text-primary border border-border hover:border-accent hover:bg-card-hover'
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
