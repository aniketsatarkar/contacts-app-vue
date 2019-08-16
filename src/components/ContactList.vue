<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="text-center">Name</th>
          <th scope="col" class="text-center">Phone</th>
          <th scope="col" class="text-center">Email</th>
          <th scope="col" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" v-bind:key="item.id">
          <td class="text-center">{{ item.firstName + " " + item.lastName }}</td>
          <td class="text-center">{{ item.phone }}</td>
          <td class="text-center">{{ item.emails? item.email : "N/A" }}</td>
          <td class="text-center">
            <button class="btn btn-outline-primary btn-sm mr-3" v-on:click="edit(item.id)">Edit</button>
            <button class="btn btn-outline-danger btn-sm" v-on:click="archive(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "contactList",
  proprs: {
    list: Array
  },
  data: function() {
    return {
      list: []
    };
  },
  watch: {
    list: function(newValue, oldValue) {
      self.list = newValue;
    }
  },
  methods: {
    getList: function() {
      var self = this;

      this.getRequest("contact/list")
        .then(function(response) {
          self.list = response.data.contacts;
        })
        .catch(function() {});
    },
    archive: function(id) {
      if (!confirm("Do you want to delete this contact?")) return false;

      var self = this;

      this.postRequest("contact/delete", {
        id: id
      })
        .then(function() {
          self.getList();
        })
        .catch(function() {});
    },
    edit: function(id) {
      this.$parent.editId = id;
      this.$parent.showList = false;
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
          self.list = response.data.contacts;
        })
        .catch(function() {
          alert("Failed to get results");
        });
    }
  },
  created: function() {
    this.getList();
  }
};
</script>
