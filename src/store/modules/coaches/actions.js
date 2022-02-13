import _ from 'lodash';

import axios from 'axios';

const { VUE_APP_DB } = process.env;

export default {
  async registerCoach(context, data) {
    // get userID
    const { userId } = context.rootGetters;

    // parse coachData
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.areas,
      description: data.description,
      hourlyRate: data.rate,
    };

    // build DB URL
    const url = `${VUE_APP_DB}/coaches/${userId}.json`;

    // save the data in DB
    await axios.put(url, coachData);

    // save the data in component
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async fetchData(context, { forceFetch }) {
    if (!context.getters.shouldUpdate && !forceFetch) {
      return;
    }

    // build URL
    const url = `${VUE_APP_DB}/coaches.json`;

    // fetch the data
    await axios
      .get(url)
      .then(({ data }) => {
        if (_.isEmpty(data)) {
          context.commit('updateData', []);
          return;
        }

        const parsedData = _.map(data, (value, key) => ({
          ...value,
          id: key,
        }));

        context.commit('updateData', parsedData);
        context.commit('setFetchTimeStamp');
      })
      .catch((e) => {
        throw new Error(e.message || 'Failed to Fetch!');
      });
  },
};
