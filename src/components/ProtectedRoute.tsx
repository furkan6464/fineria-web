import { useLayoutEffect, type ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { AuthLoadingScreen } from './AuthLoadingScreen';

interface ProtectedRouteProps {
  children?: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const reconcileFromStorage = useAuthStore((s) => s.reconcileFromStorage);

  // Before paint on every protected navigation (including Back/Forward),
  // drop in-memory auth if localStorage no longer has a valid session.
  useLayoutEffect(() => {
    reconcileFromStorage();
  }, [location.key, reconcileFromStorage]);

  if (!isHydrated) {
    return <AuthLoadingScreen />;
  }

  const hasSession = isAuthenticated && user !== null && Boolean(accessToken);

  if (!hasSession) {
    return <Navigate to="/giris" replace state={{ from: location }} />;
  }

  return children ? <>{children}</> : <Outlet />;
}
