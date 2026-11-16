import { useState } from 'react';
import { Share2, ArrowRight, ShieldCheck, Menu, X, ArrowUpRight, Lock, HardDrive } from 'lucide-react';
import { stats } from '../../assets/data';
import ThemeToggle from '../ThemeToggle';

function HeroSection({ openSignUp, openSignIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-app text-primary border-b border-border bg-grid-technical">
      {/* Editorial Navbar */}
      <nav className="navbar-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-accent">
                <Share2 size={18} />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight text-primary">
                  VECTOR<span className="text-accent">SHARE</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest text-muted uppercase">
                  v2.0
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-secondary">
              <a href="#features" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <span className="text-accent font-mono">01</span> Features
              </a>
              <a href="#pricing" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <span className="text-accent font-mono">02</span> Pricing
              </a>
              <a href="#testimonials" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <span className="text-accent font-mono">03</span> Reviews
              </a>
            </div>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={openSignIn}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="group flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-contrast bg-accent rounded-lg hover:bg-accent-hover transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-secondary hover:text-primary cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-card border-b border-border px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider text-secondary">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent py-1"
              >
                [01] Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent py-1"
              >
                [02] Pricing
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent py-1"
              >
                [03] Reviews
              </a>
            </div>
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); openSignIn(); }}
                className="w-full py-2.5 text-xs font-semibold uppercase text-primary border border-border hover:bg-card-hover rounded-lg transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); openSignUp(); }}
                className="w-full py-2.5 text-xs font-bold uppercase bg-accent text-accent-contrast hover:bg-accent-hover rounded-lg transition-colors cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Asymmetric Hero Spread */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Editorial Headline & Proposition) - 7 cols */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            {/* Feature Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-border text-xs text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-primary font-semibold">SIMPLE & SECURE</span>
              <span className="text-muted">|</span>
              <span className="text-accent font-semibold">FAST FILE SHARING</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-primary">
              Simple, fast, <br />
              <span className="italic font-light text-accent underline decoration-accent/40 decoration-1">
                and secure
              </span>{' '}
              file <br />
              sharing.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-secondary max-w-xl font-sans leading-relaxed">
              Upload, store, and share your files with total peace of mind. Create instant sharing links, control who views your files, and keep your data private.
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={openSignUp}
                className="group flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-contrast bg-accent hover:bg-accent-hover rounded-lg transition-all duration-200 shadow-md cursor-pointer"
              >
                <span>Start Sharing Files</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={openSignIn}
                className="flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary bg-surface-elevated hover:bg-card-hover border border-border rounded-lg transition-all duration-200 cursor-pointer"
              >
                Sign In
              </button>
            </div>

            {/* Hairline Feature Tickers */}
            <div className="pt-6 border-t border-border grid grid-cols-3 gap-4 text-xs font-sans text-secondary">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-accent shrink-0" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive size={14} className="text-accent shrink-0" />
                <span>Up to 50MB per file</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 size={14} className="text-accent shrink-0" />
                <span>Instant Sharing Links</span>
              </div>
            </div>
          </div>

          {/* Right Column (Tactile Architectural Preview Card) - 5 cols */}
          <div className="lg:col-span-5 animate-scale-in">
            <div className="bg-card border border-border rounded-xl p-6 shadow-2xl relative">
              {/* Card Top Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-border text-xs text-secondary">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  File: Project-Presentation.pdf
                </span>
                <span className="text-accent font-semibold">Upload Complete</span>
              </div>

              {/* Upload Preview Canvas */}
              <div className="border border-dashed border-border rounded-lg p-6 bg-surface-muted text-center space-y-3">
                <div className="w-12 h-12 rounded-lg mx-auto bg-surface-elevated border border-border flex items-center justify-center text-accent">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-primary">
                    Secure Cloud Storage
                  </div>
                  <div className="text-[11px] text-muted mt-1">
                    Encrypted & Protected
                  </div>
                </div>

                {/* Progress Meter Preview */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-secondary">Upload Status</span>
                    <span className="text-accent font-bold">100% Uploaded</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Security & Privacy Matrix */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-surface-elevated border border-border rounded-lg">
                  <div className="text-[10px] text-muted uppercase font-semibold">Transfer</div>
                  <div className="text-primary font-bold mt-0.5">End-to-End Encrypted</div>
                </div>
                <div className="p-3 bg-surface-elevated border border-border rounded-lg">
                  <div className="text-[10px] text-muted uppercase font-semibold">Privacy</div>
                  <div className="text-accent font-bold mt-0.5">100% Private</div>
                </div>
              </div>

              {/* Quick Share Link Preview */}
              <div className="mt-4 p-3 bg-surface-elevated border border-border rounded-lg flex items-center justify-between text-xs">
                <span className="text-secondary truncate">vectorshare.app/share/sample-link</span>
                <span className="text-accent shrink-0 font-bold ml-2">Copied!</span>
              </div>
            </div>
          </div>

        </div>

        {/* Numbered Stats Strip */}
        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-[11px] font-mono text-muted">
                0{i + 1} //
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-primary">
                {stat.value}
              </div>
              <div className="text-xs font-sans text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
