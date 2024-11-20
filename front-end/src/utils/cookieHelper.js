import Cookies from 'js-cookie';

export const getCookiesAsJson = () => {
  const allCookies = Cookies.get(); // Returns all cookies as an object
  return allCookies;
};