<template>
  <div class="form-inline">
    <input class="form-control col-12" type="search" placeholder="Search" aria-label="Search" />
  </div>
</template>

<script>
export default {
  name: "search",
  data: function() {
    return { string: null };
  }
};
</script>
