<template>
  <div class="login">
    <h1>{{ name }}</h1>
    <button @click="shit">Log Shit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Bench"
    };
  },
  methods: {
    async shit() {
      console.log("shit");
    }
  }
};
</script>

<style lang="scss"></style>
