import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, BarChart3, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import loginScreenMockup from '@/assets/app-mockups/login-screen.webp';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
});

const benefits = [
  { icon: BarChart3, title: 'Gerçek Zamanlı Piyasalar', desc: 'BIST, kripto ve döviz anlık takibi' },
  { icon: BrainCircuit, title: 'Tahminleme Araçları', desc: 'Veri destekli fiyat yönü analizi' },
  { icon: ShieldCheck, title: 'BDDK Güvencesi', desc: 'Lisanslı ve denetlenen altyapı' },
  { icon: Sparkles, title: '30 Gün Ücretsiz', desc: 'Kredi kartı gerektirmeden deneyin' },
];

const freeFeatures = ['Sınırsız portföy takibi', 'Anlık fiyat bildirimleri', 'Temel analizler', 'Mobil uygulama erişimi'];

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const inputStyle = (field: string) => ({
    background: focused === field ? 'var(--brand-tint)' : 'white',
    border: `1px solid ${focused === field ? '#A5B4FC' : 'var(--border-subtle)'}`,
  });

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Form */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-14 xl:px-20 py-12 relative z-10">
        <motion.div {...fadeUp(0)} className="mb-8">
          <Link to="/"><Logo size={34} showText /></Link>
        </motion.div>

        <div className="max-w-[400px]">
          <motion.div {...fadeUp(0.05)} className="mb-6">
            <div className="badge badge-brand mb-3 w-fit">
              <Sparkles size={12} />
              30 gün ücretsiz deneyin
            </div>
            <h1 className="font-extrabold mb-1.5" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--ink-900)' }}>
              Hesap oluşturun
            </h1>
            <p className="text-sm" style={{ color: 'var(--ink-500)' }}>
              Dakikalar içinde başlayın. Kredi kartı gerekmez.
            </p>
          </motion.div>

          <motion.form {...fadeUp(0.12)} className="flex flex-col gap-3.5" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>Ad Soyad</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'name' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Adınız Soyadınız"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ ...inputStyle('name'), color: 'var(--ink-900)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>E-posta</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'email' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="ornek@fineria.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ ...inputStyle('email'), color: 'var(--ink-900)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>Şifre</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'password' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ ...inputStyle('password'), color: 'var(--ink-900)' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-400)' }}>
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>Tekrar</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'confirm' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => setForm({ ...form, confirm: e.target.value })}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ ...inputStyle('confirm'), color: 'var(--ink-900)' }}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-400)' }}>
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                onClick={() => setAccepted(!accepted)}
                className="mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  width: 18,
                  height: 18,
                  background: accepted ? 'var(--brand)' : 'white',
                  border: `1px solid ${accepted ? 'var(--brand)' : 'var(--border-strong)'}`,
                }}
              >
                {accepted && <CheckCircle2 size={11} color="white" />}
              </div>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>
                <Link to="#" style={{ color: 'var(--brand-hover)' }}>Kullanım Koşulları</Link>'nı ve{' '}
                <Link to="#" style={{ color: 'var(--brand-hover)' }}>Gizlilik Politikası</Link>'nı okudum, kabul ediyorum.
              </span>
            </label>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-1">
              Ücretsiz Başla
              <ArrowRight size={17} />
            </button>
          </motion.form>

          <motion.p {...fadeUp(0.35)} className="text-center text-sm mt-5" style={{ color: 'var(--ink-500)' }}>
            Zaten hesabın var mı?{' '}
            <Link to="/giris" className="font-semibold" style={{ color: 'var(--brand-hover)' }}>Giriş yap →</Link>
          </motion.p>
        </div>
      </div>

      {/* Right: Product showcase */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center bg-[var(--bg-subtle)] border-l border-[var(--border-subtle)] px-10">
        <div className="absolute -inset-24 rounded-full opacity-70" style={{ background: 'radial-gradient(ellipse, #EEF2FF 0%, transparent 65%)' }} />

        <div className="relative z-10 flex items-center gap-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <img src={loginScreenMockup} alt="Fineria giriş ekranı" className="w-[300px] h-auto drop-shadow-2xl" />
          </motion.div>

          <div className="flex flex-col gap-5 max-w-[220px]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--brand-hover)' }}>
                Ücretsiz planda neler var?
              </div>
              <div className="flex flex-col gap-2.5">
                {freeFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--success-tint)' }}>
                      <CheckCircle2 size={11} style={{ color: 'var(--success)' }} />
                    </div>
                    <span className="text-xs" style={{ color: 'var(--ink-700)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-2.5">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                  className="card p-3"
                >
                  <b.icon size={14} className="mb-2" style={{ color: 'var(--brand-hover)' }} />
                  <p className="text-xs font-semibold leading-tight mb-0.5" style={{ color: 'var(--ink-900)' }}>{b.title}</p>
                  <p className="leading-relaxed" style={{ color: 'var(--ink-500)', fontSize: '11px' }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
