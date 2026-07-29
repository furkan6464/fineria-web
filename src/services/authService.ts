import { apiFetch } from '@/lib/api';
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

export function validateHandle(handle: string): string | null {
  const value = handle.trim();
  if (!value) return 'Kullanıcı adı zorunludur.';
  if (value.length < 2 || value.length > 64) {
    return 'Kullanıcı adı 2-64 karakter arasında olmalıdır.';
  }
  if (!HANDLE_REGEX.test(value)) {
    return 'Kullanıcı adı yalnızca harf, rakam ve alt çizgi içerebilir.';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return 'E-posta zorunludur.';
  if (value.length > 256) return 'E-posta en fazla 256 karakter olabilir.';
  if (!EMAIL_REGEX.test(value)) return 'Geçerli bir e-posta adresi girin.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Şifre zorunludur.';
  if (password.length < 8 || password.length > 128) {
    return 'Şifre 8-128 karakter arasında olmalıdır.';
  }
  if (!PASSWORD_REGEX.test(password)) {
    return 'Şifre en az bir büyük harf ve bir rakam içermelidir.';
  }
  return null;
}

/** Login-only: require a non-empty password within backend max length. */
export function validateLoginPassword(password: string): string | null {
  if (!password) return 'Şifre zorunludur.';
  if (password.length > 128) return 'Şifre en fazla 128 karakter olabilir.';
  return null;
}

export function validatePasswordConfirmation(password: string, confirm: string): string | null {
  if (!confirm) return 'Şifre tekrarı zorunludur.';
  if (password !== confirm) return 'Şifreler eşleşmiyor.';
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
