import { useEffect, useState } from 'react';
import { Eye, X } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; images: string[] };
}

interface Order {
  id: string;
  total: number;
  status: string;
  shipping: Record<string, string> | null;
  createdAt: string;
  user: { id: string; name: string; email: string };
  items: OrderItem[];
}

const statuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { token } = useAuthStore();

  const load = () => {
    if (!token) return;
    api.get<Order[]>('/orders/all', token)
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  const updateStatus = async (orderId: string, status: string) => {
    if (!token) return;
    await api.patch(`/orders/${orderId}`, { status }, token);
    load();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: 'var(--heading)' }}>
        Orders
      </h1>

      {loading ? (
        <div className="h-64 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
      ) : (
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Order</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Total</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Date</th>
                <th className="text-right text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-muted)]/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)]" style={{ fontFamily: 'var(--mono)' }}>
                    #{o.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">{o.user.name}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                    {Number(o.total).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-md border-0 focus:ring-2 focus:ring-[var(--border-focus)]/50 ${
                        o.status === 'DELIVERED' ? 'bg-[var(--accent-muted)] text-[var(--accent)]' :
                        o.status === 'CANCELLED' ? 'bg-[var(--status-red)]/10 text-[var(--status-red)]' :
                        o.status === 'SHIPPED' ? 'bg-violet-500/10 text-violet-500' :
                        'bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border-primary)]'
                      }`}
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{new Date(o.createdAt).toLocaleDateString('en-EG')}</td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => setSelectedOrder(o)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-bg)]">
          <div
            className="w-full max-w-lg rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 mx-4 max-h-[80vh] overflow-y-auto"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
                Order #{selectedOrder.id.slice(0, 8)}
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-[var(--text-muted)]">Customer:</span> <span className="text-[var(--text-secondary)]">{selectedOrder.user.name}</span></div>
                <div><span className="text-[var(--text-muted)]">Email:</span> <span className="text-[var(--text-secondary)]">{selectedOrder.user.email}</span></div>
                <div><span className="text-[var(--text-muted)]">Total:</span> <span className="text-[var(--text-secondary)] font-bold" style={{ fontFamily: 'var(--mono)' }}>
                  {Number(selectedOrder.total).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}
                </span></div>
                <div><span className="text-[var(--text-muted)]">Status:</span> <span className="text-[var(--text-secondary)]">{selectedOrder.status}</span></div>
              </div>
              {selectedOrder.shipping && (
                <div className="rounded-lg bg-[var(--bg-muted)] p-4 text-sm border border-[var(--border-primary)]">
                  <p className="text-[var(--text-muted)] mb-2">Shipping Address:</p>
                  {Object.entries(selectedOrder.shipping).map(([k, v]) => (
                    <p key={k} className="text-[var(--text-secondary)]"><span className="text-[var(--text-muted)] capitalize">{k}:</span> {v}</p>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <p className="text-sm text-[var(--text-muted)]">Items:</p>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-primary)]">
                    <img src={item.product.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-[var(--border-primary)]" />
                    <span className="text-sm text-[var(--text-secondary)] flex-1">{item.product.name}</span>
                    <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: 'var(--mono)' }}>x{item.quantity}</span>
                    <span className="text-sm font-medium text-[var(--text-secondary)]" style={{ fontFamily: 'var(--mono)' }}>
                      {Number(item.price).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
