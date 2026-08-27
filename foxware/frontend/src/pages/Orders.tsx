import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/auth';
import { api } from '../lib/api';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: { name: string; images: string[] };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  PENDING: { icon: Clock, color: 'text-[var(--status-amber)]', label: 'Pending' },
  CONFIRMED: { icon: CheckCircle, color: 'text-blue-500', label: 'Confirmed' },
  SHIPPED: { icon: Truck, color: 'text-violet-500', label: 'Shipped' },
  DELIVERED: { icon: CheckCircle, color: 'text-[var(--status-green)]', label: 'Delivered' },
  CANCELLED: { icon: Package, color: 'text-[var(--status-red)]', label: 'Cancelled' },
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    api.get<Order[]>('/orders', token)
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-muted)]">Please sign in to view your orders</p>
        <Link to="/login">
          <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--heading)' }}>
            My Orders
          </h1>
          <p className="text-[var(--text-muted)] mb-8">Track your order history and status</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-[var(--border-secondary)] mx-auto mb-4" />
            <p className="text-[var(--text-muted)] text-lg mb-2">No orders yet</p>
            <Link to="/shop">
              <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] mt-4">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.PENDING;
              const StatusIcon = status.icon;
              return (
                <div
                  key={order.id}
                  className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-[var(--text-muted)]">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-[var(--text-faint)]">{new Date(order.createdAt).toLocaleDateString('en-EG')}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.product.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-[var(--bg-muted)]" />
                        <span className="text-sm text-[var(--text-muted)] flex-1">{item.product.name}</span>
                        <span className="text-xs text-[var(--text-faint)]" style={{ fontFamily: 'var(--mono)' }}>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
