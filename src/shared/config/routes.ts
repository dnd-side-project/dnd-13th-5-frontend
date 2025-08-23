export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SUBSCRIPTIONS: '/subscriptions',
  SUBSCRIPTION_DETAIL: (id = ':id') => `/subscriptions/${id}`,
  SUBSCRIPTION_EDIT: (id = ':id') => `/edit/subscriptions/${id}`,
  COMPARISON: '/comparison',
  COMPARISON_ADD: `/add/comparison`,
  MY_PAGE: '/my',
  EMAIL_EDIT: '/edit/email',
  ALARM: '/alarm',
};
