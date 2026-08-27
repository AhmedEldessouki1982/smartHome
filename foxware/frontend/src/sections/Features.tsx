import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Shop',
    desc: 'Consumer smart devices — bulbs, switches, sensors, locks — tested in real Egyptian homes before we stock them.',
    to: '/shop',
  },
  {
    num: '02',
    title: 'Networking',
    desc: 'Mesh WiFi, managed switches, and outdoor APs — designed and installed for whole-building coverage.',
    to: '/networking',
  },
  {
    num: '03',
    title: 'Servers',
    desc: 'Local NAS and rack servers for automations, CCTV storage, and AI — yours, not a subscription.',
    to: '/servers',
  },
  {
    num: '04',
    title: 'Install Services',
    desc: 'Room-by-room installation, configuration, and training. We leave when it works — not when we are tired.',
    to: '/contact',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
              What we do
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'var(--heading)' }}
            >
              Real hardware.
              <br className="hidden md:block" /> Real control.
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed md:text-right">
            Four ways in — one installer, one phone number, one guarantee behind all of them.
          </p>
        </div>

        <div className="border-t border-[var(--border-primary)]">
          {services.map((s) => (
            <Link
              key={s.num}
              to={s.to}
              className="group grid grid-cols-1 md:grid-cols-[120px_1fr_auto] items-start md:items-center gap-3 md:gap-8 py-8 md:py-10 border-b border-[var(--border-primary)] transition-colors duration-200 hover:bg-[var(--bg-card)]/60"
            >
              <span
                className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-none text-[var(--accent)] transition-opacity duration-200 group-hover:opacity-100"
                style={{ fontFamily: 'var(--heading)', opacity: 0.35 }}
              >
                {s.num}
              </span>
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 tracking-tight"
                  style={{ fontFamily: 'var(--heading)' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {s.desc}
                </p>
              </div>
              <ArrowUpRight
                className="w-5 h-5 text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 hidden md:block justify-self-end"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}