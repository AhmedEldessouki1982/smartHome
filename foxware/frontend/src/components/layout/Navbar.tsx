import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, ShoppingCart, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../../store/cart';
import { useAuthStore } from '../../store/auth';
import { ThemeToggle } from '../ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/networking', label: 'Networking' },
  { href: '/servers', label: 'Servers' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const count = useCartStore((s) => s.count());
  const { user, logout } = useAuthStore();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[var(--text-primary)] flex items-center justify-center">
            <Zap className="w-4 h-4 text-[var(--bg-primary)]" />
          </div>
          <span className="font-bold text-lg text-[var(--text-primary)]" style={{ fontFamily: 'var(--heading)' }}>
            AL-Mashareq
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors duration-150 ${
                location.pathname === link.href
                  ? 'text-[var(--text-primary)] font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent)] text-[#1A1A1A] text-xs font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--bg-muted)] flex items-center justify-center border border-[var(--border-primary)]">
                  <User className="w-4 h-4" />
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden z-50"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    {user.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--status-red)] hover:bg-[var(--bg-muted)] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">
                  Get started
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
          <div className="md:hidden border-t border-[var(--border-primary)] bg-[var(--bg-primary)]">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === link.href
                      ? 'text-[var(--text-primary)] bg-[var(--bg-muted)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[var(--border-primary)]">
                {user ? (
                  <>
                    {user.role === 'ADMIN' && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/orders" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]">
                      My Orders
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--status-red)] hover:bg-[var(--bg-muted)]">
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                      <Button size="sm" className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">
                        Get started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </header>
  );
}
