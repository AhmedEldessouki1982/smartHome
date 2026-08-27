import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { token } = useAuthStore();
  const [form, setForm] = useState({ name: '', slug: '' });

  const load = () => {
    if (!token) return;
    api.get<Category[]>('/categories', token)
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  const handleSubmit = async () => {
    if (!token) return;
    try {
      if (editingId) {
        await api.patch(`/categories/${editingId}`, form, token);
      } else {
        await api.post('/categories', form, token);
      }
      setShowModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?') || !token) return;
    await api.delete(`/categories/${id}`, token);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
          Categories
        </h1>
        <Button onClick={() => { setEditingId(null); setForm({ name: '', slug: '' }); setShowModal(true); }}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {loading ? (
        <div className="h-64 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
      ) : (
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Name</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Slug</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Products</th>
                <th className="text-right text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-muted)]/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)] font-medium">{c.name}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]" style={{ fontFamily: 'var(--mono)' }}>{c.slug}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{c._count?.products ?? 0}</td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => { setEditingId(c.id); setForm({ name: c.name, slug: c.slug }); setShowModal(true); }}
                      className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--status-red)] transition-colors">
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
            className="w-full max-w-md rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 mx-4"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
                {editingId ? 'Edit' : 'Add'} Category
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Category name"
                  className="w-full h-10 px-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="smart-home"
                  className="w-full h-10 px-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 transition-all" />
              </div>
              <Button onClick={handleSubmit} className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">
                {editingId ? 'Update' : 'Create'} Category
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
