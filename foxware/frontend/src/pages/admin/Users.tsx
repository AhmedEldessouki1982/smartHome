import { useEffect, useState } from 'react';
import { Shield, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, user: currentUser } = useAuthStore();

  const load = () => {
    if (!token) return;
    api.get<User[]>('/admin/users', token)
      .then(setUsers)
      .catch(() => { setUsers([]); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  const toggleRole = async (userId: string, currentRole: string) => {
    if (!token || userId === currentUser?.id) return;
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      await api.patch(`/admin/users/${userId}`, { role: newRole }, token);
      load();
    } catch {
      // silently fail
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Users</h1>

      {loading ? (
        <div className="h-64 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
      ) : users.length === 0 ? (
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-12 text-center">
          <p className="text-[var(--text-muted)]">Users API endpoint not available yet. Users will appear here once the admin users endpoint is added.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Name</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Email</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Role</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Joined</th>
                <th className="text-right text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-muted)]/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)] font-medium">{u.name}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{u.email}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === 'ADMIN' ? 'bg-amber-500/10 text-amber-600' : 'bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border-primary)]'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{new Date(u.createdAt).toLocaleDateString('en-EG')}</td>
                  <td className="px-6 py-3 text-right">
                    {u.id !== currentUser?.id && (
                      <Button variant="ghost" size="sm" onClick={() => toggleRole(u.id, u.role)}
                        className="gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        {u.role === 'ADMIN' ? <ShieldOff className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                        {u.role === 'ADMIN' ? 'Revoke' : 'Promote'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
