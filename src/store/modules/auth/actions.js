import axios from 'axios';

const { VUE_APP_SIGNUP, VUE_APP_LOGIN } = process.env;

/**
 * @constant
 * @type {Map<String, String>}
 */
const AUTH_LINKS = new Map([
  ['login', VUE_APP_LOGIN],
  ['signup', VUE_APP_SIGNUP],
]);

let timer;

export default {
  async auth(context, { email, password, type }) {
    await axios
      .post(AUTH_LINKS.get(type), {
        email,
        password,
        returnSecureToken: true,
      })
      .then(({ data }) => {
        const { idToken, expiresIn, localId } = data;

        const tokenExpiration = new Date().getTime() + expiresIn * 1000;

        timer = setTimeout(() => {
          context.dispatch('logout');
        }, expiresIn * 1000);

        const payload = {
          email,
          token: idToken,
          userId: localId,
          tokenExpiration,
        };

        localStorage.setItem('token', idToken);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', localId);
        localStorage.setItem('tokenExpiration', tokenExpiration);

        context.commit('setUser', payload);
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e.message || 'Failed to Auth!');
      });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = Number(tokenExpiration) - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    if (token && email && userId) {
      context.commit('setUser', {
        token,
        userId,
        email,
        tokenExpiration,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);
    context.commit('logoutUser');
  },
};
