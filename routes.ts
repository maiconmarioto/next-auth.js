/**
 * An array opf routes that are accessible to the public
 * There routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/auth/new-verification'];

/**
 * An array of routes that are used for authentication
 * There routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

/**
 * The prefix for the authentication API
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings';
