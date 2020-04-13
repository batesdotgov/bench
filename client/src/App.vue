<template>
  <div id="app">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "App",
  components: {
    LoginForm
  },
  data() {
    return {
      api: process.env.VUE_APP_API_URL
    };
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
}
</style>
