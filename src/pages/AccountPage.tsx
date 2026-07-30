import { motion } from 'framer-motion';
import { UserRound, Mail, Hash, Info } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

const fields = [
  { key: 'handle' as const, label: 'Kullanıcı Adı', icon: UserRound, prefix: '@' },
  { key: 'email' as const, label: 'E-posta', icon: Mail },
  { key: 'id' as const, label: 'Kullanıcı Kimliği', icon: Hash },
];

export function AccountPage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return null;
  }

  return (
    <div className="pt-24">
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, var(--brand-tint) 0%, transparent 65%)' }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="badge badge-brand mb-5 w-fit">
              <UserRound size={13} />
              Hesap
            </div>
            <h1
              className="font-extrabold mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', letterSpacing: '-0.02em', color: 'var(--ink-900)' }}
            >
              Hesabım
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: 'var(--ink-500)' }}>
              Hoş geldin, <span className="font-semibold" style={{ color: 'var(--ink-900)' }}>@{user.handle}</span>.
              Hesap bilgilerin aşağıda özetleniyor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 sm:p-6 md:p-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-5" style={{ color: 'var(--ink-400)' }}>
              Profil Bilgileri
            </h2>
            <dl className="flex flex-col gap-5">
              {fields.map(({ key, label, icon: Icon, prefix }) => (
                <div
                  key={key}
                  className="flex items-start gap-4 pb-5 border-b border-[var(--border-subtle)] last:border-0 last:pb-0"
                >
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
                  >
                    <Icon size={16} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-medium mb-1" style={{ color: 'var(--ink-400)' }}>
                      {label}
                    </dt>
                    <dd
                      className="text-sm md:text-base font-semibold break-all"
                      style={{ color: 'var(--ink-900)' }}
                    >
                      {prefix}
                      {user[key]}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
            className="mt-6 rounded-2xl border border-[var(--border-subtle)] px-5 py-4 flex gap-3"
            style={{ background: 'var(--bg-subtle)' }}
            role="note"
          >
            <Info size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-hover)' }} aria-hidden />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>
              Hesap, portföy ve güvenlik özellikleri yakında genişletilecek. Bu sayfa şu an temel profil
              bilgilerinizi gösterir.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
