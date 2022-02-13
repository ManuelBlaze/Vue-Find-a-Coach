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
  shouldUpdate(state) {
    // we fetch data every minute
    const { lastFetch } = state;

    if (!lastFetch) {
      return true;
    }

    const currentTime = new Date().getTime();
    return (currentTime - lastFetch) / 1000 > 60;
  },
};
