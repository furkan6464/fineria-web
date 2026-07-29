import { useLayoutEffect, type ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { AuthLoadingScreen } from './AuthLoadingScreen';

interface GuestRouteProps {
  children?: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const location = useLocation();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const reconcileFromStorage = useAuthStore((s) => s.reconcileFromStorage);

  useLayoutEffect(() => {
    reconcileFromStorage();
  }, [location.key, reconcileFromStorage]);

  if (!isHydrated) {
    return <AuthLoadingScreen />;
  }

  const hasSession = isAuthenticated && user !== null && Boolean(accessToken);

  if (hasSession) {
    return <Navigate to="/hesabim" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
