import { Link } from "react-router-dom";
import { ArrowRight, Lock, Camera, Lightbulb, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

const roomDevices = [
  {
    name: "Smart Lock Pro",
    detail: "Keypad + Fingerprint",
    icon: Lock,
    position: "top-[18%] left-[12%]",
    color: "var(--status-green)",
    wireTo: "center",
  },
  {
    name: "Smart LED Bulb",
    detail: "WiFi — 16M colors",
    icon: Lightbulb,
    position: "top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2",
    color: "var(--accent)",
    wireTo: null,
    isCenter: true,
  },
  {
    name: "4K CCTV Camera",
    detail: "Night vision — 30m",
    icon: Camera,
    position: "top-[16%] right-[10%]",
    color: "var(--status-green)",
    wireTo: "center",
  },
  {
    name: "Motion Sensor",
    detail: "PIR — phone alerts",
    icon: Radio,
    position: "bottom-[18%] left-[30%]",
    color: "var(--status-green)",
    wireTo: "center",
  },
];

export function Hero() {
  return (
    <section className="relative bg-[var(--bg-primary)] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p
              className="arabic-wordmark text-[1.75rem] md:text-[2.125rem] leading-none mb-3 text-[var(--text-primary)]"
            >
              المشارق
            </p>
            <p className="text-sm font-medium tracking-wide uppercase text-[var(--accent)] mb-4">
              AL-Mashareq · Smart Home &amp; Office
            </p>
            <p
              className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Automation Specialist · Est. 2019
            </p>
            <h2
              className="font-black tracking-tight mb-5 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--heading)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: '1.1' }}
            >
              Dim the lights. Lock the door. Check the cameras.
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-lg mb-8 leading-relaxed">
              All from your phone. Smart hardware, installed in Egypt &mdash; no
              subscription required.
            </p>

            {/* Signature block — Ahmed Eldessouki */}
            <div className="flex items-center gap-3 mb-8 p-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] max-w-sm">
              <div
                className="w-10 h-10 rounded-full bg-[var(--bg-muted)] border border-[var(--border-primary)] flex items-center justify-center shrink-0"
                style={{ fontFamily: "var(--heading)" }}
              >
                <span className="text-sm font-bold text-[var(--text-secondary)]">
                  AE
                </span>
              </div>
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold text-[var(--text-primary)] leading-tight"
                  style={{ fontFamily: "var(--heading)" }}
                >
                  Ahmed Eldessouki
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-tight">
                  Automation Specialist
                </p>
                <a
                  href="tel:+201285696767"
                  className="text-xs text-[var(--accent)] hover:opacity-80 transition-opacity leading-tight"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  +20 128 569 6767
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] gap-2 h-12 px-8 rounded-lg font-semibold"
                >
                  Work With Us
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-lg"
                >
                  Shop Devices
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: room installation schematic */}
          <div className="lg:justify-self-end w-full max-w-md">
            <div
              className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Schematic header */}
              <div className="px-5 py-3 border-b border-[var(--border-primary)] flex items-center justify-between">
                <span
                  className="text-sm font-semibold text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--heading)" }}
                >
                  Room Installation Plan
                </span>
                <span
                  className="text-xs text-[var(--text-faint)]"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  4 devices
                </span>
              </div>

              {/* Room schematic */}
              <div className="relative px-5 py-6">
                {/* Room outline */}
                <div className="relative w-full aspect-[4/3] border border-dashed border-[var(--border-secondary)] rounded-lg bg-[var(--bg-muted)] bg-opacity-40">
                  {/* Wiring lines — drawn as SVG overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Lines from each device to center (bulb) */}
                    <line
                      x1="60"
                      y1="55"
                      x2="200"
                      y2="115"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <line
                      x1="340"
                      y1="50"
                      x2="200"
                      y2="115"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <line
                      x1="120"
                      y1="245"
                      x2="200"
                      y2="115"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    {/* Door marker */}
                    <rect
                      x="160"
                      y="280"
                      width="80"
                      height="16"
                      rx="2"
                      fill="var(--bg-card)"
                      stroke="var(--border-secondary)"
                      strokeWidth="1"
                    />
                    <line
                      x1="200"
                      y1="280"
                      x2="200"
                      y2="296"
                      stroke="var(--border-secondary)"
                      strokeWidth="1"
                    />
                    <text
                      x="200"
                      y="292"
                      textAnchor="middle"
                      fill="var(--text-faint)"
                      fontSize="8"
                      fontFamily="var(--mono)"
                    >
                      DOOR
                    </text>
                  </svg>

                  {/* Device nodes */}
                  {roomDevices.map((device) => {
                    const Icon = device.icon;
                    return (
                      <div
                        key={device.name}
                        className={`absolute ${device.position}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className="w-10 h-10 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] flex items-center justify-center shadow-sm"
                            title={device.name}
                          >
                            <Icon
                              className="w-4.5 h-4.5"
                              style={{ color: device.color }}
                            />
                          </div>
                          <div className="text-center">
                            <p
                              className="text-[10px] font-medium text-[var(--text-secondary)] leading-tight whitespace-nowrap"
                              style={{ fontFamily: "var(--mono)" }}
                            >
                              {device.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer — install note */}
              <div className="px-5 py-3 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                <p className="text-xs text-[var(--text-muted)] text-center">
                  Every installation starts with a room plan &mdash; we place
                  each device where it works best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
