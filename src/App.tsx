import { useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import { Home } from './pages/Home';
import { FeaturesPage } from './pages/FeaturesPage';
import { MarketsPage } from './pages/MarketsPage';
import { PredictionPage } from './pages/PredictionPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { useAuthStore } from './stores/authStore';

const authRoutes = ['/giris', '/kayit'];

function AuthBootstrap({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const reconcileFromStorage = useAuthStore((s) => s.reconcileFromStorage);

  useEffect(() => {
    void hydrate();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        reconcileFromStorage();
      }
    };

    const onPopState = () => {
      reconcileFromStorage();
    };

    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('popstate', onPopState);
    };
  }, [hydrate, reconcileFromStorage]);

  return children;
}

function Layout() {
  const location = useLocation();
  const isAuth = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      {!isAuth && <Navbar />}
      <main>
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
          <Layout />
        </AuthBootstrap>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
