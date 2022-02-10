<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ selectedCoach.hourlyRate }} /hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>

      <router-view />
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge
        v-for="area in selectedCoach.areas"
        :key="area"
        :title="area"
        :type="area"
      />
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </section>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: {},
    };
  },
  computed: {
    fullName() {
      const { firstName, lastName } = this.selectedCoach;

      return `${firstName} ${lastName}`;
    },
    contactLink() {
      return `${this.$route.path}/contact`;
    },
  },
  created() {
    // get coaches
    const coaches = this.$store.getters['coaches/coaches'];
    // get id
    const id = this.id;

    // set the selected coach
    this.selectedCoach = _.find(coaches, { id });
  },
};
</script>
