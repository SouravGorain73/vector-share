import { useState } from 'react';
import { Share2, ArrowRight, ShieldCheck, Menu, X, ArrowUpRight, Lock, HardDrive, Cpu } from 'lucide-react';
import { stats } from '../../assets/data';

function HeroSection({ openSignUp, openSignIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#111827] text-[#F5F3EB] border-b border-[#E5E3DA]/10 bg-grid-technical">
      {/* Editorial Navbar */}
      <nav className="navbar-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64]">
                <Share2 size={18} />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight text-[#FFFFFF]">
                  VECTOR<span className="text-[#D7FF64]">SHARE</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest text-[#737373] uppercase">
                  [PROD.26]
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-[#737373]">
              <a href="#features" className="hover:text-[#D7FF64] transition-colors flex items-center gap-1.5">
                <span className="text-[#D7FF64]">01</span> Features
              </a>
              <a href="#pricing" className="hover:text-[#D7FF64] transition-colors flex items-center gap-1.5">
                <span className="text-[#D7FF64]">02</span> Pricing
              </a>
              <a href="#testimonials" className="hover:text-[#D7FF64] transition-colors flex items-center gap-1.5">
                <span className="text-[#D7FF64]">03</span> Reviews
              </a>
            </div>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={openSignIn}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#F5F3EB] hover:text-[#D7FF64] transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="group flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#111827] bg-[#D7FF64] rounded hover:bg-[#c9f550] transition-all duration-200 shadow-sm"
              >
                <span>Initiate Vault</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#737373] hover:text-[#FFFFFF]"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#0E1522] border-b border-[#E5E3DA]/10 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider text-[#737373]">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D7FF64] py-1"
              >
                [01] Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D7FF64] py-1"
              >
                [02] Pricing
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D7FF64] py-1"
              >
                [03] Reviews
              </a>
            </div>
            <div className="pt-4 border-t border-[#E5E3DA]/10 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); openSignIn(); }}
                className="w-full py-2.5 text-xs font-mono uppercase text-[#F5F3EB] border border-[#E5E3DA]/20 rounded"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); openSignUp(); }}
                className="w-full py-2.5 text-xs font-mono font-bold uppercase bg-[#D7FF64] text-[#111827] rounded"
              >
                Initiate Vault
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
            {/* Telemetry Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#151F2E] border border-[#E5E3DA]/15 text-xs font-mono text-[#737373]">
              <span className="w-2 h-2 rounded-full bg-[#D7FF64] animate-pulse" />
              <span className="text-[#F5F3EB]">DISTRIBUTION ENGINE</span>
              <span className="text-[#E5E3DA]/30">|</span>
              <span className="text-[#D7FF64]">E2E ZERO-LEAK</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#FFFFFF]">
              PRECISION <br />
              <span className="italic font-light text-[#D7FF64] underline decoration-[#D7FF64]/40 decoration-1">
                SECURE
              </span>{' '}
              FILE <br />
              ARCHITECTURE.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#737373] max-w-xl font-sans leading-relaxed">
              Engineered for high-integrity transmission. Upload, protect, and distribute digital assets with strict cryptographic provenance, instant tokenized links, and zero telemetry overhead.
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={openSignUp}
                className="group flex items-center justify-center gap-3 px-8 py-4 text-sm font-mono font-bold uppercase tracking-wider text-[#111827] bg-[#D7FF64] hover:bg-[#c9f550] rounded transition-all duration-200 shadow-md cursor-pointer"
              >
                <span>Initiate Encrypted Vault</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={openSignIn}
                className="flex items-center justify-center gap-2 px-7 py-4 text-sm font-mono uppercase tracking-wider text-[#F5F3EB] bg-[#151F2E] hover:bg-[#1E2B3E] border border-[#E5E3DA]/20 hover:border-[#D7FF64] rounded transition-all duration-200 cursor-pointer"
              >
                Authenticate
              </button>
            </div>

            {/* Hairline Feature Tickers */}
            <div className="pt-6 border-t border-[#E5E3DA]/10 grid grid-cols-3 gap-4 text-xs font-mono text-[#737373]">
              <div className="flex items-center gap-2">
                <Lock size={13} className="text-[#D7FF64]" />
                <span>AES-256 GCM</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive size={13} className="text-[#D7FF64]" />
                <span>50MB DIRECT</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={13} className="text-[#D7FF64]" />
                <span>JWT REFRESH</span>
              </div>
            </div>
          </div>

          {/* Right Column (Tactile Architectural Specimen Card) - 5 cols */}
          <div className="lg:col-span-5 animate-scale-in">
            <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 shadow-2xl relative">
              {/* Card Ledger Top Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E3DA]/10 text-xs font-mono text-[#737373]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D7FF64]"></span>
                  SPECIMEN: DELTA_VAULT.ISO
                </span>
                <span className="text-[#D7FF64]">ACTIVE_INGEST</span>
              </div>

              {/* Wireframe Upload Specimen Canvas */}
              <div className="border border-dashed border-[#E5E3DA]/20 rounded-md p-6 bg-[#111827] text-center space-y-3">
                <div className="w-12 h-12 rounded mx-auto bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-[#FFFFFF]">
                    SHA-256 CRYPTOGRAPHIC ANCHOR
                  </div>
                  <div className="text-[11px] font-mono text-[#737373] mt-1">
                    [0x8f4b2a99c018e7d4...39e1f5]
                  </div>
                </div>

                {/* Progress Meter Specimen */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#737373]">ALLOCATION</span>
                    <span className="text-[#D7FF64] font-bold">100% SECURED</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#151F2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D7FF64] rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Architectural Telemetry Matrix */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
                  <div className="text-[10px] text-[#737373] uppercase">TRANSMISSION</div>
                  <div className="text-[#FFFFFF] font-bold mt-0.5">TLS 1.3 / E2E</div>
                </div>
                <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
                  <div className="text-[10px] text-[#737373] uppercase">INTEGRITY</div>
                  <div className="text-[#D7FF64] font-bold mt-0.5">0-KNOWLEDGE</div>
                </div>
              </div>

              {/* Quick Specimen Link Preview */}
              <div className="mt-4 p-3 bg-[#151F2E] border border-[#E5E3DA]/10 rounded flex items-center justify-between text-xs font-mono">
                <span className="text-[#737373] truncate">vectorshare.app/share/delta-token</span>
                <span className="text-[#D7FF64] shrink-0 font-bold ml-2">COPIED</span>
              </div>
            </div>
          </div>

        </div>

        {/* Numbered Stats Strip */}
        <div className="mt-20 pt-10 border-t border-[#E5E3DA]/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-[11px] font-mono text-[#737373]">
                0{i + 1} //
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFFFFF]">
                {stat.value}
              </div>
              <div className="text-xs font-sans text-[#737373]">
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
