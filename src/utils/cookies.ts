import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  USER: 'user',
} as const;

export const setCookie = (key: keyof typeof COOKIE_KEYS, value: any) => {
  Cookies.set(COOKIE_KEYS[key], JSON.stringify(value), {
    expires: 7,
    sameSite: 'strict',
    secure: window.location.protocol === 'https:',
  });
};

export const getCookie = (key: keyof typeof COOKIE_KEYS) => {
  const value = Cookies.get(COOKIE_KEYS[key]);
  if (value) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return null;
};

export const removeCookie = (key: keyof typeof COOKIE_KEYS) => {
  Cookies.remove(COOKIE_KEYS[key]);
};
