<template>
  <nav>
    <div class="nav-left">
      <h1>Bench</h1>
    </div>
    <div class="nav-right">
      <div v-if="!isLoggedIn" class="logged-out-nav">
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
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
  computed: mapGetters(["isLoggedIn"]),
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
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
  padding: 20px 50px;
}
</style>
