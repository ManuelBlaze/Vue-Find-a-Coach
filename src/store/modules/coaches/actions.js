import _ from 'lodash';

import axios from 'axios';

const { VUE_APP_DB } = process.env;

/**
 * @constant
 * @type {Number}
 * @default
 */
const OK_STATUS = 200;

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
    const { status } = await axios.put(url, coachData);

    if (status !== OK_STATUS) {
      // error...
    }

    // save the data in component
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async fetchData(context) {
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
      })
      .catch((e) => {
        console.log(e);
        this.error = 'Failed to fetch data... please try again later.';
      });
  },
};
