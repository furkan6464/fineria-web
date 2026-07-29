import { create } from 'zustand';
import { isApiError } from '@/lib/api';
import { authService } from '@/services/authService';
import type { AuthUser, StoredAuthSession } from '@/types/auth';

const STORAGE_KEY = 'fineria.auth';

function readStorage(): StoredAuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuthSession;
    if (
      !parsed ||
      typeof parsed.accessToken !== 'string' ||
      typeof parsed.expiresAtUtc !== 'string' ||
      !parsed.user ||
      typeof parsed.user.id !== 'string' ||
      typeof parsed.user.handle !== 'string' ||
      typeof parsed.user.email !== 'string'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(session: StoredAuthSession | null): void {
  try {
    if (!session) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage may be unavailable (private mode / quota) — keep in-memory state.
  }
}

function isExpired(expiresAtUtc: string): boolean {
  const expiresAt = Date.parse(expiresAtUtc);
  if (Number.isNaN(expiresAt)) return true;
  return expiresAt <= Date.now();
}

function getValidStoredSession(): StoredAuthSession | null {
  const stored = readStorage();
  if (!stored || isExpired(stored.expiresAtUtc)) {
    if (stored) writeStorage(null);
    return null;
  }
  return stored;
}

interface AuthState {
  accessToken: string | null;
  expiresAtUtc: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setSession: (session: StoredAuthSession) => void;
  clearAuth: () => void;
  /** Sync memory with localStorage after bfcache / history traversal. */
  reconcileFromStorage: () => void;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
}

let hydrateInFlight: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  expiresAtUtc: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  setSession: (session) => {
    writeStorage(session);
    set({
      accessToken: session.accessToken,
      expiresAtUtc: session.expiresAtUtc,
      user: session.user,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    writeStorage(null);
    set({
      accessToken: null,
      expiresAtUtc: null,
      user: null,
      isAuthenticated: false,
    });
  },

  reconcileFromStorage: () => {
    const stored = getValidStoredSession();

    if (!stored) {
      const { accessToken, user, isAuthenticated, isHydrated } = get();
      if (accessToken || user || isAuthenticated) {
        get().clearAuth();
      }
      if (!isHydrated) {
        set({ isHydrated: true });
      }
      return;
    }

    const { accessToken, isAuthenticated, isHydrated, user } = get();
    const memoryMatches =
      isHydrated &&
      isAuthenticated &&
      accessToken === stored.accessToken &&
      user?.id === stored.user.id;

    if (memoryMatches) {
      return;
    }

    // Hide protected UI until /me validation finishes.
    set({ isHydrated: false });
    void get().hydrate();
  },

  hydrate: async () => {
    if (hydrateInFlight) return hydrateInFlight;

    hydrateInFlight = (async () => {
      const stored = getValidStoredSession();

      if (!stored) {
        writeStorage(null);
        set({
          accessToken: null,
          expiresAtUtc: null,
          user: null,
          isAuthenticated: false,
          isHydrated: true,
        });
        return;
      }

      set({
        accessToken: stored.accessToken,
        expiresAtUtc: stored.expiresAtUtc,
        user: stored.user,
        isAuthenticated: true,
      });

      try {
        const me = await authService.me(stored.accessToken);
        const user: AuthUser = {
          id: me.id,
          handle: me.username || stored.user.handle,
          email: me.email || stored.user.email,
        };
        const nextSession: StoredAuthSession = {
          accessToken: stored.accessToken,
          expiresAtUtc: stored.expiresAtUtc,
          user,
        };
        writeStorage(nextSession);
        set({
          accessToken: nextSession.accessToken,
          expiresAtUtc: nextSession.expiresAtUtc,
          user,
          isAuthenticated: true,
          isHydrated: true,
        });
      } catch (error) {
        if (isApiError(error) && (error.status === 401 || error.code === 'UNAUTHORIZED')) {
          get().clearAuth();
        }
        set({ isHydrated: true });
      }
    })().finally(() => {
      hydrateInFlight = null;
    });

    return hydrateInFlight;
  },

  logout: async () => {
    const token = get().accessToken;
    // Clear client session synchronously before any navigation or await.
    get().clearAuth();
    set({ isHydrated: true });
    if (token) {
      await authService.logout(token);
    }
  },
}));
