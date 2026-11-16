import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

function CTASection({ openSignUp }) {
  const navigate = useNavigate();
  const handleSignUp = openSignUp || (() => navigate('/register'));

  return (
    <section className="relative py-28 bg-app text-primary border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-2xl p-10 sm:p-16 relative overflow-hidden shadow-xl">
          
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs font-semibold text-accent">
              <ShieldCheck size={14} />
              <span>Get Started Today</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-primary leading-tight">
              Ready to start <br />
              sharing your files <br />
              securely?
            </h2>

            <p className="text-base text-secondary max-w-xl font-sans leading-relaxed">
              Create your free account in seconds. Upload files, generate shareable links, and keep your data safe.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleSignUp}
                className="group flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent-contrast bg-accent hover:bg-accent-hover rounded-lg transition-all duration-200 shadow-md cursor-pointer"
              >
                <span>Create Free Account</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-xs text-muted text-center sm:text-left font-sans">
                No credit card required • Includes 5 free uploads
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTASection;
