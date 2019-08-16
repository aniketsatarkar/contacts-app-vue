<template>
  <div>
    <div v-if="showList" class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <h3 id="quote">Contacts</h3>
          </div>

          <div class="col-md-4 col-sm-4">
            <input
              v-model="search"
              v-on:keyup="searchContacts"
              class="form-control"
              type="text"
              placeholder="Search"
            />
          </div>

          <div class="col-md-4 col-sm-4 text-right">
            <button type="button" class="btn btn-primary btn-sm" v-on:click="addNew">+ New Contact</button>
          </div>
        </div>
        <contact-list v-bind:list="searchResults"></contact-list>
      </div>
    </div>
    <div v-else>
      <h3 v-if="editId">Edit Contact</h3>
      <h3 v-else>New Contact</h3>
      <hr />
      <contact-form></contact-form>
    </div>
  </div>
</template>

<script>
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import router from "../router";

export default {
  name: "dashboard",
  data: function() {
    return {
      showList: true,
      editId: null,
      search: null,
      searchResults: []
    };
  },
  methods: {
    addNew: function() {
      this.showList = false;
    },
    searchContacts: function(string) {
      var self = this;

      if (string == null || string == undefined) {
        return false;
      }

      self
        .getRequest("contact/list?search=" + string)
        .then(function(response) {
          if (!response.status == 200) {
            alert("Failed to get results");
          }
          self.searchResults = response.data.contacts;
        })
        .catch(function() {
          alert("Failed to get results");
        });
    }
  },
  components: {
    ContactList,
    ContactForm
  },
  created: function() {
    if (!this.$store.state.isLoggedIn) {
      router.push({ name: "login" });
    }
  }
};
</script>
