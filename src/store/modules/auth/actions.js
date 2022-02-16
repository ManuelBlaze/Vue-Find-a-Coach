import axios from 'axios';

const { VUE_APP_SIGNUP } = process.env;

export default {
  login() {},
  async signup(context, { email, password }) {
    await axios
      .post(VUE_APP_SIGNUP, {
        email,
        password,
        returnSecureToken: true,
      })
      .then(({ idToken, expiresIn, localId }) => {
        context.commit('setUser', {
          token: idToken,
          userId: localId,
          tokenExpiration: expiresIn,
        });
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e.message || 'Failed to Fetch!');
      });
  },
};
