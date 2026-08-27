import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../lib/api';
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

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

export default function Shop() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<ProductItem[]>('/products'),
      api.get<Category[]>('/categories'),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category?.id === selectedCategory;
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>{`Shop — ${SITE_NAME}`}</title>
        <meta name="description" content="Browse smart home and office devices: thermostats, CCTV cameras, access control, mesh WiFi, and self-hosted servers. Request a quote and get pricing from an automation specialist." />
        <link rel="canonical" href={`${SITE_URL}/shop`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`Shop — ${SITE_NAME}`} />
        <meta property="og:description" content="Browse smart home and office devices and request a quote." />
        <meta property="og:url" content={`${SITE_URL}/shop`} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Shop — ${SITE_NAME}`} />
        <meta name="twitter:description" content="Browse smart home and office devices and request a quote." />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
            The catalog
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2"
            style={{ fontFamily: 'var(--heading)' }}
          >
            Shop
          </h1>
          <p className="text-[var(--text-muted)]">Browse smart home and office devices</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-faint)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all"
              style={{ fontFamily: 'var(--mono)' }}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="w-4 h-4 text-[var(--text-faint)] shrink-0" />
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-[var(--accent)] text-[#1A1A1A] border border-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-primary)] hover:border-[var(--border-hover)]'
              }`}
              style={{ fontFamily: 'var(--heading)' }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--accent)] text-[#1A1A1A] border border-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-primary)] hover:border-[var(--border-hover)]'
                }`}
                style={{ fontFamily: 'var(--heading)' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-muted)] overflow-hidden animate-pulse">
                <div className="aspect-square bg-[var(--bg-muted)]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[var(--bg-muted)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--bg-muted)] rounded w-1/2" />
                  <div className="h-5 bg-[var(--bg-muted)] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-lg">No products found</p>
            <p className="text-[var(--text-faint)] text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
