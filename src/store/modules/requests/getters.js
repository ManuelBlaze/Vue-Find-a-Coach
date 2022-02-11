import _ from 'lodash';

export default {
  requests(state, _getters, _rootState, rootGetters) {
    const coachId = rootGetters.userId;

    return _.filter(state.requests, { coachId });
  },
  hasRequests(_state, getters) {
    return !_.isEmpty(getters.requests);
  },
};
