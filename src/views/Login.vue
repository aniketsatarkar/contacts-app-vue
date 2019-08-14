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
        <h1 class="mb-3 mt-3 text-primary">Login</h1>
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
            min="8"
          />
        </div>
        <div class="form-group">
          <button v-on:click="login" type="button" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import router from "../router";

export default {
  name: "login",
  data: function() {
    return {
      email: "anikets@gmail.com",
      password: "anikets123",
      errors: []
    };
  },
  methods: {
    login: function() {
      var vm = this;
      var form = document.getElementById("form");

      form.reportValidity();

      if (!form.checkValidity()) return false;

      axios
        .post("http://laravel.local/api/auth/login", {
          email: vm.email,
          password: vm.password
        })
        .then(function(response) {
          /* eslint-disable no-console */
          console.log("RESPONSE : " + JSON.stringify(response));

          // store the JWT token in global state >>>
          vm.$store.state.token = response.data.access_token;

          vm.$cookie.set("token", response.data.access_token, 30);

          // make instance as logged in >>>
          vm.$store.state.isLoggedIn = true;

          // redirect user to the dashboard >>
          router.push({ name: "dashboard" });
        })
        .catch(function(error) {
          vm.errors = errors.data.errors;
        });
    }
  }
};
</script>
