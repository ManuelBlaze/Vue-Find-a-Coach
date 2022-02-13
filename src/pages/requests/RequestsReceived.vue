<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Recieved</h2>
      </header>
      <div v-if="hasRequests">
        <ul v-for="request in requests" :key="request.id">
          <request-item
            :message="request.message"
            :userEmail="request.userEmail"
          />
        </ul>
      </div>
      <h3 v-else>You haven't received any requests!</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import RequestItem from './RequestItem.vue';

export default {
  components: { RequestItem },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests']),
  },
  methods: {
    ...mapActions('requests', ['fetchRequests']),
    async getRequests() {
      await this.fetchRequests();
    },
  },
  mounted() {
    this.getRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
