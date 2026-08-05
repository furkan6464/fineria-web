import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function AuthLoadingScreen() {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-3 px-6"
      style={{ background: 'var(--bg-page)' }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2
        size={22}
        className="animate-spin"
        style={{ color: 'var(--brand-hover)' }}
        aria-hidden
      />
      <p className="text-sm font-medium" style={{ color: 'var(--ink-500)' }}>
        {t.authLoading.message}
      </p>
    </div>
  );
}
