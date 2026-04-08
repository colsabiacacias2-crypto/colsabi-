export const roles = {
  ADMIN: 'ADMIN',
  ASOCIADO: 'ASOCIADO'
}

export function hasRole(user, role) {
  return user?.role === role
}
