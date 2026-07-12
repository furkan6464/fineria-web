import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ShieldCheck, Lock, Fingerprint, KeyRound, Eye, ServerCog, BadgeCheck } from 'lucide-react';

const securityFeatures = [
  { icon: Lock, title: '256-bit AES Şifreleme', desc: 'Verileriniz banka düzeyinde korunur.' },
  { icon: Fingerprint, title: 'Biyometrik Doğrulama', desc: 'Parmak izi ve yüz tanıma ile giriş.' },
  { icon: KeyRound, title: 'İki Faktörlü Kimlik Doğrulama', desc: 'Her girişte ekstra bir doğrulama adımı.' },
  { icon: Eye, title: 'Gerçek Zamanlı İzleme', desc: '7/24 aktivite takibi ve anlık uyarı.' },
  { icon: ServerCog, title: 'Yedekli Altyapı', desc: 'Kesintisiz, güvenilir erişim.' },
  { icon: ShieldCheck, title: 'Dolandırıcılık Koruması', desc: 'Şüpheli işlemler anında durdurulur.' },
];

const certifications = [
  { name: 'BDDK', label: 'Lisanslı' },
  { name: 'SPK', label: 'Denetiminde' },
  { name: 'KVKK', label: 'Uyumlu' },
  { name: 'ISO 27001', label: 'Sertifikalı' },
];

export function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="guvenlik" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">
            <ShieldCheck size={13} />
            Güvenlik
          </div>
          <h2 className="text-responsive-section font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
            Paranız her zaman güvende
          </h2>
          <p className="text-lg" style={{ color: 'var(--ink-500)' }}>
            Banka düzeyinde güvenlik, uluslararası standartlarda.
          </p>
        </motion.div>

        {/* Certification strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
        >
          {certifications.map((cert) => (
            <div key={cert.name} className="card px-4 py-5 flex flex-col items-center text-center gap-2">
              <BadgeCheck size={20} style={{ color: 'var(--success)' }} />
              <div className="text-sm font-bold" style={{ color: 'var(--ink-900)' }}>{cert.name}</div>
              <div className="text-xs" style={{ color: 'var(--ink-500)' }}>{cert.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Security features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
              className="flex gap-3 p-5 rounded-2xl bg-[var(--bg-subtle)]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--success-tint)' }}>
                <feat.icon size={18} style={{ color: 'var(--success)' }} />
              </div>
              <div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--ink-900)' }}>{feat.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{feat.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
