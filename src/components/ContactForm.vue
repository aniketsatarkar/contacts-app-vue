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
      <div
        v-if="isSuccess"
        class="alert alert-success col-8"
        role="alert"
      >Contact Saved Successfully!</div>
      <form class="col-6 card" id="form">
        <div class="form-group pt-3">
          <label>First Name</label>
          <input
            v-model="firstName"
            type="text"
            class="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            v-model="lastName"
            type="text"
            class="form-control"
            placeholder="Last Name"
            required
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input v-model="phone" type="text" class="form-control" placeholder="Phone" required />
        </div>
        <div class="form-group">
          <label>Secondary Phone</label>
          <input
            v-model="phoneSecondary"
            type="text"
            class="form-control"
            placeholder="Secondary Phone"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Email" email />
        </div>
        <div class="form-group text-center">
          <button type="button" v-on:click="cancel" class="btn btn-info mr-3">Cancel</button>
          <button v-on:click="save" type="button" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";

export default {
  name: "contactForm",
  props: {
    id: Number
  },
  data: function() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      phoneSecondary: "",
      email: "",
      errors: [],
      isSuccess: false
    };
  },
  methods: {
    getContact: function() {
      var self = this;

      if (this.$parent.editId == undefined || this.$parent.editId == null) {
        return false;
      }

      this.getRequest("contact/get?id=" + this.$parent.editId)
        .then(function(response) {
          var contact = response.data.contact;
          self.firstName = contact.firstName;
          self.lastName = contact.lastName;
          self.phone = contact.phone;
          self.phoneSecondary = contact.phoneSecondary;
          self.email = contact.email;
        })
        .catch(function() {});
    },
    update: function() {
      var self = this;

      var form = document.getElementById("form");
      form.reportValidity();

      if (!form.checkValidity()) return false;

      this.postRequest("contact/update", {
        id: this.$parent.editId,
        firstName: self.firstName,
        lastName: self.lastName,
        phone: self.phone,
        phoneSecondary: self.phoneSecondary,
        email: self.email
      })
        .then(function() {
          self.isSuccess = true;
        })
        .catch(function() {});
    },
    create: function() {
      var self = this;
      var form = document.getElementById("form");

      form.reportValidity();

      if (!form.checkValidity()) return false;

      this.postRequest("contact/store", {
        firstName: self.firstName,
        lastName: self.lastName,
        phone: self.phone,
        phoneSecondary: self.phoneSecondary,
        email: self.email
      })
        .then(function() {
          self.isSuccess = true;
        })
        .catch(function() {});
    },
    save: function() {
      var id = this.$parent.editId;

      if (id != null || id != undefined) {
        this.update();
      } else {
        this.create();
      }
    },
    cancel: function() {
      this.$parent.showList = true;
      this.$parent.editId = null;
    }
  },
  created: function() {
    // get the contact data if id is not null...
    this.getContact();
  }
};
</script>
