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
    return <Icon size={20} className="text-accent" />;
  };

  return (
    <section id="features" className="relative py-28 bg-app text-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs font-semibold text-accent mb-4">
            <span>Core Features</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-primary leading-tight">
            Built for effortless, <br />
            secure file sharing.
          </h2>
          <p className="mt-4 text-base text-secondary font-sans leading-relaxed">
            We make uploading, managing, and sharing your files fast, safe, and intuitive — without complicated setups or confusing jargon.
          </p>
        </div>

        {/* Numbered Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 border-r border-b border-border bg-card/70 hover:bg-card-hover transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                    {renderIcon(feature.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-muted group-hover:text-accent transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-primary mb-3 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-medium text-muted">
                <span className="tracking-wide">Explore feature</span>
                <ChevronRight size={14} className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;
