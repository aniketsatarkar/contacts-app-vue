import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
const axios = require("axios");
// const config = require("./config");

var VueCookie = require("vue-cookie");
// Vue.use(bootstrap);
Vue.use(VueCookie);

Vue.config.productionTip = false;

Vue.mixin({
  data: function() {
    return {
      baseUrl: "http://laravel.local/api/"
    };
  },
  methods: {
    postRequest: (path, params = {}) => {
      return axios({
        method: "POST",
        url: this.data.baseUrl + path,
        data: params,
        headers: { Authorization: "bearer " + this.$cookie.get("token") }
      });
    },
    getRequest: (path, params = {}) => {
      return axios({
        method: "GET",
        url: this.data.baseUrl + path,
        data: params
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
