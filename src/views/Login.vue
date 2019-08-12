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
          <input v-model="email" value="anikets@gmail.com" type="email" class="form-control" placeholder="Email" required email />
        </div>
        <div class="form-group">
          <input v-model="password" value="anikets123" type="password" class="form-control" placeholder="Password" required />
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
// import router from "../router";

export default {
  name: "login",
  data: function() {
    return {
      email   : "",
      password: "",
      errors  : [],
      test    : "test"
    };
  },
  methods: {
    login: function() {
      var vm = this;
      var form = document.getElementById("form");

      form.reportValidity();

      if (!form.checkValidity()) return false;

      axios({
        method: "post",
        url   : "http://laravel.local/api/auth/login",
        data: {
          email: vm.email,
          password: vm.password
        }
      })
      .then(function(response) {
        this.$store.state.token = response.data.access_token;
      })
      .catch(function(error) {
        vm.test = JSON.stringify(error);
      });
    }
  }
};
</script>
