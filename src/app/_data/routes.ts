const SIGNIN_ROUTE = {
  signin: '/signin',
} as const;

export const ROUTES = {
  ONBOARDING: { ...SIGNIN_ROUTE },
} as const;
