import { apiFetch } from '@/lib/api';
import { getDictionary } from '@/i18n';
import { useLocaleStore } from '@/i18n/localeStore';
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/auth';

const HANDLE_REGEX = /^[A-Za-z0-9_]{2,64}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,128}$/;

function authValidation() {
  return getDictionary(useLocaleStore.getState().locale).authValidation;
}

export function validateHandle(handle: string): string | null {
  const v = authValidation();
  const value = handle.trim();
  if (!value) return v.handleRequired;
  if (value.length < 2 || value.length > 64) {
    return v.handleLength;
  }
  if (!HANDLE_REGEX.test(value)) {
    return v.handleChars;
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const v = authValidation();
  const value = email.trim();
  if (!value) return v.emailRequired;
  if (value.length > 256) return v.emailMax;
  if (!EMAIL_REGEX.test(value)) return v.emailInvalid;
  return null;
}

export function validatePassword(password: string): string | null {
  const v = authValidation();
  if (!password) return v.passwordRequired;
  if (password.length < 8 || password.length > 128) {
    return v.passwordLength;
  }
  if (!PASSWORD_REGEX.test(password)) {
    return v.passwordComplexity;
  }
  return null;
}

/** Login-only: require a non-empty password within backend max length. */
export function validateLoginPassword(password: string): string | null {
  const v = authValidation();
  if (!password) return v.passwordRequired;
  if (password.length > 128) return v.passwordMaxLogin;
  return null;
}

export function validatePasswordConfirmation(password: string, confirm: string): string | null {
  const v = authValidation();
  if (!confirm) return v.confirmRequired;
  if (password !== confirm) return v.confirmMismatch;
  return null;
}

export const authService = {
  register(payload: RegisterRequest) {
    return apiFetch<RegisterResponse>('/api/Auth/register', {
      method: 'POST',
      body: {
        handle: payload.handle.trim(),
        email: payload.email.trim(),
        password: payload.password,
      },
    });
  },

  login(payload: LoginRequest) {
    return apiFetch<LoginResponse>('/api/Auth/login', {
      method: 'POST',
      body: {
        email: payload.email.trim(),
        password: payload.password,
      },
    });
  },

  me(accessToken: string) {
    return apiFetch<MeResponse>('/api/Auth/me', {
      method: 'GET',
      token: accessToken,
    });
  },

  logout(accessToken?: string | null) {
    return apiFetch<unknown>('/api/Auth/logout', {
      method: 'POST',
      token: accessToken,
    }).catch(() => undefined);
  },
};
