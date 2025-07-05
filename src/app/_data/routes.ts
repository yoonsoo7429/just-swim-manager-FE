const HOME_ROUTE = {
  home: '/',
} as const;

const SIGNIN_ROUTE = {
  signin: '/signin',
  type: '/signin/type',
} as const;

const MANAGE_ROUTE = {
  root: '/manage',
} as const;

const CUSTOMER_ROUTE = {
  root: '/customer',
} as const;

export const ROUTES = {
  ONBOARDING: { ...HOME_ROUTE },
  SINGIN: { ...SIGNIN_ROUTE },
} as const;
