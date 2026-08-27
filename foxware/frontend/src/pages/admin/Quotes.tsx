import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  items: Array<{ name: string; quantity?: number }>;
  status: string;
  createdAt: string;
}

interface Score {
  score: number;
  priority: string;
  reason: string;
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoring, setScoring] = useState<Record<string, boolean>>({});
  const [scores, setScores] = useState<Record<string, Score>>({});
  const { token } = useAuthStore();

  const load = () => {
    if (!token) return;
    api.get<Quote[]>('/quotes', token)
      .then(setQuotes)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  const handleScore = async (quoteId: string) => {
    if (!token) return;
    setScoring(prev => ({ ...prev, [quoteId]: true }));
    try {
      const result = await api.post<Score>('/ai/score-quote', { quoteId }, token);
      setScores(prev => ({ ...prev, [quoteId]: result }));
    } catch {}
    setScoring(prev => ({ ...prev, [quoteId]: false }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (score >= 5) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-gray-400';
      default: return 'text-[var(--text-muted)]';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Quotes</h1>

      {loading ? (
        <div className="h-64 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] animate-pulse" />
      ) : (
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Email</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Items</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">AI Score</th>
                <th className="text-left text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Date</th>
                <th className="text-right text-xs font-medium text-[var(--text-muted)] uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-muted)]/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-[var(--text-secondary)] font-medium">{q.name}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{q.email}</td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{q.items.length}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      q.status === 'CLOSED' ? 'bg-[var(--accent-muted)] text-[var(--accent)]' :
                      q.status === 'CONTACTED' ? 'bg-violet-500/10 text-violet-500' :
                      'bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border-primary)]'
                    }`}>{q.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    {scores[q.id] ? (
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getScoreColor(scores[q.id].score)}`}>
                          {scores[q.id].score}/10
                        </span>
                        <span className={`text-xs font-medium ${getPriorityColor(scores[q.id].priority)}`}>
                          {scores[q.id].priority}
                        </span>
                        <span className="text-xs text-[var(--text-faint)] max-w-[200px] truncate" title={scores[q.id].reason}>
                          {scores[q.id].reason}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[var(--text-faint)]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-muted)]">{new Date(q.createdAt).toLocaleDateString('en-EG')}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleScore(q.id)}
                      disabled={scoring[q.id]}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors disabled:opacity-50"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${scoring[q.id] ? 'animate-pulse' : ''}`} />
                      {scoring[q.id] ? 'Scoring...' : 'Score'}
                    </button>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[var(--text-muted)] text-sm">
                    No quotes yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
