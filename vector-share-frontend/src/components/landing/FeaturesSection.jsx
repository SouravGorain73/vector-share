import {
  ArrowUpCircle,
  Clock,
  CreditCard,
  FileText,
  Share2,
  Shield,
  Globe,
  Link,
  ChevronRight,
} from 'lucide-react';

function FeaturesSection({ features }) {
  const renderIcon = (iconName) => {
    const icons = {
      ArrowUpCircle,
      Shield,
      Share2,
      CreditCard,
      FileText,
      Clock,
      Globe,
      Link,
    };
    const Icon = icons[iconName] || FileText;
    return <Icon size={20} className="text-[#D7FF64]" />;
  };

  return (
    <section id="features" className="relative py-28 bg-[#111827] text-[#F5F3EB] border-b border-[#E5E3DA]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#E5E3DA]/15 text-xs font-mono text-[#D7FF64] mb-4">
            <span>[01 // SYSTEM CAPABILITIES]</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[#FFFFFF] leading-tight">
            ENGINEERED FOR <br />
            CRYPTOGRAPHIC PROVENANCE.
          </h2>
          <p className="mt-4 text-base text-[#737373] font-sans leading-relaxed">
            Every layer of VectorShare has been structured to prioritize data custody, seamless distribution mechanics, and frictionless authentication.
          </p>
        </div>

        {/* Numbered Architectural Feature Ledger (Grid with Hairline Borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E5E3DA]/10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 border-r border-b border-[#E5E3DA]/10 bg-[#0E1522]/50 hover:bg-[#151F2E] transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded bg-[#111827] border border-[#E5E3DA]/15 flex items-center justify-center group-hover:border-[#D7FF64]/50 transition-colors">
                    {renderIcon(feature.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#737373] group-hover:text-[#D7FF64] transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#FFFFFF] mb-3 group-hover:text-[#D7FF64] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5E3DA]/5 flex items-center justify-between text-[11px] font-mono text-[#737373]">
                <span className="uppercase tracking-wider">SPEC_LAYER</span>
                <ChevronRight size={14} className="text-[#737373] group-hover:text-[#D7FF64] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;
