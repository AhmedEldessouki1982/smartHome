import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '../store/theme';

const themes = [
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'dark' as const, icon: Moon, label: 'Dark' },
  { value: 'system' as const, icon: Monitor, label: 'System' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="relative flex items-center rounded-lg border border-[var(--border-primary)] bg-[var(--bg-muted)] p-0.5">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={label}
          className="relative z-10 flex items-center justify-center w-8 h-8 rounded-md transition-colors"
        >
          {theme === value && (
            <span className="absolute inset-0 rounded-md bg-[var(--accent-muted)] border border-[var(--accent-border)]" />
          )}
          <Icon className={`relative z-10 w-4 h-4 transition-colors ${
            theme === value ? 'text-[var(--accent)]' : 'text-[var(--text-faint)] hover:text-[var(--text-primary)]'
          }`} />
        </button>
      ))}
    </div>
  );
}
