import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuthStore } from '@/stores/authStore';

const navItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Özellikler', href: '/ozellikler' },
  { label: 'Piyasalar', href: '/piyasalar' },
  { label: 'Tahminleme', href: '/tahminleme' },
  { label: 'Fiyatlandırma', href: '/fiyatlar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, [location.pathname]);

  // Menü açıkken arka planın kaymasını engelle.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      // clearAuth runs synchronously at the start of logout(); navigate
      // immediately so history moves before the network round-trip.
      const logoutPromise = logout();
      navigate('/', { replace: true });
      await logoutPromise;
    } finally {
      setLoggingOut(false);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'py-3 bg-white/95 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'py-4 bg-white/0 sm:py-5'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <Logo size={30} showText={true} className="sm:hidden" />
            <Logo size={34} showText={true} className="hidden sm:flex" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--brand-hover)' : 'var(--ink-700)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: 'var(--brand)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm font-semibold px-2" style={{ color: 'var(--ink-900)' }}>
                  @{user.handle}
                </span>
                <Link
                  to="/hesabim"
                  className="text-sm font-semibold px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)] transition-colors"
                  style={{ color: location.pathname === '/hesabim' ? 'var(--brand-hover)' : 'var(--ink-900)' }}
                >
                  Hesabım
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="text-sm font-semibold px-4 py-2.5 flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)] transition-colors disabled:opacity-70"
                  style={{ color: 'var(--ink-900)' }}
                >
                  <LogOut size={15} />
                  {loggingOut ? 'Çıkış...' : 'Çıkış Yap'}
                </button>
              </>
            ) : (
              <>
                <Link to="/giris" className="text-sm font-semibold px-4 py-2.5" style={{ color: 'var(--ink-900)' }}>
                  Giriş Yap
                </Link>
                <Link to="/kayit" className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2">
                  Hesap Aç
                  <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--ink-900)]"
            aria-label="Menü"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 max-h-[calc(100dvh-60px)] overflow-y-auto overscroll-contain border-b border-[var(--border-subtle)] bg-white shadow-soft-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5 sm:px-6 sm:py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-subtle)]"
                  style={{ color: location.pathname === item.href ? 'var(--brand-hover)' : 'var(--ink-700)' }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="text-sm font-semibold px-1" style={{ color: 'var(--ink-900)' }}>
                      @{user.handle}
                    </div>
                    <Link
                      to="/hesabim"
                      onClick={() => setMobileOpen(false)}
                      className="btn-secondary text-sm text-center"
                      style={{ color: location.pathname === '/hesabim' ? 'var(--brand-hover)' : undefined }}
                    >
                      Hesabım
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="btn-secondary text-sm text-center disabled:opacity-70"
                    >
                      {loggingOut ? 'Çıkış...' : 'Çıkış Yap'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/giris" onClick={() => setMobileOpen(false)} className="btn-secondary text-sm text-center">Giriş Yap</Link>
                    <Link to="/kayit" onClick={() => setMobileOpen(false)} className="btn-primary text-sm text-center">Hesap Aç</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
