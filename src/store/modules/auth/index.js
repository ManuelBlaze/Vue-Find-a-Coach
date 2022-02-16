import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state() {
    return {
      email: null,
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};
