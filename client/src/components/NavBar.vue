<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">
        <h1>BENCH.</h1>
      </router-link>
    </div>
    <div class="nav-right">
      <div v-if="!isLoggedIn" class="logged-out-nav">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="isLoggedIn" class="logged-in-nav">
        <div to="/register" @click.prevent="logout">Logout</div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        window.location.replace("/");
      });
    },
  },
};
</script>

<style lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 70px;
  background-color: white;
  border-bottom: 1px solid #eaecef;
  &:hover {
    cursor: pointer;
  }
}
</style>
