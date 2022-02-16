<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" name="email" id="email" v-model.trim="email" />
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="password"
        />
      </div>

      <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 characters
        long)
      </p>

      <base-button>{{ submitCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">
        {{ switchModeCaption }}
      </base-button>
    </form>
  </base-card>
</template>

<script>
import _ from 'lodash';

import { mapActions } from 'vuex';

/**
 * @constant
 * @type {Map<String, String>}
 */
const MODES = new Map([
  ['login', 'signup'],
  ['signup', 'login'],
]);

export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    submitCaption() {
      return _.capitalize(this.mode);
    },
    switchModeCaption() {
      const altMode = _.capitalize(MODES.get(this.mode));

      return `${altMode} instead`;
    },
  },
  methods: {
    ...mapActions(['signup']),
    submitForm() {
      // extract values
      const { email, password } = this;

      // clean errors
      this.formIsValid = true;

      // validate errors
      if (_.isEmpty(email) || !_.includes(email, '@') || password.length < 6) {
        this.formIsValid = false;
        return;
      }

      // send the request
      if (this.mode === 'login') {
        return;
      }

      this.signup({
        email,
        password,
      });
    },
    switchAuthMode() {
      // change form mode
      this.mode = MODES.get(this.mode);
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

p {
  color: red;
  text-align: center;
  margin-top: 2px;
}
</style>
