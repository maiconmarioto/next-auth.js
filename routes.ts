/**
 * An array opf routes that are accessible to the public
 * There routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * There routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * The prefix for the authentication API
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
