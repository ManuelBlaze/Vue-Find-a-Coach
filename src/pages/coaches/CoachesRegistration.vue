<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>

      <coach-form @saveData="saveData" />
    </base-card>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: { CoachForm },
  methods: {
    ...mapActions('coaches', ['registerCoach']),
    saveData(data) {
      this.registerCoach(data);
      this.$router.replace('/coaches');
    },
  },
};
</script>
