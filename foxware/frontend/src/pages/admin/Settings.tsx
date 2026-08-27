import { useEffect, useState } from 'react';
import { Save, Eye, EyeOff, Cpu, DollarSign, Activity } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

export default function AdminSettings() {
  const { token, hasApiKey, setHasApiKey } = useAuthStore();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [tokenUsage, setTokenUsage] = useState<{ totalTokens: number; totalCost: number; totalCalls: number; model: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    api.get<{ hasApiKey: boolean }>('/admin/settings', token).then(d => setHasApiKey(d.hasApiKey)).catch(() => {});
    api.get<{ totalTokens: number; totalCost: number; totalCalls: number; model: string }>('/ai/token-usage', token).then(setTokenUsage).catch(() => {});
  }, [token]);

  const handleSave = async () => {
    if (!token || !apiKey.trim()) return;
    setSaving(true);
    try {
      await api.patch('/admin/settings', { openRouterApiKey: apiKey.trim() }, token);
      setHasApiKey(true);
      setApiKey('');
      setMessage('API key saved');
    } catch {
      setMessage('Failed to save');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Settings</h1>

      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">OpenRouter API Key</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Get a key at{' '}
          <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline">openrouter.ai/keys</a>
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-[var(--text-muted)]">{hasApiKey ? 'Connected' : 'Not configured'}</span>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder={hasApiKey ? 'Enter new key to replace...' : 'sk-or-v1-...'}
              className="w-full h-10 px-4 pr-10 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]/50 transition-all"
            />
            <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button onClick={handleSave} disabled={!apiKey.trim() || saving}
            className="h-10 px-4 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A] text-sm font-medium gap-2 inline-flex items-center transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
        {message && <p className="text-sm text-green-500 mt-2">{message}</p>}
      </div>

      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">AI Token Usage</h2>
        {tokenUsage ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-[var(--bg-muted)] p-4 border border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
                <Activity className="w-4 h-4" /> Total Tokens
              </div>
              <p className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--mono)' }}>
                {tokenUsage.totalTokens.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--bg-muted)] p-4 border border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
                <DollarSign className="w-4 h-4" /> Estimated Cost
              </div>
              <p className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--mono)' }}>
                ~${tokenUsage.totalCost.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--bg-muted)] p-4 border border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
                <Cpu className="w-4 h-4" /> Model
              </div>
              <p className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--mono)' }}>
                {tokenUsage.model}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Configure your API key to see token usage.</p>
        )}
      </div>
    </div>
  );
}
