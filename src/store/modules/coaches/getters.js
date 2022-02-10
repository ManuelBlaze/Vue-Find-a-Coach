import _ from 'lodash';

export default {
  coaches(states) {
    return states.coaches;
  },
  hasCoaches(state) {
    return !_.isEmpty(state.coaches);
  },
};
