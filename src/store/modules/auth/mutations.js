export default {
  setUser(state, { token, userId, email, tokenExpiration }) {
    state.email = email;
    state.token = token;
    state.userId = userId;
    state.tokenExpiration = tokenExpiration;
  },
  logoutUser(state) {
    state.email = null;
    state.token = null;
    state.userId = null;
    state.tokenExpiration = null;
  },
};
