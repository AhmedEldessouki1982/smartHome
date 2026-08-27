import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  category: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { token } = useAuthStore();
  const [form, setForm] = useState({
    name: '', description: '', price: '', originalPrice: '', stock: '0', images: '', categoryId: '',
  });

  const load = () => {
    if (!token) return;
    Promise.all([
      api.get<Product[]>('/products'),
      api.get<Category[]>('/categories', token),
    ]).then(([p, c]) => { setProducts(p); setCategories(c); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', description: '', price: '', originalPrice: '', stock: '0', images: '', categoryId: categories[0]?.id || '' });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description, price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      stock: String(p.stock), images: p.images.join(', '), categoryId: p.category.id,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!token) return;
    const body = {
      name: form.name, description: form.description,
      price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      stock: parseInt(form.stock), images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      categoryId: form.categoryId,
    };
    try {
      if (editingId) {
        await api.patch(`/products/${editingId}`, body, token);
      } else {
        await api.post('/products', body, token);
      }
      setShowModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?') || !token) return;
    await api.delete(`/products/${id}`, token);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
          Products
        </h1>
        <Button onClick={openCreate} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {loading ? (
        <div className="h-64 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
      ) : (
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Product</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Category</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Price</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Stock</th>
                <th className="text-right text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-muted)]/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-[var(--bg-muted)]" />
                      <span className="text-sm text-[var(--text-secondary)] font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{p.category?.name}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                    {Number(p.price).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{p.stock}</td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--status-red)] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-bg)]">
          <div
            className="w-full max-w-lg rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 mx-4"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
                {editingId ? 'Edit' : 'Add'} Product
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Name', placeholder: 'Product name' },
                { key: 'price', label: 'Price (EGP)', placeholder: '99.99', type: 'number' },
                { key: 'originalPrice', label: 'Original Price (optional)', placeholder: '149.99', type: 'number' },
                { key: 'stock', label: 'Stock', placeholder: '0', type: 'number' },
                { key: 'images', label: 'Image URLs (comma separated)', placeholder: 'https://...' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">{field.label}</label>
                  <input
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    type={field.type || 'text'}
                    className="w-full h-10 px-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Description</label>
                <div className="flex gap-2">
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Product description"
                    className="flex-1 h-24 px-4 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 transition-all resize-none"
                  />
                  <button
                    onClick={async () => {
                      if (!token) return;
                      const cat = categories.find(c => c.id === form.categoryId);
                      try {
                        const result = await api.post<{ description: string }>('/ai/generate-description', { name: form.name, categoryName: cat?.name || '' }, token);
                        setForm(prev => ({ ...prev, description: result.description }));
                      } catch {}
                    }}
                    disabled={!form.name || !form.categoryId}
                    className="self-start px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] border border-[var(--border-primary)] hover:border-[var(--accent)] transition-colors disabled:opacity-50"
                    title="Generate description with AI"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 transition-all"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handleSubmit} className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">
                {editingId ? 'Update' : 'Create'} Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
