import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Minus, Plus, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cart';
import { api } from '../lib/api';

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
          </div>
        </div>
      </div>
    </div>
  );
}
