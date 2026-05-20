export type UserRole = 'guest' | 'student' | 'teacher' | 'admin';

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  approved: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
};

export type AuthSession = {
  user: UserProfile;
  tokens: AuthTokens;
};

type JsonRecord = Record<string, unknown>;

const STORAGE_KEY = 'chemlab_auth_session_v1';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000';

const isBrowser = () => typeof window !== 'undefined';

export function getSession(): AuthSession | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function setSession(session: AuthSession): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('auth-session-changed'));
}

export function clearSession(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('auth-session-changed'));
}

function isTokenExpired(expiresAtIso: string): boolean {
  return Date.now() >= new Date(expiresAtIso).getTime() - 30_000;
}

async function apiRequest<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Yeu cau that bai');
  }

  return (await response.json()) as T;
}

async function refreshSessionTokens(session: AuthSession): Promise<AuthSession> {
  const refreshed = await apiRequest<AuthSession>('/api/auth/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: session.tokens.refreshToken }),
  });
  setSession(refreshed);
  return refreshed;
}

export async function authRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  let session = getSession();
  if (!session) throw new Error('Ban chua dang nhap');

  if (isTokenExpired(session.tokens.accessTokenExpiresAt)) {
    session = await refreshSessionTokens(session);
  }

  try {
    return await apiRequest<T>(path, {
      ...init,
      headers: {
        Authorization: `Bearer ${session.tokens.accessToken}`,
        ...(init.headers ?? {}),
      },
    });
  } catch (error) {
    const shouldRetry = error instanceof Error && /401|unauthorized/i.test(error.message);
    if (!shouldRetry) throw error;

    const refreshedSession = await refreshSessionTokens(session);
    return apiRequest<T>(path, {
      ...init,
      headers: {
        Authorization: `Bearer ${refreshedSession.tokens.accessToken}`,
        ...(init.headers ?? {}),
      },
    });
  }
}

export async function register(payload: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ message: string }> {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }): Promise<AuthSession> {
  const session = await apiRequest<AuthSession>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  setSession(session);
  return session;
}

export async function logout(): Promise<void> {
  const session = getSession();
  if (!session) return;

  try {
    await apiRequest('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: session.tokens.refreshToken }),
    });
  } finally {
    clearSession();
  }
}

export async function fetchMyProfile(): Promise<UserProfile> {
  return authRequest<UserProfile>('/api/users/me');
}

export async function updateMyProfile(payload: {
  fullName: string;
  phone: string;
  avatarUrl: string;
}): Promise<UserProfile> {
  const profile = await authRequest<UserProfile>('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  const current = getSession();
  if (current) {
    setSession({ ...current, user: profile });
  }
  return profile;
}

export async function changeMyPassword(payload: { currentPassword: string; newPassword: string }): Promise<JsonRecord> {
  return authRequest<JsonRecord>('/api/users/change-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
