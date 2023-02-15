import Cookies from 'js-cookie';

/**
 *    Use this module to get the session data that is stored in a client's browser as a cookie with some base64 encoded data.
 *
 *    How did the cookie get there you might ask?? --> The server creates it and sends it to the client when the user logs in! 🤯
 *                                                     The cookie gets saved by Login.js and it will include the user_id and name.
 *
 */

export const getSession = (token) => {
  const jwt = token || Cookies.get('__session');
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      // what is window.atob ?
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
      session = JSON.parse(window.atob(base64));
    }
  } catch (error) {
    console.log(error);
  }
  return session;
}

export const setSession = (token) => {
  Cookies.set('__session', token);
}

export const logOut = () => {
  Cookies.remove('__session');
  localStorage.clear();
}