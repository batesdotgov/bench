<template>
  <div class="bench-list-page">
    <div class="page-wrapper">
      <div class="button-header">
        <div class="button-wrapper">
          <button @click="createItem">New</button>
        </div>
      </div>
      <div class="loading" v-if="pending">loading...</div>
      <div class="main-list card">
        <bench-item v-for="item in list" v-bind:item="item" v-bind:key="item.id"></bench-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BenchItem from "./BenchItem";

export default {
  mounted() {
    this.$store.dispatch("bench/fetch");
  },
  components: {
    "bench-item": BenchItem,
  },
  computed: {
    ...mapState("bench", ["pending"]),
    ...mapState("bench", ["list"]),
  },
  methods: {
    createItem() {
      this.$router.push("/new");
    },
  },
};
</script>

<style lang="scss" scoped>
.bench-list-page {
  width: 100%;
}
.page-wrapper {
  display: flex;
  flex-direction: column;

  .button-header {
    display: flex;
    justify-content: flex-end;
  }
}

.main-list {
  margin: 20px 0;
}
</style>
