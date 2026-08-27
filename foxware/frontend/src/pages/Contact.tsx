import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-wide uppercase text-[var(--accent)] mb-3">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--heading)' }}>
            Contact Us
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Ready to automate your home or office? Contact Ahmed Eldessouki for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--heading)' }}>
              Ahmed Eldessouki
            </h2>
            <p className="text-sm text-[var(--accent)] font-medium mb-6">Automation Specialist</p>

            <div className="space-y-3">
              {[
                { icon: Phone, label: 'Phone', value: '+20 128 569 6767', href: 'tel:+201285696767' },
                { icon: Mail, label: 'Email', value: 'ahmed@almashareq.com', href: 'mailto:ahmed@almashareq.com' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/201285696767', external: true },
                { icon: MapPin, label: 'Location', value: 'Egypt' },
                { icon: Clock, label: 'Working Hours', value: 'Sat - Thu, 9AM - 6PM' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-faint)]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="text-sm text-[var(--text-primary)] font-medium hover:text-[var(--accent)] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--text-primary)] font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: 'var(--heading)' }}>
              Services
            </h2>

            <div className="space-y-3">
              {[
                { title: 'Smart Home Setup', desc: 'Lighting, thermostats, locks, and Alexa integration — wired and configured.' },
                { title: 'Office Security', desc: 'CCTV cameras, access control panels, motion sensors, and alarm systems.' },
                { title: 'Network Infrastructure', desc: 'WiFi mesh, managed switches, outdoor access points, and cable runs.' },
                { title: 'Server & Storage', desc: 'NAS boxes, rack servers, and local automation hubs — no cloud required.' },
                { title: 'Consultation', desc: 'Free initial visit to assess your space and recommend the right hardware.' },
              ].map((service) => (
                <div key={service.title} className="p-3 rounded-lg border border-[var(--border-primary)] hover:border-[var(--accent-border)] transition-colors">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{service.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)]">
              <p className="text-sm text-[var(--accent)] font-medium mb-1">Free Consultation</p>
              <p className="text-xs text-[var(--text-muted)]">
                Call <a href="tel:+201285696767" className="text-[var(--accent)] hover:opacity-80">+20 128 569 6767</a> or WhatsApp to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
