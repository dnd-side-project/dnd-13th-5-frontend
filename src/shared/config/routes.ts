export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SUBSCRIPTIONS: '/subscriptions',
  SUBSCRIPTION_DETAIL: (id = ':id') => `/subscriptions/${id}`,
  SUBSCRIPTION_EDIT: (id = ':id') => `/edit/subscriptions/${id}`,
  COMPARISON: '/comparison',
  MY_PAGE: '/my',
  ALARM: '/alarm',
};
