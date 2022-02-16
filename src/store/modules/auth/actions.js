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

        context.commit('setUser', {
          email,
          token: idToken,
          userId: localId,
          tokenExpiration: expiresIn,
        });
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e.message || 'Failed to Auth!');
      });
  },
  logout(context) {
    context.commit('logoutUser');
  },
};
