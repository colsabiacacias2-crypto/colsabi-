export const authCookieName = 'colsabi_access_token'
export const refreshCookieName = 'colsabi_refresh_token'

export function buildAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  }
}

