import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { FeaturesPage } from './pages/FeaturesPage';
import { MarketsPage } from './pages/MarketsPage';
import { PredictionPage } from './pages/PredictionPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { useAuthStore } from './stores/authStore';

const authRoutes = ['/giris', '/kayit'];

function AuthBootstrap({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

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
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/kayit" element={<RegisterPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Layout />
      </AuthBootstrap>
    </BrowserRouter>
  );
}

export default App;
