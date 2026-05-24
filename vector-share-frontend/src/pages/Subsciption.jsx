import React from 'react';
import { pricingPlans } from '../assets/data';
import { Check, CreditCard, Sparkles } from 'lucide-react';

function Subsciption() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
          <CreditCard size={28} className="text-purple-400" />
          Subscription Plans
        </h1>
        <p className="mt-1 text-gray-400">Choose the plan that's right for you</p>
      </div>

      {/* Current Plan */}
      <div className="glass-card p-6 mb-8 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Sparkles size={22} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Current Plan</p>
            <p className="text-lg font-bold text-white">Free Plan</p>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`glass-card overflow-hidden animate-fade-in-up transition-all duration-300 hover:scale-[1.02] ${
              plan.highlighted
                ? 'ring-2 ring-purple-500/50 shadow-xl shadow-purple-500/10'
                : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            {plan.highlighted && (
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-center">
                <span className="text-sm font-semibold text-white">Most Popular</span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.price !== '₹0' && <span className="text-gray-400 text-sm">/month</span>}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-500/15 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-purple-400" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-8 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                    : 'bg-gray-800/50 text-gray-200 border border-gray-700/50 hover:border-purple-500/30 hover:bg-gray-800/70'
                }`}
              >
                {plan.name === 'Free' ? 'Current Plan' : plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subsciption;
