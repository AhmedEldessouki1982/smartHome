import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cart';

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--heading)' }}>
            Quote Request
          </h1>
          <p className="text-[var(--text-muted)] mb-8">{items.length} item{items.length !== 1 ? 's' : ''} in your request</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-[var(--border-secondary)] mx-auto mb-4" />
            <p className="text-[var(--text-muted)] text-lg mb-2">Your quote request is empty</p>
            <p className="text-[var(--text-faint)] text-sm mb-6">Browse our products and add items to request pricing</p>
            <Link to="/shop">
              <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] gap-2">
                <ArrowLeft className="w-4 h-4" />
                Browse Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[var(--bg-muted)]"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--text-primary)] truncate text-sm">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 rounded-md border border-[var(--border-primary)] bg-[var(--bg-muted)] p-0.5">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-primary)] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm text-[var(--text-primary)] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-primary)] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--text-muted)] hover:text-[var(--status-red)] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--status-red)] transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 sticky top-24">
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--heading)' }}>
                  Request Summary
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-6">
                  Submit your request and we&apos;ll get back to you with pricing.
                </p>
                <Link to="/checkout">
                  <Button className="w-full h-12 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] font-semibold rounded-lg">
                    Submit Quote Request
                  </Button>
                </Link>
                <Link to="/shop" className="block text-center mt-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  Continue browsing
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
