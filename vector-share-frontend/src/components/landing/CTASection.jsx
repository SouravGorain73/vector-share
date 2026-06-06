import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

function CTASection({ openSignUp }) {
  const navigate = useNavigate();
  const handleSignUp = openSignUp || (() => navigate('/register'));

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-purple-900/20 animate-gradient" />
        <div className="orb w-[400px] h-[400px] bg-purple-600/15 top-[-20%] left-[30%]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card p-10 sm:p-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">Start for free</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to share files <span className="gradient-text">securely</span>?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of users who trust VectorShare for their file sharing needs. Create your account in seconds.
          </p>

          <button
            onClick={handleSignUp}
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Get Started Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
