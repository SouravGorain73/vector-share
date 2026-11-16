import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

function CTASection({ openSignUp }) {
  const navigate = useNavigate();
  const handleSignUp = openSignUp || (() => navigate('/register'));

  return (
    <section className="relative py-28 bg-[#111827] text-[#F5F3EB] border-b border-[#E5E3DA]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-10 sm:p-16 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#E5E3DA]/15 text-xs font-mono text-[#D7FF64]">
              <ShieldCheck size={14} />
              <span>[04 // IMMEDIATE REPOSITORY ACCESS]</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#FFFFFF] leading-tight">
              COMMENCE <br />
              HIGH-INTEGRITY <br />
              DISTRIBUTION.
            </h2>

            <p className="text-base text-[#737373] max-w-xl font-sans">
              Deploy your encrypted storage space in seconds. Experience fast upload conduits, granular visibility controls, and verifiable link generation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleSignUp}
                className="group flex items-center justify-center gap-3 px-8 py-4 text-xs font-mono font-bold uppercase tracking-wider text-[#111827] bg-[#D7FF64] hover:bg-[#c9f550] rounded transition-all duration-200 shadow-md cursor-pointer"
              >
                <span>Initiate Free Vault</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-xs font-mono text-[#737373] text-center sm:text-left">
                No credit card • Free 5-file allotment
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTASection;
