export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  updateData(state, payload) {
    state.coaches = payload;
  },
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
