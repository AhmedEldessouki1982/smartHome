import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Globe, Wifi, Shield, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '../lib/api';
import { ProductCard } from '../components/ProductCard';
import { SITE_NAME, SITE_URL, OG_IMAGE_URL } from '../lib/seo';

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
  { icon: Globe, title: 'Self-hosted', desc: 'Your network, your data. No third-party cloud required for device management.' },
  { icon: Wifi, title: 'Mesh WiFi', desc: 'Whole-building coverage with tri-band mesh. Smart devices never drop offline.' },
  { icon: Shield, title: 'VLAN segmentation', desc: 'Separate guest, IoT, and office traffic on managed switches.' },
  { icon: Server, title: 'Outdoor range', desc: 'IP67-rated access points for courtyards, warehouses, and parking areas.' },
];

export default function Networking() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    api.get<ProductItem[]>('/products')
      .then((all) => setProducts(all.filter((p) => p.category?.slug === 'networking')))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>{`Networking Solutions — ${SITE_NAME}`}</title>
        <meta name="description" content="WiFi mesh, managed switches, and IP67 outdoor access points for smart home and office. Self-hosted, no third-party cloud, installed and configured on-site in Egypt." />
        <link rel="canonical" href={`${SITE_URL}/networking`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`Networking Solutions — ${SITE_NAME}`} />
        <meta property="og:description" content="WiFi mesh, managed switches, and outdoor access points — configured on install." />
        <meta property="og:url" content={`${SITE_URL}/networking`} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Networking Solutions — ${SITE_NAME}`} />
        <meta name="twitter:description" content="WiFi mesh, managed switches, and outdoor access points — configured on install." />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-wide uppercase text-[var(--accent)] mb-3">Networking</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: 'var(--heading)' }}
          >
            Networking Solutions
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            WiFi mesh, managed switches, and outdoor access points — configured on install.
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
              Networking Products
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
