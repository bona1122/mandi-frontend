export const MAX_TIMEOUT_TIME = 60 * 1000;

export const NO_AUTH_ENDPOINTS = [
  '/auth/google/login',
  '/auth/google/signup',
  '/profile/check-nickname',
  '/courses',
  '/courses/nearby',
  '/courses/names',
  '/auth/reissue',
];

export const NO_AUTH_PATTERNS = [/^\/courses\/[^\/]+$/];

export const REFRESH_TOKEN_ENDPOINT = ['/auth/logout', '/auth/withdrawal'];

export const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn/';

export const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const PREFERRED_COURSES_ENDPOINT = '/courses/preferred';
