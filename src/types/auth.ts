export type AuthErrorCode =
  | 'VALIDATION_ERROR'
  | 'EMAIL_ALREADY_EXISTS'
  | 'HANDLE_ALREADY_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'UNAUTHORIZED'
  | 'USER_NOT_FOUND'
  | 'TOO_MANY_REQUESTS'
  | 'UNEXPECTED_ERROR'
  | 'NETWORK_ERROR';

export interface ApiErrorBody {
  success: false;
  message: string;
  code: string;
}

export interface AuthUser {
  id: string;
  handle: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  userId: string;
  handle: string;
  email: string;
  accessToken: string;
  expiresAtUtc: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: LoginData;
}

export interface RegisterRequest {
  handle: string;
  email: string;
  password: string;
}

export interface RegisterData {
  id: string;
  handle: string;
  email: string;
  createdAt: string;
}

export interface RegisterResponse {
  success: true;
  message: string;
  data: RegisterData;
}

export interface MeResponse {
  id: string;
  email: string;
  username: string;
  isPremium: boolean;
  role: string;
  verificationStatus: string;
  isVerified: boolean;
}

export interface StoredAuthSession {
  accessToken: string;
  expiresAtUtc: string;
  user: AuthUser;
}
