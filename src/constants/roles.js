/**
 * Application user roles
 * Use these constants everywhere instead of raw strings
 */
export const ROLES = {
  MEMBER: 'member',
  VIP: 'vip',
  COACH: 'coach',
  ADMIN: 'admin',
};

/**
 * Role display labels in Vietnamese
 */
export const ROLE_LABELS = {
  [ROLES.MEMBER]: 'Hội Viên',
  [ROLES.VIP]: 'VIP',
  [ROLES.COACH]: 'Coach',
  [ROLES.ADMIN]: 'Admin',
};

/**
 * Role accent colors
 */
export const ROLE_COLORS = {
  [ROLES.MEMBER]: '#FFFFFF',
  [ROLES.VIP]: '#f59e0b',
  [ROLES.COACH]: '#10b981',
  [ROLES.ADMIN]: '#38bdf8',
};
