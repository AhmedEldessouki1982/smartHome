import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cart';
import { api } from '../lib/api';
import { SITE_NAME } from '../lib/seo';

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/quotes', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          image: i.image,
          quantity: i.quantity,
        })),
      });
      clearCart();
      navigate('/quote-confirmation');
    } catch {
      alert('Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-muted)]">Your quote request is empty</p>
        <Link to="/shop">
          <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">Browse Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>{`Submit Quote Request — ${SITE_NAME}`}</title>
        <meta name="description" content="Submit your quote request. AL-Mashareq will contact you with pricing for the smart home and office devices you selected." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Quote Request
        </Link>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8" style={{ fontFamily: 'var(--heading)' }}>
          Submit Quote Request
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Your Information</h2>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Ahmed Ali', required: true },
                { key: 'email', label: 'Email', placeholder: 'ahmed@example.com', type: 'email', required: true },
                { key: 'phone', label: 'Phone Number', placeholder: '+20 1XX XXX XXXX', required: true },
                { key: 'message', label: 'Message (optional)', placeholder: 'Tell us about your project or requirements...', multiline: true },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{field.label}</label>
                  {field.multiline ? (
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 focus:border-[var(--border-focus)] transition-all resize-none"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full h-10 px-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 focus:border-[var(--border-focus)] transition-all"
                    />
                  )}
                </div>
              ))}
              <Button type="submit" disabled={loading} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] mt-4 gap-2">
                <Send className="w-4 h-4" />
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--heading)' }}>
                Items Requested
              </h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-[var(--bg-muted)]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)] truncate">{item.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border-primary)] mt-4 pt-4">
                <p className="text-sm text-[var(--text-muted)]">
                  We&apos;ll contact you with pricing for these items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
