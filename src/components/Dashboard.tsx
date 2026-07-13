import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

const periods = ['1Sa', '1G', '1H', '1A', '3A', '1Y'];

const generateData = (days: number, start: number) => {
  const data = [];
  let val = start;
  for (let i = 0; i < days; i++) {
    val = val + (Math.random() - 0.42) * (start * 0.02);
    data.push({ t: i, v: Math.max(val, start * 0.7) });
  }
  return data;
};

const datasets: Record<string, { v: number; t: number }[]> = {
  '1Sa': generateData(60, 9100),
  '1G': generateData(24, 9100),
  '1H': generateData(7, 8500),
  '1A': generateData(30, 7500),
  '3A': generateData(90, 6000),
  '1Y': generateData(365, 4000),
};

const portfolioData = [
  { name: 'Hisse Senedi', value: 42, color: '#4F46E5' },
  { name: 'Döviz', value: 28, color: '#0D9488' },
  { name: 'Altın', value: 18, color: '#B45309' },
  { name: 'Kripto', value: 12, color: '#64748B' },
];

const recentTransactions = [
  { type: 'buy', asset: 'THYAO', amount: '150 adet', value: '₺43.110', time: '2 dk önce' },
  { type: 'sell', asset: 'AKBNK', amount: '90 adet', value: '₺4.882', time: '18 dk önce' },
  { type: 'buy', asset: 'ALTIN', amount: '10 gr', value: '₺32.470', time: '1 sa önce' },
  { type: 'buy', asset: 'EUR/TRY', amount: '2.500 €', value: '₺87.950', time: '3 sa önce' },
];

const barData = [
  { name: 'Oca', gelir: 12400, gider: 8200 },
  { name: 'Şub', gelir: 15800, gider: 9100 },
  { name: 'Mar', gelir: 11200, gider: 7800 },
  { name: 'Nis', gelir: 18900, gider: 10200 },
  { name: 'May', gelir: 22100, gider: 11500 },
  { name: 'Haz', gelir: 19800, gider: 9800 },
];

const cardClass = 'bg-white border border-black/[0.04] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6';
const tooltipClass = 'bg-white rounded-2xl px-4 py-3 text-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/[0.04]';

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (active && payload?.length) {
    return (
      <div className={tooltipClass}>
        <div className="font-bold tracking-tight text-slate-900">₺{payload[0].value.toLocaleString('tr-TR')}</div>
      </div>
    );
  }
  return null;
}

export function Dashboard() {
  const [activePeriod, setActivePeriod] = useState<string>('1A');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const data = datasets[activePeriod] || datasets['1A'];
  const lastVal = data[data.length - 1]?.v ?? 0;
  const firstVal = data[0]?.v ?? 1;
  const change = ((lastVal - firstVal) / firstVal) * 100;
  const isPositive = change >= 0;
  const lineColor = isPositive ? '#4F46E5' : '#DC2626';

  return (
    <section id="dashboard" className="py-24 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">Platform Önizleme</div>
          <h2 className="text-responsive-section font-bold tracking-tight text-slate-900 mb-4">
            Tüm finansal verileriniz tek ekranda
          </h2>
          <p className="text-lg text-slate-500">
            Gerçek zamanlı, net raporlama.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`lg:col-span-2 ${cardClass}`}
          >
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <p className="text-sm mb-1 text-slate-500">Portföy Değeri</p>
                <h3 className="text-4xl font-bold tracking-tight font-mono text-slate-900">
                  ₺{lastVal.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  {isPositive ? (
                    <TrendingUp size={16} style={{ color: 'var(--success)' }} />
                  ) : (
                    <TrendingDown size={16} style={{ color: 'var(--danger)' }} />
                  )}
                  <span className="text-sm font-semibold" style={{ color: isPositive ? 'var(--success)' : 'var(--danger)' }}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                  </span>
                  <span className="text-sm text-slate-500">seçili dönemde</span>
                </div>
              </div>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className={
                      activePeriod === p
                        ? 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 bg-white shadow-sm text-slate-900'
                        : 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 text-slate-500 hover:text-slate-700'
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-56" style={{ overflow: 'hidden' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 16, right: 4, bottom: 4, left: 4 }}>
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={lineColor} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[(min: number) => min * 0.98, (max: number) => max * 1.02]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }} wrapperStyle={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }} />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={lineColor}
                    strokeWidth={2.5}
                    fill="url(#dashGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: lineColor, stroke: 'white', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Portfolio breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cardClass}
          >
            <h4 className="font-semibold tracking-tight text-slate-900 mb-4">Dağılım</h4>
            <div style={{ width: '100%', height: 160, overflow: 'hidden' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-sm text-slate-500">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cardClass}
          >
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-semibold tracking-tight text-slate-900">Son İşlemler</h4>
              <button className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--brand-hover)' }}>
                Tümü <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="flex flex-col divide-y divide-slate-100">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        tx.type === 'buy'
                          ? 'bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-md text-xs'
                          : 'bg-rose-50 text-rose-700 font-medium px-2.5 py-1 rounded-md text-xs'
                      }
                    >
                      {tx.type === 'buy' ? 'AL' : 'SAT'}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{tx.asset}</div>
                      <div className="text-xs text-slate-400">{tx.amount}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium tracking-tight text-slate-900">{tx.value}</div>
                    <div className="text-xs text-slate-400">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Income chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`lg:col-span-2 ${cardClass}`}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h4 className="font-semibold tracking-tight text-slate-900">Gelir & Gider Analizi</h4>
                <p className="text-sm mt-1 text-slate-500">Son 6 ay</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#4F46E5' }} />
                  <span className="text-xs text-slate-500">Gelir</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="text-xs text-slate-500">Gider</span>
                </div>
              </div>
            </div>
            <div className="h-44" style={{ overflow: 'hidden' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barGap={4} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: 'rgba(79,70,229,0.06)', stroke: 'none', strokeWidth: 0 }}
                    wrapperStyle={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}
                    content={({ active, payload, label }) => {
                      if (active && payload?.length) {
                        return (
                          <div className={tooltipClass}>
                            <div className="font-semibold mb-2 text-slate-900">{label}</div>
                            <div className="text-[#4F46E5]">Gelir: ₺{payload[0]?.value?.toLocaleString('tr-TR')}</div>
                            <div className="text-slate-500">Gider: ₺{payload[1]?.value?.toLocaleString('tr-TR')}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="gelir" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="gider" fill="#E2E8F0" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
