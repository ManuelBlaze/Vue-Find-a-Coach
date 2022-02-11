import _ from 'lodash';

export default {
  coaches(states) {
    return states.coaches;
  },
  hasCoaches(state) {
    return !_.isEmpty(state.coaches);
  },
  isCoach(_state, getters, _rootState, rootGetters) {
    const { coaches } = getters;
    const { userId } = rootGetters;
    return coaches.some((coach) => coach.id === userId);
  },
};
