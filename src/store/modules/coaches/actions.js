export default {
  registerCoach(context, data) {
    // parse coachData
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.areas,
      description: data.description,
      hourlyRate: data.rate,
    };

    // save the data
    context.commit('registerCoach', coachData);
  },
};
