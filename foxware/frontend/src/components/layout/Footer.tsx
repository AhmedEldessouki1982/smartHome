import { Link } from 'react-router-dom';
import { Zap, Phone, Mail } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'Smart Home', href: '/shop?category=smart-home' },
    { label: 'Office Security', href: '/shop?category=office-security' },
    { label: 'Networking', href: '/networking' },
    { label: 'Servers', href: '/servers' },
  ],
  Company: [
    { label: 'About', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/' },
  ],
  Support: [
    { label: 'Help Center', href: '/' },
    { label: 'Shipping Info', href: '/' },
    { label: 'Returns', href: '/' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[var(--text-primary)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[var(--bg-primary)]" />
              </div>
              <span className="font-bold text-lg text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
                AL-Mashareq
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Smart hardware, installed in Egypt. Home automation, office security, networking, and servers.
            </p>
            <div className="space-y-2">
              <a href="tel:+201285696767" className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +20 128 569 6767
              </a>
              <a href="mailto:ahmed@almashareq.com" className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                ahmed@almashareq.com
              </a>
            </div>
            <p className="text-xs text-[var(--text-faint)] mt-3">
              Ahmed Eldessouki — Automation Specialist
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-primary)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-faint)]">
            &copy; {new Date().getFullYear()} AL-Mashareq by Ahmed Eldessouki. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-faint)]">
            Smart hardware for Egypt
          </p>
        </div>
      </div>
    </footer>
  );
}
