const stats = [
  { value: '250+', label: 'Installs completed' },
  { value: '6', label: 'Years active' },
  { value: '140+', label: 'Systems deployed' },
  { value: 'Egypt', label: 'Service area' },
];

export function Stats() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p
                className="text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-none text-[var(--text-primary)] mb-3 tracking-tight"
                style={{ fontFamily: 'var(--heading)' }}
              >
                {s.value}
              </p>
              <p
                className="text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-[var(--accent)]"
                style={{ fontFamily: 'var(--mono)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}