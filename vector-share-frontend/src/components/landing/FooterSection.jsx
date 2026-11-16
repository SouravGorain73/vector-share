import { Share2, Globe, Mail, MessageCircle } from 'lucide-react';
import { footerLinks } from '../../assets/data';

function FooterSection() {
  return (
    <footer className="relative bg-surface-muted text-primary border-t border-border font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* Brand Dossier */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-accent">
                <Share2 size={16} />
              </div>
              <span className="font-display font-bold text-base tracking-tight text-primary">
                VECTOR<span className="text-accent">SHARE</span>
              </span>
            </div>
            <p className="text-xs text-secondary max-w-sm leading-relaxed font-sans">
              Secure, modern file sharing made simple. Upload your files, generate instant links, and maintain total control over your shared content.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Mail, href: '#', label: 'Contact' },
                { icon: MessageCircle, href: '#', label: 'Community' },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Directory Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-xs text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Footer Base */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            &copy; {new Date().getFullYear()} VectorShare. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              All Systems Operational
            </span>
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
