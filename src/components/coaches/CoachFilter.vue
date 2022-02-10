<template>
  <section>
    <base-card>
      <h2>Find Your Coach</h2>
      <span class="filter-option">
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          checked
          @change="setFilter"
        />
        <label for="frontend">Frontend</label>
      </span>

      <span class="filter-option">
        <input
          type="checkbox"
          name="backend"
          id="backend"
          checked
          @change="setFilter"
        />
        <label for="backend">Backend</label>
      </span>

      <span class="filter-option">
        <input
          type="checkbox"
          name="career"
          id="career"
          checked
          @change="setFilter"
        />
        <label for="career">Careers</label>
      </span>
    </base-card>
  </section>
</template>

<script>
export default {
  emits: ['changeFilter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const {
        target: { id, checked },
      } = event;

      // build updated filters
      const updatedFilters = {
        ...this.filters,
        [id]: checked,
      };

      // set filters
      this.filters = updatedFilters;

      // emit filter change
      this.$emit('changeFilter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
