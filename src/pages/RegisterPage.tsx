import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, BarChart3, BrainCircuit, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import macbookMockup from '@/assets/app-mockups/macbook-transparent.webp';
import { isApiError } from '@/lib/api';
import {
  authService,
  validateEmail,
  validateHandle,
  validatePassword,
  validatePasswordConfirmation,
} from '@/services/authService';

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

type FieldErrors = {
  handle?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({ handle: '', email: '', password: '', confirm: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = (field: string, hasError?: boolean) => ({
    background: focused === field ? 'var(--brand-tint)' : 'white',
    border: `1px solid ${hasError ? '#F87171' : focused === field ? '#A5B4FC' : 'var(--border-subtle)'}`,
  });

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const handleError = validateHandle(form.handle);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmError = validatePasswordConfirmation(form.password, form.confirm);
    const termsError = accepted ? null : 'Devam etmek için kullanım koşullarını kabul etmelisiniz.';

    setFieldErrors({
      handle: handleError ?? undefined,
      email: emailError ?? undefined,
      password: passwordError ?? undefined,
      confirm: confirmError ?? undefined,
      terms: termsError ?? undefined,
    });

    if (handleError || emailError || passwordError || confirmError || termsError) return;

    setLoading(true);
    try {
      await authService.register({
        handle: form.handle,
        email: form.email,
        password: form.password,
      });
      navigate('/giris', {
        replace: true,
        state: {
          registered: true,
          message: 'Kayıt başarılı. Giriş yapabilirsiniz.',
        },
      });
    } catch (error) {
      if (isApiError(error)) {
        if (error.code === 'EMAIL_ALREADY_EXISTS') {
          setFieldErrors((prev) => ({ ...prev, email: error.message || 'Bu e-posta zaten kayıtlı.' }));
        } else if (error.code === 'HANDLE_ALREADY_EXISTS') {
          setFieldErrors((prev) => ({ ...prev, handle: error.message || 'Bu kullanıcı adı alınmış.' }));
        } else if (error.code === 'TOO_MANY_REQUESTS' || error.status === 429) {
          setFormError(error.message || 'Çok fazla deneme yapıldı. Lütfen sonra tekrar deneyin.');
        } else if (error.code === 'VALIDATION_ERROR' || error.status === 400) {
          setFormError(error.message || 'Girilen bilgiler geçersiz.');
        } else if (error.code === 'NETWORK_ERROR') {
          setFormError(error.message);
        } else {
          setFormError(error.message || 'Kayıt tamamlanamadı. Lütfen tekrar deneyin.');
        }
      } else {
        setFormError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

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

          {formError && (
            <div
              className="mb-4 rounded-xl px-3.5 py-3 text-sm"
              style={{ background: '#FEF2F2', color: '#B91C1C' }}
              role="alert"
            >
              {formError}
            </div>
          )}

          <motion.form {...fadeUp(0.12)} className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>Kullanıcı Adı</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'handle' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                <input
                  type="text"
                  value={form.handle}
                  onChange={e => {
                    setForm({ ...form, handle: e.target.value });
                    clearFieldError('handle');
                  }}
                  onFocus={() => setFocused('handle')}
                  onBlur={() => setFocused(null)}
                  placeholder="kullanici_adi"
                  autoComplete="username"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ ...inputStyle('handle', !!fieldErrors.handle), color: 'var(--ink-900)' }}
                />
              </div>
              {fieldErrors.handle && (
                <p className="mt-1.5 text-xs" style={{ color: '#B91C1C' }}>{fieldErrors.handle}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>E-posta</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'email' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => {
                    setForm({ ...form, email: e.target.value });
                    clearFieldError('email');
                  }}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="ornek@fineria.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ ...inputStyle('email', !!fieldErrors.email), color: 'var(--ink-900)' }}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs" style={{ color: '#B91C1C' }}>{fieldErrors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>Şifre</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'password' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => {
                      setForm({ ...form, password: e.target.value });
                      clearFieldError('password');
                    }}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ ...inputStyle('password', !!fieldErrors.password), color: 'var(--ink-900)' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-400)' }} aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}>
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs" style={{ color: '#B91C1C' }}>{fieldErrors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-500)' }}>Tekrar</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'confirm' ? 'var(--brand-hover)' : 'var(--ink-400)' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => {
                      setForm({ ...form, confirm: e.target.value });
                      clearFieldError('confirm');
                    }}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ ...inputStyle('confirm', !!fieldErrors.confirm), color: 'var(--ink-900)' }}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-400)' }} aria-label={showConfirm ? 'Şifreyi gizle' : 'Şifreyi göster'}>
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.confirm && (
                  <p className="mt-1.5 text-xs" style={{ color: '#B91C1C' }}>{fieldErrors.confirm}</p>
                )}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                onClick={() => {
                  if (loading) return;
                  setAccepted(!accepted);
                  clearFieldError('terms');
                }}
                className="mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  width: 18,
                  height: 18,
                  background: accepted ? 'var(--brand)' : 'white',
                  border: `1px solid ${fieldErrors.terms ? '#F87171' : accepted ? 'var(--brand)' : 'var(--border-strong)'}`,
                }}
                role="checkbox"
                aria-checked={accepted}
              >
                {accepted && <CheckCircle2 size={11} color="white" />}
              </div>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>
                <span style={{ color: 'var(--brand-hover)' }}>Kullanım Koşulları</span>'nı ve{' '}
                <span style={{ color: 'var(--brand-hover)' }}>Gizlilik Politikası</span>'nı okudum, kabul ediyorum.
              </span>
            </label>
            {fieldErrors.terms && (
              <p className="-mt-2 text-xs" style={{ color: '#B91C1C' }}>{fieldErrors.terms}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-1 disabled:opacity-70">
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  Ücretsiz Başla
                  <ArrowRight size={17} />
                </>
              )}
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
        <div className="absolute -inset-24 rounded-full opacity-80" style={{ background: 'radial-gradient(ellipse, #E0E7FF 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 38%, rgba(99,102,241,0.14) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-[520px]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <img
              src={macbookMockup}
              alt="Fineria uygulama ekranı"
              className="w-full h-auto relative z-10"
              style={{ filter: 'drop-shadow(0 25px 20px rgba(30,27,75,0.18)) drop-shadow(0 45px 60px rgba(30,27,75,0.22))' }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl"
              style={{ bottom: '-8px', width: '72%', height: '28px', background: 'radial-gradient(ellipse, rgba(30,27,75,0.28) 0%, transparent 75%)' }}
            />
          </motion.div>

          <div className="flex flex-col gap-5 w-full">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--brand-hover)' }}>
                Ücretsiz planda neler var?
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2.5">
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

            <div className="grid grid-cols-4 gap-2.5">
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
