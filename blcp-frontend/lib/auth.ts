export async function getCurrentUser() {
  return null;
}

export function getPermissions() {
  return null;
}

export function hasPermission() {
  return false;
}

export function canApproveApplication() {
  return false;
}

export async function authenticateUser() {
  return { success: false, error: 'Frontend auth mock disabled. Use backend auth routes.' };
}

export async function setAuthCookie() {}

export async function clearAuthCookie() {}

export async function getAuthToken() {
  return undefined;
}

export async function verifyToken() {
  return null;
}
