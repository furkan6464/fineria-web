import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/90 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'py-5 bg-white/0'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/">
            <Logo size={34} showText={true} />
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
            <Link to="/giris" className="text-sm font-semibold px-4 py-2.5" style={{ color: 'var(--ink-900)' }}>
              Giriş Yap
            </Link>
            <Link to="/kayit" className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2">
              Hesap Aç
              <ArrowRight size={16} />
            </Link>
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
            className="fixed inset-x-0 top-[64px] z-40 lg:hidden bg-white border-b border-[var(--border-subtle)] shadow-soft-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
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
                <Link to="/giris" onClick={() => setMobileOpen(false)} className="btn-secondary text-sm text-center">Giriş Yap</Link>
                <Link to="/kayit" onClick={() => setMobileOpen(false)} className="btn-primary text-sm text-center">Hesap Aç</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
