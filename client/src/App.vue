<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  components: { NavBar },
  name: "App",
  created: function() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
$breakpoint-desktop: 1280px;
$breakpoint-tablet: 768px;
$breakpoint-mobile: 400px;

nav {
  @media (min-width: $breakpoint-mobile) {
    padding: 10px;
  }
  @media (min-width: $breakpoint-tablet) {
    padding: 20px 5%;
  }
  @media (min-width: $breakpoint-desktop) {
    padding: 20px 15%;
  }
}

.main {
  @media (min-width: $breakpoint-mobile) {
    padding: 10px;
  }
  @media (min-width: $breakpoint-tablet) {
    padding: 20px 5%;
  }
  @media (min-width: $breakpoint-desktop) {
    padding: 50px 15%;
  }
}
</style>
