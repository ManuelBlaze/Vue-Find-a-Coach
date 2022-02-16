<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Find a Coach</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/coaches">All Coaches</router-link>
        </li>
        <div v-if="!!email">
          <li>
            <router-link to="/requests">Requests</router-link>
          </li>
          <li class="user">
            {{ parsedUser }}
          </li>
        </div>
        <li v-else>
          <router-link to="/auth">
            <em class="fas fa-sign-in-alt" /> LogIn | SignUp
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['email']),
    parsedUser() {
      const { email } = this;

      if (!_.isEmpty(email)) {
        const user = email.split('@')[0];
        return _.capitalize(user);
      }

      return '';
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
  border-radius: 10px;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.user {
  color: white;
  font-weight: bold;
}

em {
  font-size: 18px;
  margin: 0 3px 0 0;
}
</style>
