const SIGNIN_ROUTE = {
  signin: '/signin',
  type: '/signin/type',
} as const;

const MANAGE_ROUTE = {
  root: '/manage',
} as const;

export const ROUTES = {
  ONBOARDING: { ...SIGNIN_ROUTE },
  MANAGE: { ...MANAGE_ROUTE },
} as const;
