import type { BackendUser, SafeUser } from './types';

const API_BASE = process.env.BACKEND_URL || 'http://localhost:3001/api/v1';

export function backendUrl(path: string) {
  return `${API_BASE}${path}`;
}

export function mapBackendUser(user: BackendUser): SafeUser {
  return {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isActive: user.isActive,
  };
}

export function backendListPayload<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (
    data &&
    typeof data === 'object' &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: T[] }).data;
  }
  return [];
}
