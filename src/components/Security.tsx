import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ShieldCheck, Lock, KeyRound, Eye, ServerCog, Fingerprint } from 'lucide-react';

const securityFeatures = [
  { icon: Lock, title: 'Şifreli İletişim', desc: 'Verileriniz güvenli kanallar üzerinden iletilir.' },
  { icon: Fingerprint, title: 'Biyometrik Doğrulama', desc: 'Parmak izi ve yüz tanıma desteği (mobilde).' },
  { icon: KeyRound, title: 'İki Faktörlü Kimlik Doğrulama', desc: 'Her girişte ekstra bir doğrulama adımı.' },
  { icon: Eye, title: 'Aktivite Takibi', desc: 'Hesap hareketlerini izleyin, anında haberdar olun.' },
  { icon: ServerCog, title: 'Yedekli Altyapı', desc: 'Kesintisiz ve güvenilir erişim için tasarlandı.' },
  { icon: ShieldCheck, title: 'Hesap Koruması', desc: 'Şüpheli girişlerde ek doğrulama adımları.' },
];

export function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="guvenlik" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">
            <ShieldCheck size={13} />
            Güvenlik
          </div>
          <h2 className="text-responsive-section font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
            Güvenlik en baştan tasarlandı
          </h2>
          <p className="text-base sm:text-lg" style={{ color: 'var(--ink-500)' }}>
            Hesabınızı ve verilerinizi korumak için modern güvenlik uygulamaları kullanıyoruz.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {securityFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
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
