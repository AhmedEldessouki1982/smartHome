import { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
  recentOrders: Array<{
    id: string;
    total: number;
    status: string;
    createdAt: string;
    user: { name: string; email: string };
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    api.get<Stats>('/admin/stats', token)
      .then(setStats)
      .catch(() => {});
  }, [token]);

  if (!stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Products', value: stats.totalProducts, icon: Package, color: 'text-[var(--accent)]' },
    { label: 'Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Users', value: stats.totalUsers, icon: Users, color: 'text-violet-500' },
    { label: 'Revenue', value: `${Number(stats.revenue).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}`, icon: DollarSign, color: 'text-[var(--status-amber)]' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: 'var(--heading)' }}>
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--text-muted)]">{card.label}</span>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--mono)' }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border-primary)]">
          <h2 className="font-semibold text-[var(--text-primary)]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Order</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Total</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-muted)]/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)]" style={{ fontFamily: 'var(--mono)' }}>
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">{order.user.name}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                    {Number(order.total).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      order.status === 'DELIVERED' ? 'bg-[var(--accent-muted)] text-[var(--accent)]' :
                      order.status === 'CANCELLED' ? 'bg-[var(--status-red)]/10 text-[var(--status-red)]' :
                      'bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border-primary)]'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">
                    {new Date(order.createdAt).toLocaleDateString('en-EG')}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[var(--text-muted)] text-sm">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
