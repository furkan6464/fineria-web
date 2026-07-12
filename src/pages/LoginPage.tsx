import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import loginScreenMockup from '@/assets/app-mockups/login-screen.webp';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
});

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyle = (field: string) => ({
    background: focused === field ? 'var(--brand-tint)' : 'white',
    border: `1px solid ${focused === field ? '#A5B4FC' : 'var(--border-subtle)'}`,
  });

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Form */}
      <div className="w-full lg:w-[46%] flex flex-col justify-center px-8 md:px-16 xl:px-20 py-12 relative z-10">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Link to="/">
            <Logo size={34} showText />
          </Link>
        </motion.div>

        <div className="max-w-[360px]">
          <motion.div {...fadeUp(0.05)}>
            <h1 className="font-extrabold mb-1" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--ink-900)' }}>
              Hoş geldiniz
            </h1>
            <p className="text-sm mb-7" style={{ color: 'var(--ink-500)' }}>
              Hesabınıza giriş yapın ve yatırımlarınızı yönetin.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="flex gap-3 mb-5">
            <button
              className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]"
              style={{ color: 'var(--ink-900)' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google ile devam et
            </button>
            <button
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]"
              style={{ color: 'var(--ink-900)' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            <span className="text-xs" style={{ color: 'var(--ink-400)' }}>ya da e-posta ile</span>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </motion.div>

          <motion.form {...fadeUp(0.15)} className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>E-posta</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'email' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="ornek@fineria.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ ...inputStyle('email'), color: 'var(--ink-900)' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--ink-500)' }}>Şifre</label>
                <Link to="#" className="text-xs font-medium" style={{ color: 'var(--brand-hover)' }}>Şifremi unuttum</Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'password' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ ...inputStyle('password'), color: 'var(--ink-900)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--ink-400)' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-1">
              Giriş Yap
              <ArrowRight size={17} />
            </button>
          </motion.form>

          <motion.p {...fadeUp(0.3)} className="text-center text-sm mt-6" style={{ color: 'var(--ink-500)' }}>
            Hesabın yok mu?{' '}
            <Link to="/kayit" className="font-semibold" style={{ color: 'var(--brand-hover)' }}>Üye ol →</Link>
          </motion.p>
        </div>
      </div>

      {/* Right: Product showcase */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center bg-[var(--bg-subtle)] border-l border-[var(--border-subtle)]">
        <div className="absolute -inset-24 rounded-full opacity-70" style={{ background: 'radial-gradient(ellipse, #EEF2FF 0%, transparent 65%)' }} />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <img src={loginScreenMockup} alt="Fineria giriş ekranı" className="w-[320px] h-auto drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-5 mt-8"
          >
            {([
              [ShieldCheck, 'BDDK Lisanslı'],
              [Zap, '256-bit Şifreleme'],
              [TrendingUp, 'Gerçek Zamanlı'],
            ] as const).map(([Icon, label], i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--ink-500)' }}>
                <Icon size={13} style={{ color: 'var(--brand-hover)' }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
