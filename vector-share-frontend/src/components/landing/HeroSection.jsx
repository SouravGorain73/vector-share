import { Share2, ArrowRight, Sparkles } from 'lucide-react';
import { stats } from '../../assets/data';

function HeroSection({ openSignUp, openSignIn }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-purple-600/20 top-[-10%] left-[-10%] animate-orb" />
        <div className="orb w-[400px] h-[400px] bg-indigo-600/15 bottom-[10%] right-[-5%] animate-orb-2" />
        <div className="orb w-[300px] h-[300px] bg-pink-600/10 top-[40%] left-[60%] animate-orb" style={{ animationDelay: '5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Navbar */}
      <nav className="navbar-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Share2 size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">VectorShare</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Reviews</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openSignIn}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 animate-fade-in-up">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Secure file sharing made simple</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <span className="text-white">Share Files with </span>
            <span className="gradient-text-hero">Enterprise-Grade</span>
            <span className="text-white"> Security</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            Upload, manage, and share your files securely. Generate shareable links,
            control visibility, and sign in with Google — all in one beautiful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <button
              onClick={openSignUp}
              className="group flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Start Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 px-8 py-4 text-base font-semibold text-gray-300 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/70 hover:border-gray-600/50 hover:text-white transition-all"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl shadow-purple-500/10">
            {/* Fake browser bar */}
            <div className="bg-gray-900/80 px-4 py-3 flex items-center gap-2 border-b border-gray-800/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-800/60 rounded-lg px-3 py-1 text-xs text-gray-500 max-w-xs mx-auto text-center">
                  vectorshare.app/dashboard
                </div>
              </div>
            </div>
            {/* Dashboard mockup content */}
            <div className="bg-gray-950 p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Files', value: '247', gradient: 'from-purple-500 to-indigo-600' },
                  { label: 'Public', value: '89', gradient: 'from-emerald-500 to-teal-600' },
                  { label: 'Private', value: '158', gradient: 'from-amber-500 to-orange-600' },
                  { label: 'Storage', value: '1.2 GB', gradient: 'from-pink-500 to-rose-600' },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-4">
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded-xl bg-gray-800/30 animate-shimmer" />
                ))}
              </div>
            </div>
          </div>
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
