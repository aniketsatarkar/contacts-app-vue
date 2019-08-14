<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Contacts</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>

        <div class="form-inline my-2 my-lg-0">
          <div v-if="this.$store.state.isLoggedIn">
            <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="logout">Logout</button>
          </div>
          <div v-else>
            <router-link class="btn btn-outline-info my-2 my-sm-0 mr-3" to="/login">Login</router-link>
            <router-link class="btn btn-outline-success my-2 my-sm-0" to="/sign-up">Sign-Up</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
const axios = require("axios");
var VueCookies = require("vue-cookie");
export default {
  methods: {
    logout: function() {
      axios({
        url: "http://laravel.local/api/auth/logout",
        data: {},
        headers: {
          Authorization: "Bearer " + VueCookies.get("token")
        },
        method: "GET"
      })
        .then(function(response) {
          // eslint-disable-next-line no-console
          console.log("LOGOUT RESPONSE : " + JSON.stringify(response));
          VueCookies.delete("token");
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log("LOGOUT RESPONSE : " + JSON.stringify(error));
        });
    }
  }
};
</script>
