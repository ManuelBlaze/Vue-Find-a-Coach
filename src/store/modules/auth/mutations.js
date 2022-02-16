export default {
  setUser(state, { token, userId, email, tokenExpiration }) {
    state.email = email;
    state.token = token;
    state.userId = userId;
    state.tokenExpiration = tokenExpiration;
  },
};
