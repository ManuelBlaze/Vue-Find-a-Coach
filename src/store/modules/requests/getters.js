import _ from 'lodash';

export default {
  requests(state) {
    return state.requests;
  },
  hasRequests(state) {
    return !_.isEmpty(state.requests);
  },
};
