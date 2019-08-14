<template>
  <div>
    <div v-if="showList" class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-md-10 col-sm-8">
            <h3 id="quote">Contacts</h3>
          </div>
          <div class="col-md-2 col-sm-4 text-right">
            <button type="button" class="btn btn-primary btn-sm">+ New Contact</button>
          </div>
        </div>
        <contact-list></contact-list>
      </div>
    </div>
    <div v-else>
      <h3>Edit</h3>
      <hr />
      <contact-form></contact-form>
    </div>
  </div>
</template>

<script>
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import VueCookies from "vue-cookies";
import router from "../router";

export default {
  name: "dashboard",
  data: function() {
    return {
      showList: true,
      editId: null
    };
  },
  methods: {},
  created: function() {
    console.log("dashboard is created!!!");
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
