import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import { ThemeChrome } from './components/ThemeChrome';
import { useAuthStore } from './stores/authStore';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then((m) => ({ default: m.FeaturesPage })));
const MarketsPage = lazy(() => import('./pages/MarketsPage').then((m) => ({ default: m.MarketsPage })));
const PredictionPage = lazy(() => import('./pages/PredictionPage').then((m) => ({ default: m.PredictionPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })));

const authRoutes = ['/giris', '/kayit'];

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-24" aria-busy="true">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
        style={{ borderTopColor: 'var(--brand)', borderRightColor: 'var(--brand)' }}
      />
    </div>
  );
}

function AuthBootstrap({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const reconcileFromStorage = useAuthStore((s) => s.reconcileFromStorage);

  useEffect(() => {
    // Don't block first paint — hydrate after idle
    const run = () => void hydrate();
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(run, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(run, 1);
    return () => window.clearTimeout(t);
  }, [hydrate]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reconcileFromStorage();
    };
    const onPopState = () => reconcileFromStorage();
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('popstate', onPopState);
    };
  }, [reconcileFromStorage]);

  return children;
}

function Layout() {
  const location = useLocation();
  const isAuth = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      {!isAuth && <Navbar />}
      <main>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ozellikler" element={<FeaturesPage />} />
            <Route path="/piyasalar" element={<MarketsPage />} />
            <Route path="/tahminleme" element={<PredictionPage />} />
            <Route path="/fiyatlar" element={<PricingPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route
              path="/hesabim"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/giris"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/kayit"
              element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isAuth && <Footer />}
    </div>
  );
}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60_000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthBootstrap>
          <ThemeChrome />
          <Layout />
        </AuthBootstrap>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
