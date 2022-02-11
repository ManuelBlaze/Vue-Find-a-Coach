export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  updateData(state, payload) {
    state.coaches = payload;
  },
};
