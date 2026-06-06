import {
  ArrowUpCircle,
  Clock,
  CreditCard,
  FileText,
  Share2,
  Shield,
  Globe,
  Link,
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
    return <Icon size={24} className="text-white" />;
  };

  return (
    <section id="features" className="relative py-24 bg-gray-950">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[400px] h-[400px] bg-purple-600/8 top-[20%] right-[-10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything you need for <span className="gradient-text">file sharing</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            VectorShare provides all the tools you need to manage and share your digital content securely
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card-landing p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
