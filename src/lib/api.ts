import type { ApiErrorBody } from '@/types/auth';

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

function resolveUrl(path: string): string {
  if (!API_URL) {
    throw new ApiError(
      'API adresi yapılandırılmamış. VITE_API_URL ortam değişkenini kontrol edin.',
      0,
      'UNEXPECTED_ERROR',
    );
  }
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

async function parseError(response: Response): Promise<ApiError> {
  let message = 'Beklenmeyen bir hata oluştu.';
  let code = 'UNEXPECTED_ERROR';

  try {
    const body = (await response.json()) as Partial<ApiErrorBody>;
    if (typeof body.message === 'string' && body.message.trim()) {
      message = body.message;
    }
    if (typeof body.code === 'string' && body.code.trim()) {
      code = body.code;
    }
  } catch {
    // Non-JSON or empty body — keep defaults based on status
  }

  if (response.status === 401 && code === 'UNEXPECTED_ERROR') {
    code = 'UNAUTHORIZED';
    if (message === 'Beklenmeyen bir hata oluştu.') {
      message = 'Oturum geçersiz veya süresi dolmuş.';
    }
  }

  if (response.status === 429 && code === 'UNEXPECTED_ERROR') {
    code = 'TOO_MANY_REQUESTS';
    if (message === 'Beklenmeyen bir hata oluştu.') {
      message = 'Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin.';
    }
  }

  if (response.status === 400 && code === 'UNEXPECTED_ERROR') {
    code = 'VALIDATION_ERROR';
  }

  return new ApiError(message, response.status, code);
}

export interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  token?: string | null;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;

  const requestHeaders = new Headers(headers);
  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(resolveUrl(path), {
      ...rest,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.',
      0,
      'NETWORK_ERROR',
    );
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError('Sunucudan geçersiz yanıt alındı.', response.status, 'UNEXPECTED_ERROR');
  }
}
