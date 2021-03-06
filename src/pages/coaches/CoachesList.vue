<template>
  <div>
    <coach-filter @changeFilter="setFilters" />
    <base-dialog title="An error ocurred!" :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="getCoaches(true)">
            <em class="fas fa-redo" />
          </base-button>
          <base-button link to="/register" v-if="registerAsCoachAcces">
            Register as a Coach
          </base-button>
        </div>

        <div v-if="isLoading">
          <base-spinner />
        </div>

        <ul v-else-if="hasCoaches">
          <li v-for="coach in filteredCoaches" :key="coach.id">
            <coach-item
              :id="coach.id"
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            />
          </li>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';

import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters('coaches', ['coaches', 'hasCoaches', 'isCoach']),
    ...mapGetters(['isAuthenticated']),
    registerAsCoachAcces() {
      return !this.isCoach && !this.isLoading && this.isAuthenticated;
    },
    parsedFilters() {
      return _.reduce(
        this.activeFilters,
        function (memo, val, key) {
          if (val) memo.push(key);
          return memo;
        },
        []
      );
    },
    filteredCoaches() {
      const filters = this.parsedFilters;

      return _.filter(this.coaches, function (coach) {
        const checkedValues = _.intersection(Array.from(coach.areas), filters);
        return !_.isEmpty(checkedValues);
      });
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async getCoaches(forceFetch) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/fetchData', { forceFetch });
        this.isLoading = false;
      } catch ({ message }) {
        this.isLoading = false;
        this.error = message;
      }
    },
    handleError() {
      this.error = null;
    },
  },
  mounted() {
    this.getCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
