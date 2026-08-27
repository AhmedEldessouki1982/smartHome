import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ArrowLeft, Minus, Plus, Wrench, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cart';
import { api } from '../lib/api';
import {
  SITE_NAME,
  OG_IMAGE_URL,
  productUrl,
  shareTextPreview,
  buildWhatsAppShare,
  buildFacebookShare,
  buildTwitterShare,
} from '../lib/seo';

interface ProductData {
  id: string;
  name: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  category: { id: string; name: string; slug: string };
}

function truncate(s: string, n = 157) {
  const clean = s.replace(/\s+/g, ' ').trim();
  return clean.length > n ? `${clean.slice(0, n).trimEnd()}…` : clean;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get<ProductData>(`/products/${id}`)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-muted)]">Product not found</p>
        <Link to="/shop">
          <Button variant="outline" className="gap-2 border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)]">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const isProfessional =
    ['networking', 'servers', 'office-security'].includes(product.category?.slug ?? '') ||
    Number(product.price) >= 3000;

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <html lang="en" />
        <title>{`${product.name} — ${SITE_NAME}`}</title>
        <meta name="description" content={product.description ? truncate(product.description) : product.name} />
        <link rel="canonical" href={productUrl(product.id)} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`${product.name} — ${SITE_NAME}`} />
        <meta property="og:description" content={product.description ? truncate(product.description) : product.name} />
        <meta property="og:url" content={productUrl(product.id)} />
        <meta property="og:image" content={product.images?.[0] || OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description ? truncate(product.description) : product.name} />
        <meta name="twitter:image" content={product.images?.[0] || OG_IMAGE_URL} />
      </Helmet>
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-muted)] border border-[var(--border-primary)]">
              {imgError || !product.images?.[0] ? (
                <div className="w-full h-full relative">
                  <div className="hero-grid" aria-hidden="true" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                    <div className="w-16 h-16 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <span className="text-sm text-[var(--text-faint)] text-center">{product.category?.name}</span>
                    <span className="text-xs text-[var(--text-faint)] text-center max-w-[80%]" style={{ fontFamily: 'var(--mono)' }}>
                      {product.name}
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-[var(--accent)] font-medium mb-2">
              {product.category?.name}
            </span>
            <h1
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4"
              style={{ fontFamily: 'var(--heading)' }}
            >
              {product.name}
            </h1>
            <div className="space-y-4 mb-6">
              <p className="text-[var(--text-muted)] leading-relaxed">{product.description}</p>
              {product.descriptionAr && (
                <p className="text-[var(--text-muted)] leading-relaxed text-right" dir="rtl" style={{ fontFamily: 'var(--arabic)' }}>
                  {product.descriptionAr}
                </p>
              )}
            </div>

            {isProfessional && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)] w-fit">
                <Wrench className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm text-[var(--accent)] font-medium">Professional installation available</span>
              </div>
            )}

            <p className="text-sm text-[var(--text-muted)] mb-6">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-muted)] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-[var(--text-primary)] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  image: product.images?.[0] || '',
                })}
                className="flex-1 h-12 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] font-semibold rounded-lg gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Request Quote
              </Button>
            </div>

            <div className="border-t border-[var(--border-primary)] pt-6 space-y-3">
              {['30-day return policy', 'Secure checkout with Fawry support'].map((text) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[var(--border-primary)]">
              <p className="text-xs font-medium tracking-wide uppercase text-[var(--text-faint)] mb-3">Share</p>
              <div className="flex items-center gap-2">
                <a
                  href={buildWhatsAppShare(shareTextPreview(product.name, productUrl(product.id)))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-primary)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={buildFacebookShare(productUrl(product.id))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={buildTwitterShare(product.name, productUrl(product.id))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
