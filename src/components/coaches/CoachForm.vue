<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        @blur="clearValidity('firstName')"
        v-model.trim="firstName.val"
      />
      <p class="label-error" v-if="!firstName.isValid">
        First Name must not be empty!
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        @blur="clearValidity('lastName')"
        v-model.trim="lastName.val"
      />
      <p class="label-error" v-if="!lastName.isValid">
        Last Name must not be empty!
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        rows="5"
        id="description"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      />
      <p class="label-error" v-if="!description.isValid">
        Description must not be empty!
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        name="rate"
        id="rate"
        @blur="clearValidity('rate')"
        v-model.number.trim="rate.val"
      />
      <p class="label-error" v-if="!rate.isValid">
        Hourly Rate must be a positive value!
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          @blur="clearValidity('areas')"
          v-model="areas.val"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          @blur="clearValidity('areas')"
          v-model="areas.val"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          @blur="clearValidity('areas')"
          v-model="areas.val"
        />
        <label for="career">Career Advisory</label>
      </div>

      <p class="label-error" v-if="!areas.isValid">
        At least one expertise must be selected!
      </p>
    </div>

    <div v-if="!formIsValid">
      <hr />
      <p>Please fix the above errors and submit again!</p>
    </div>

    <base-button>Register</base-button>
  </form>
</template>

<script>
import _ from 'lodash';

/**
 * Default string value
 * @constant
 * @type {String}
 * @default
 */
const DEFAULT_STRING = '';

export default {
  emits: ['saveData'],
  data() {
    return {
      firstName: {
        val: DEFAULT_STRING,
        isValid: true,
      },
      lastName: {
        val: DEFAULT_STRING,
        isValid: true,
      },
      description: {
        val: DEFAULT_STRING,
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      // validate name and last name
      if (this.firstName.val === DEFAULT_STRING) {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.val === DEFAULT_STRING) {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      // validate description
      if (this.description.val === DEFAULT_STRING) {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      // validate rate
      if (_.isNil(this.rate.val) || this.rate.val <= 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      // validate areas
      if (_.isEmpty(this.areas.val)) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      // valdiate the form
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      // build the form data
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      // globally save the data
      this.$emit('saveData', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.label-error {
  margin-top: 2px;
}
</style>
