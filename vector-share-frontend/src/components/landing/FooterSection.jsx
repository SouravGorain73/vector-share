import { Share2, Globe, Mail, MessageCircle } from 'lucide-react';
import { footerLinks } from '../../assets/data';

function FooterSection() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50">
      {/* Gradient accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Share2 size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">VectorShare</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-6">
              Secure file sharing platform with enterprise-grade encryption. Upload, manage, and share with confidence.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, href: '#' },
                { icon: Mail, href: '#' },
                { icon: MessageCircle, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/30 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} VectorShare. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Built with ❤️ for secure file sharing
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
