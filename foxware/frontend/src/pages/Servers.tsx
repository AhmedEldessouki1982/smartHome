import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, Shield, Cpu, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '../lib/api';
import { ProductCard } from '../components/ProductCard';

interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: { id: string; name: string; slug: string };
}

const capabilities = [
  { icon: Cpu, title: 'Local inference', desc: 'Run AI models on your own rack server. No data leaves your network.' },
  { icon: Server, title: 'Rack or tower', desc: '4U rack servers and tower NAS boxes — choose the form factor that fits.' },
  { icon: HardDrive, title: 'RAID storage', desc: 'Multi-bay NAS with RAID redundancy for CCTV footage and automation logs.' },
  { icon: Shield, title: 'No subscription', desc: 'Buy the hardware once. No monthly cloud fees for storage or processing.' },
];

export default function Servers() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    api.get<ProductItem[]>('/products')
      .then((all) => setProducts(all.filter((p) => p.category?.slug === 'servers')))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-wide uppercase text-[var(--accent)] mb-3">Servers</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: 'var(--heading)' }}
          >
            Server Solutions
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Run your own automation server. No cloud required, no subscription fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {capabilities.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center mb-3">
                <f.icon className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5" style={{ fontFamily: 'var(--heading)' }}>{f.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <>
            <h2
              className="text-2xl font-bold text-[var(--text-primary)] mb-6"
              style={{ fontFamily: 'var(--heading)' }}
            >
              Server Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">View All Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
