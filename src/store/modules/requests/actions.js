import _ from 'lodash';

import axios from 'axios';

const { VUE_APP_DB } = process.env;

/**
 * Success status code
 * @constant
 * @type {Number}
 * @default
 */
const SUCCESS_CODE = 200;

/**
 * Parse the data to inject
 * @param {Object} data raw data
 * @returns parsed data
 */
const parseData = (data) =>
  _.map(data, (value, key) => ({
    ...value,
    id: key,
  }));

export default {
  async contactCoach(context, payload) {
    // build request data
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    // build BD URL
    const url = `${VUE_APP_DB}/requests/${payload.coachId}.json`;

    // save request in DB
    const response = await axios.post(url, newRequest);

    // verify response status
    if (response.status !== SUCCESS_CODE) {
      throw new Error(response.message || 'Failed to send request.');
    }

    // get ID request
    const {
      data: { name: id },
    } = response;

    context.commit('addRequest', {
      ...newRequest,
      id,
    });
  },
  async fetchRequests(context) {
    // build URL
    const url = `${VUE_APP_DB}/requests.json`;

    // get requests from DB
    await axios
      .get(url)
      .then(({ data }) => {
        if (_.isEmpty(data)) {
          context.commit('setRequests', []);
          return;
        }

        // parse data
        const parsedData = [];

        for (const key in data) {
          parsedData.push(...parseData(data[key]));
        }

        // inject the data to vuex
        context.commit('setRequests', parsedData);
      })
      .catch((e) => {
        throw new Error(e.message || 'Failed to get requests.');
      });
  },
};
