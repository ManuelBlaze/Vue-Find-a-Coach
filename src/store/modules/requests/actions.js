import axios from 'axios';

const { VUE_APP_DB } = process.env;

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

    // save request in BD
    const response = await axios.post(url, newRequest);

    // verify response status
    if (response.status !== 200) {
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
};
