<template>
  <div>
    <div class="row">
      <div
        v-bind:key="index"
        v-for="(error, index) in errors"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        class="alert alert-danger col-12"
      >{{ index + ' : ' + error.join(', ') }}</div>
    </div>
    <div class="row h-100 justify-content-center align-items-center">
      <form class="col-6 card" id="form">
        <h1 class="mb-3 mt-3 text-primary">Sign Up</h1>
        <div class="form-group">
          <input v-model="name" type="text" class="form-control" placeholder="Name" required />
        </div>
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
            email
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="password_confirmation"
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div class="form-group">
          <button v-on:click="submit" type="button" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import router from "../router";

export default {
  name: "register",
  components: {},
  data: function() {
    return {
      errors: [],
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    submit: function() {
      var form = document.getElementById("form");
      var vm = this;

      form.reportValidity();

      if (!form.checkValidity()) return false;

      this.postRequest("auth/signup", {
        name: vm.name,
        email: vm.email,
        password: vm.password,
        password_confirmation: vm.password_confirmation
      })
        .then(function() {
          router.push({ name: "login" });
        })
        .catch(function(error) {
          vm.errors = error.response.data.errors;
        });
    }
  }
};
</script>
