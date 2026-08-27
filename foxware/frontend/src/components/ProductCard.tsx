import { useState } from 'react';
import { ShoppingCart, Wrench, Lightbulb, ShieldCheck, Wifi, Server, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cart';

interface ProductCardProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category?: { name: string; slug: string };
}

interface ProductCardProps {
  product: ProductCardProduct;
}

const PRO_SLUGS = ['networking', 'servers', 'office-security'];
const CATEGORY_ICONS: Record<string, typeof Lightbulb> = {
  'smart-home': Lightbulb,
  'office-security': ShieldCheck,
  networking: Wifi,
  servers: Server,
  automation: Zap,
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [imgError, setImgError] = useState(false);

  const slug = product.category?.slug ?? '';
  const isProfessional = PRO_SLUGS.includes(slug) || Number(product.price) >= 3000;
  const DeviceIcon = CATEGORY_ICONS[slug] ?? Lightbulb;

  return (
    <div className="group h-full">
      <div
        className={`h-full rounded-xl border overflow-hidden transition-colors duration-200 ${
          isProfessional
            ? 'border-[var(--accent-border)] bg-[var(--bg-card)] hover:border-[var(--accent)]'
            : 'border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[var(--accent-border)]'
        }`}
      >
        <div className="relative aspect-square bg-[var(--bg-muted)] overflow-hidden">
          {imgError || !product.images?.[0] ? (
            <div className="w-full h-full relative">
              <div className="hero-grid" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center">
                  <DeviceIcon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <span className="text-[11px] text-[var(--text-faint)] text-center line-clamp-2 max-w-[85%]" style={{ fontFamily: 'var(--mono)' }}>
                  {product.name}
                </span>
              </div>
            </div>
          ) : (
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isProfessional ? (
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent-border)] flex items-center gap-1">
                <Wrench className="w-3 h-3" />
                Pro install
              </span>
            ) : (
              product.category && (
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--bg-card)]/90 text-[var(--text-secondary)] border border-[var(--border-primary)]">
                  {product.category.name}
                </span>
              )
            )}
          </div>
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  id: product.id,
                  name: product.name,
                  image: product.images?.[0] || '',
                });
              }}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] gap-2 rounded-lg"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Request Quote
            </Button>
          </div>
        </div>

        <div className="p-4">
          {product.category && (
            <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--accent)] mb-1.5 font-semibold" style={{ fontFamily: 'var(--mono)' }}>
              {product.category.name}
            </p>
          )}
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 line-clamp-2" style={{ fontFamily: 'var(--heading)' }}>
            {product.name}
          </h3>
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}