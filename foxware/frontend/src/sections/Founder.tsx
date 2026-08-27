import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

const links = [
  { icon: Phone, label: 'Phone', value: '+20 128 569 6767', href: 'tel:+201285696767' },
  { icon: Mail, label: 'Email', value: 'ahmed@almashareq.com', href: 'mailto:ahmed@almashareq.com' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with me', href: 'https://wa.me/201285696767', external: true },
  { icon: MapPin, label: 'Based in', value: 'Egypt — nationwide installs' },
];

export function Founder() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
              The installer
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--heading)' }}
            >
              Ahmed Eldessouki
              <span className="block text-base md:text-lg font-medium text-[var(--text-muted)] mt-2">
                Automation Specialist
              </span>
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6 max-w-lg">
              I design and install smart systems across Egypt — homes, offices, and
              warehouses. Hardware you own, networks you control, and a phone number
              that actually answers. Every project starts with a room plan and ends
              with you using it yourself.
            </p>

            <div className="flex flex-wrap gap-3">
              {links.map((l) =>
                l.href ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
                  >
                    <l.icon className="w-4 h-4 text-[var(--accent)]" />
                    {l.value}
                  </a>
                ) : (
                  <span
                    key={l.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] text-sm text-[var(--text-muted)]"
                  >
                    <l.icon className="w-4 h-4 text-[var(--accent)]" />
                    {l.label}: {l.value}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
              <div className="hero-grid" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-24 h-24 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center">
                  <span
                    className="text-3xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: 'var(--heading)' }}
                  >
                    AE
                  </span>
                </div>
                <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-faint)] text-center" style={{ fontFamily: 'var(--mono)' }}>
                  Field photo
                </p>
              </div>
              <div className="absolute bottom-0 inset-x-0 px-5 py-3 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                <p className="text-[11px] text-[var(--text-faint)] text-center" style={{ fontFamily: 'var(--mono)' }}>
                  On-site, Cairo — every install is hands-on
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}