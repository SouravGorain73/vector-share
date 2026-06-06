import { Check } from 'lucide-react';

function PricingSection({ pricingPlans }) {
  return (
    <section id="pricing" className="relative py-24 bg-gray-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[400px] h-[400px] bg-indigo-600/8 bottom-[10%] left-[-5%]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden animate-fade-in-up ${
                plan.highlighted ? 'pricing-popular' : ''
              }`}
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className={`relative z-10 h-full flex flex-col glass-card overflow-hidden ${
                plan.highlighted ? 'shadow-xl shadow-purple-500/10' : ''
              }`}>
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2.5 text-center">
                    <span className="text-sm font-semibold text-white">Most Popular</span>
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-1.5 text-sm text-gray-400">{plan.description}</p>
                  <div className="mt-6 mb-8">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    {plan.price !== '₹0' && <span className="text-gray-500 text-sm ml-1">/month</span>}
                  </div>

                  <ul className="space-y-3.5 flex-1">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted ? 'bg-purple-500/20' : 'bg-gray-800'
                        }`}>
                          <Check size={12} className={plan.highlighted ? 'text-purple-400' : 'text-gray-400'} />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full mt-8 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:from-purple-600 hover:to-indigo-700'
                        : 'bg-gray-800/60 text-gray-200 border border-gray-700/50 hover:border-purple-500/30 hover:bg-gray-800/80'
                    }`}
                  >
                    {plan.name === 'Free' ? 'Current Plan' : plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
