import { Share2, Globe, Mail, MessageCircle } from 'lucide-react';
import { footerLinks } from '../../assets/data';

function FooterSection() {
  return (
    <footer className="relative bg-[#0E1522] text-[#F5F3EB] border-t border-[#E5E3DA]/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* Brand Dossier */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64]">
                <Share2 size={16} />
              </div>
              <span className="font-display font-bold text-base tracking-tight text-[#FFFFFF]">
                VECTOR<span className="text-[#D7FF64]">SHARE</span>
              </span>
            </div>
            <p className="text-xs text-[#737373] max-w-sm leading-relaxed font-sans">
              Cryptographically verified asset transmission infrastructure. Engineered with tokenized delivery channels, strict bearer token handling, and end-to-end security.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Globe, href: '#' },
                { icon: Mail, href: '#' },
                { icon: MessageCircle, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded bg-[#111827] border border-[#E5E3DA]/15 flex items-center justify-center text-[#737373] hover:text-[#D7FF64] hover:border-[#D7FF64]/40 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Directory Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64]">
                [{section}]
              </h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-xs text-[#737373] hover:text-[#FFFFFF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Technical Ledger Base */}
        <div className="mt-14 pt-8 border-t border-[#E5E3DA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#737373]">
          <p>
            &copy; {new Date().getFullYear()} VECTORSHARE SYSTEMS. VERIFIED PROTOCOL V2.6
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF64]" />
              NET: SECURE
            </span>
            <span>TLS 1.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
