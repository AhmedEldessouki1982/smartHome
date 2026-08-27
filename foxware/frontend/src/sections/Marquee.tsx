const tickerItems = [
  'Smart Locks',
  'Networking',
  'Camera Systems',
  'Server Racks',
  'Lighting Control',
  'Install Services',
];

function TickerRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
<span
              className="px-6 md:px-10 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-[var(--text-primary)] dark:text-[var(--accent)]"
              style={{ fontFamily: 'var(--heading)', opacity: 0.75 }}
            >
            {item}
          </span>
          <span className="text-[var(--accent)]" style={{ opacity: 0.4 }} aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee bg-[var(--bg-secondary)] dark:bg-[#161616] border-y border-[var(--border-primary)] py-3 md:py-4" role="presentation">
      <div className="marquee-track">
        <TickerRow />
        <TickerRow hidden />
      </div>
    </div>
  );
}