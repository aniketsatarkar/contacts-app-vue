import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const axios = require("axios");
const VueCookie = require("vue-cookie");

Vue.use(VueCookie);
Vue.config.productionTip = false;

Vue.mixin({
  data: function() {
    return {
      apiURL: "http://laravel.local/api/"
    };
  },
  methods: {
    postRequest: function(path, params = {}) {
      var self = this;
      return axios({
        method: "POST",
        url: self.apiURL + path,
        data: params,
        headers: { Authorization: "Bearer " + VueCookie.get("token") }
      });
    },
    getRequest: function(path, params = {}) {
      var self = this;
      return axios({
        method: "GET",
        url: self.apiURL + path,
        data: params,
        headers: {
          Authorization: "Bearer " + VueCookie.get("token")
        }
      });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  // created event handler to verify if user have token?
  // if yes take him to the dashboard.
  created: function() {
    var token = this.$cookie.get("token");
    if (token != undefined && token != "") {
      router.push({ name: "dashboard" });
      this.$store.state.isLoggedIn = true;
    }
  },
  methods: {}
}).$mount("#app");
