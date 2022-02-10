import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Manuel',
          lastName: 'Escobar',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Manuel and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Daniela',
          lastName: 'Villada',
          areas: ['frontend', 'career'],
          description:
            'I am Daniela and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
