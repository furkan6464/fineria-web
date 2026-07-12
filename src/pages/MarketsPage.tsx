import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  AreaChart, Area, ComposedChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown, Search, Star, Activity } from 'lucide-react';

function generateOHLCV(days: number, startPrice: number, volatility = 0.02) {
  const data = [];
  let price = startPrice;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * volatility;
    const open = price;
    const close = price * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    const volume = Math.floor(Math.random() * 15000000 + 3000000);
    data.push({
      date: date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
      bull: close >= open,
    });
    price = close;
  }
  return data;
}

const stocks = [
  { symbol: 'AKBNK', name: 'Akbank T.A.Ş.', price: 52.40, change: 2.18, sector: 'Bankacılık', data: generateOHLCV(60, 48, 0.022) },
  { symbol: 'THYAO', name: 'Türk Hava Yolları', price: 287.40, change: -0.83, sector: 'Havacılık', data: generateOHLCV(60, 270, 0.025) },
  { symbol: 'CCOLA', name: 'Coca-Cola İçecek A.Ş.', price: 71.50, change: 0.21, sector: 'Gıda & İçecek', data: generateOHLCV(60, 70, 0.015) },
  { symbol: 'EREGL', name: 'Ereğli Demir ve Çelik', price: 48.90, change: 1.45, sector: 'Metal', data: generateOHLCV(60, 46, 0.02) },
  { symbol: 'TOASO', name: 'Tofaş Türk Otomobil', price: 168.50, change: -1.20, sector: 'Otomotiv', data: generateOHLCV(60, 172, 0.018) },
  { symbol: 'BIMAS', name: 'BİM Birleşik Mağazalar', price: 514.50, change: 0.68, sector: 'Perakende', data: generateOHLCV(60, 510, 0.012) },
];

const cryptos = [
  { symbol: 'BTC', name: 'Bitcoin', price: 2187450, change: 3.24, sector: 'Kripto Para', data: generateOHLCV(30, 2100000, 0.04) },
  { symbol: 'ETH', name: 'Ethereum', price: 118320, change: 1.87, sector: 'Kripto Para', data: generateOHLCV(30, 116000, 0.035) },
  { symbol: 'SOL', name: 'Solana', price: 6840, change: 5.71, sector: 'Kripto Para', data: generateOHLCV(30, 6400, 0.05) },
  { symbol: 'BNB', name: 'BNB', price: 20450, change: 0.95, sector: 'Kripto Para', data: generateOHLCV(30, 20200, 0.025) },
];

interface CustomCandleProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { open: number; close: number; high: number; low: number; bull: boolean };
}

function CustomCandle(props: CustomCandleProps) {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props;
  if (!payload) return null;
  const color = payload.bull ? '#10B981' : '#DC2626';
  const cx = x + width / 2;

  return (
    <g>
      <line x1={cx} y1={y} x2={cx} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={x + 1} y={y + height * 0.2} width={Math.max(width - 2, 1)} height={Math.max(height * 0.6, 1)} fill={color} rx={1} />
    </g>
  );
}

export function MarketsPage() {
  const [selectedStock, setSelectedStock] = useState<typeof stocks[0]>(stocks[0]);
  const [activeTab, setActiveTab] = useState<'hisse' | 'kripto'>('hisse');
  const [searchQuery, setSearchQuery] = useState('');
  const [prices, setPrices] = useState(stocks.map(s => ({ symbol: s.symbol, price: s.price, change: s.change })));
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: parseFloat((p.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)),
        change: parseFloat((p.change + (Math.random() - 0.5) * 0.1).toFixed(2)),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentList = activeTab === 'hisse' ? stocks : cryptos;
  const filteredList = currentList.filter(s =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedData = selectedStock.data;
  const lastPrice = prices.find(p => p.symbol === selectedStock.symbol)?.price ?? selectedStock.price;
  const lastChange = prices.find(p => p.symbol === selectedStock.symbol)?.change ?? selectedStock.change;

  return (
    <div className="pt-24">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Activity size={13} />
              Canlı Piyasalar
            </div>
            <h1 className="text-responsive-hero font-extrabold mb-4" style={{ color: 'var(--ink-900)' }}>
              Piyasaları gerçek zamanlı takip edin
            </h1>
            <p className="text-xl" style={{ color: 'var(--ink-500)' }}>
              BIST hisse senetleri, kripto paralar ve teknik analiz araçları tek ekranda.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Stock list */}
            <div className="lg:col-span-1">
              <div className="flex gap-2 mb-4">
                {(['hisse', 'kripto'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setSelectedStock(stocks[0]); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: activeTab === tab ? 'var(--brand)' : 'var(--bg-subtle)',
                      color: activeTab === tab ? 'white' : 'var(--ink-500)',
                    }}
                  >
                    {tab === 'hisse' ? 'BIST Hisseler' : 'Kripto Paralar'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <Search size={16} style={{ color: 'var(--ink-400)' }} />
                <input
                  type="text"
                  placeholder="Sembol veya şirket ara..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--ink-900)' }}
                />
              </div>

              <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredList.map(stock => {
                  const liveData = prices.find(p => p.symbol === stock.symbol);
                  const price = liveData?.price ?? stock.price;
                  const change = liveData?.change ?? stock.change;
                  const isPositive = change >= 0;
                  const isSelected = selectedStock.symbol === stock.symbol;

                  return (
                    <button
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className="flex items-center justify-between p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: isSelected ? 'var(--brand-tint)' : 'white',
                        border: isSelected ? '1px solid #C7D2FE' : '1px solid var(--border-subtle)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                          style={{ background: 'var(--bg-subtle)', color: 'var(--ink-700)' }}
                        >
                          {stock.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{stock.symbol}</div>
                          <div className="text-xs" style={{ color: 'var(--ink-500)' }}>{stock.sector}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono font-semibold" style={{ color: 'var(--ink-900)' }}>
                          {price > 10000 ? `₺${(price / 1000).toFixed(1)}K` : `₺${price.toLocaleString('tr-TR')}`}
                        </div>
                        <div
                          className="text-xs flex items-center gap-0.5 justify-end font-semibold"
                          style={{ color: isPositive ? 'var(--success)' : 'var(--danger)' }}
                        >
                          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {isPositive ? '+' : ''}{change.toFixed(2)}%
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chart panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold" style={{ color: 'var(--ink-900)' }}>{selectedStock.symbol}</h2>
                      <span className="text-sm" style={{ color: 'var(--ink-500)' }}>{selectedStock.name}</span>
                      <Star size={16} style={{ color: 'var(--ink-200, #E2E8F0)' }} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold font-mono" style={{ color: 'var(--ink-900)' }}>
                        ₺{lastPrice.toLocaleString('tr-TR')}
                      </span>
                      <span
                        className="text-sm font-semibold flex items-center gap-1"
                        style={{ color: lastChange >= 0 ? 'var(--success)' : 'var(--danger)' }}
                      >
                        {lastChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {lastChange >= 0 ? '+' : ''}{lastChange.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--success-tint)]" style={{ color: 'var(--success)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)' }} />
                    Canlı
                  </div>
                </div>

                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedData.slice(-40)} barCategoryGap={2}>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} interval={7} />
                      <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} tickFormatter={v => `₺${v}`} width={60} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload?.[0]) {
                            const d = payload[0].payload as typeof selectedData[0];
                            return (
                              <div className="bg-white rounded-xl px-4 py-3 text-xs shadow-soft-lg border border-[var(--border-subtle)]">
                                <div className="font-semibold mb-2" style={{ color: 'var(--ink-900)' }}>{d.date}</div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ color: 'var(--ink-500)' }}>
                                  <span>Açılış: <span style={{ color: 'var(--ink-900)' }}>₺{d.open}</span></span>
                                  <span>Kapanış: <span style={{ color: d.bull ? 'var(--success)' : 'var(--danger)' }}>₺{d.close}</span></span>
                                  <span>Yüksek: <span style={{ color: 'var(--ink-900)' }}>₺{d.high}</span></span>
                                  <span>Düşük: <span style={{ color: 'var(--ink-900)' }}>₺{d.low}</span></span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={lastPrice} stroke="var(--border-strong)" strokeDasharray="4 4" />
                      <Bar dataKey="high" shape={<CustomCandle />} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ height: 60 }} className="mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedData.slice(-40)}>
                      <defs>
                        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="volume" stroke="#6366F1" strokeWidth={1} fill="url(#volGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="text-xs mt-1" style={{ color: 'var(--ink-500)' }}>Hacim</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: '52H Yüksek', value: `₺${Math.max(...selectedData.map(d => d.high)).toFixed(2)}` },
                  { label: '52H Düşük', value: `₺${Math.min(...selectedData.map(d => d.low)).toFixed(2)}` },
                  { label: 'Ort. Hacim', value: `₺${(selectedData.reduce((a, d) => a + d.volume, 0) / selectedData.length / 1000000).toFixed(1)}M` },
                  { label: 'Değişim', value: `${lastChange >= 0 ? '+' : ''}${lastChange.toFixed(2)}%`, positive: lastChange >= 0 },
                ].map(stat => (
                  <div key={stat.label} className="card p-4 text-center">
                    <div className="text-xs mb-1" style={{ color: 'var(--ink-500)' }}>{stat.label}</div>
                    <div className="text-sm font-bold" style={{ color: stat.positive === undefined ? 'var(--ink-900)' : stat.positive ? 'var(--success)' : 'var(--danger)' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
