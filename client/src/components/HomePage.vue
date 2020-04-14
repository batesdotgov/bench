<template>
  <div>
    <div v-if="!isLoggedIn" class="home-component welcome-message">
      <h1>Welcome to Bench. Please login to begin recording activities.</h1>
    </div>
    <div v-if="isLoggedIn">
      <bench-item-list></bench-item-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BenchItemList from "@/components/BenchItemList.vue";

export default {
  components: {
    "bench-item-list": BenchItemList,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style lang="scss">
.home-component {
  width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>
