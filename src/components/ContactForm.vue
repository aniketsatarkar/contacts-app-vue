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
        <div class="form-group pt-3">
          <input
            v-model="firstName"
            type="text"
            class="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="lastName"
            type="email"
            class="form-control"
            placeholder="Last Name"
            required
          />
        </div>
        <div class="form-group">
          <input v-model="phone" type="password" class="form-control" placeholder="Phone" required />
        </div>
        <div class="form-group">
          <input
            v-model="phoneSecondary"
            type="text"
            class="form-control"
            placeholder="Secondary Phone"
          />
        </div>
        <div class="form-group">
          <input v-model="email" type="email" class="form-control" placeholder="Email" email />
        </div>
        <div class="form-group">
          <button v-on:click="save" type="button" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
// import router from "../router";
import axios from "axios";

export default {
  name: "contactForm",
  props: {
    id: Number
  },
  data: function() {
    return {
      // id: null,
      firstName: "",
      lastName: "",
      phone: "",
      phoneSecondary: "",
      email: "",
      errors: []
    };
  },
  methods: {
    getContact: function() {
      var self = this;

      if (this.$parent.editId == undefined || this.$parent.editId == null) {
        return false;
      }

      axios({
        method: "GET",
        url: "http://laravel.local/api/contact/get",
        data: {
          id: this.$parent.editId
        },
        headers: {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        }
      })
        .then(function(response) {
          var contact = response.data.contact;
          self.firstName = contact.firstName;
          self.lastName = contact.lastName;
          self.phone = contact.phone;
          self.phoneSecondary = contact.phoneSecondary;
          self.email = contact.email;
        })
        .catch(function(errors) {
          /* eslint-disable no-console */
          console.log(errors.data);
        });
    },
    update: function() {
      var self = this;

      axios({
        method: "POST",
        url: "",
        data: {
          id: this.$parent.editId,
          firstName: self.firstName,
          lastName: self.lastName,
          phone: self.phone,
          phoneSecondary: self.phoneSecondary,
          email: self.email
        }
      })
        .then(function(response) {
          /* eslint-disable no-console */
          console.log(response.data);
          this.$parent.editId = null;
        })
        .catch(function(errors) {
          /* eslint-disable no-console */
          console.log(errors.data);
        });
    },
    create: function() {
      var self = this;

      axios({
        method: "POST",
        url: "",
        data: {
          firstName: self.firstName,
          lastName: self.lastName,
          phone: self.phone,
          phoneSecondary: self.phoneSecondary,
          email: self.email
        }
      })
        .then(function(response) {
          /* eslint-disable no-console */
          console.log(response.data);
        })
        .catch(function(errors) {
          /* eslint-disable no-console */
          console.log(errors.data);
        });
    },
    save: function() {
      if (this.id != null || this.id != undefined) {
        this.update();
      } else {
        this.create();
      }
    }
  },
  created: function() {
    // get the contact data if id is not null...
    console.log("THE ID : " + this.$parent.editId);
    this.getContact();
  }
};
</script>
