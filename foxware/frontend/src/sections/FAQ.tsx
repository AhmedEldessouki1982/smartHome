const faqs = [
  {
    q: 'How does the install process work?',
    a: 'Free site visit, then a room-by-room plan showing where each device goes. You approve the hardware list and price before any work starts. Installation is typically done in 1-3 days, and we finish with a full walkthrough so you can operate everything yourself.',
  },
  {
    q: 'How do you price a project?',
    a: 'Hardware at list price plus a fixed install fee per device or wiring point. No hourly billing, no surprise add-ons, no subscription required after the job. You get a written quote before we buy or install anything.',
  },
  {
    q: 'Where do you work?',
    a: 'All of Egypt. Cairo and Giza get same-week visits; other governorates are scheduled per project. Larger commercial and warehouse jobs get a dedicated schedule regardless of location.',
  },
  {
    q: 'What is included in the price?',
    a: 'Devices, wiring and mounting, network configuration, app setup on your phone, and operator training. Every install includes 30 days of after-install support. Payment in EGP — Fawry, Vodafone Cash, or card.',
  },
];

export function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
            Before you ask
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
            style={{ fontFamily: 'var(--heading)' }}
          >
            Frequently asked
          </h2>
        </div>

        <div className="border-t border-[var(--border-primary)]">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border-b border-[var(--border-primary)] open:bg-[var(--bg-card)]/60 transition-colors"
            >
              <summary
                className="flex items-center justify-between gap-6 py-5 md:py-6 cursor-pointer list-none select-none text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <span className="text-base md:text-lg font-semibold" style={{ fontFamily: 'var(--heading)' }}>
                  {f.q}
                </span>
                <span
                  className="shrink-0 w-8 h-8 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--accent)] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}