<template>
  <div>
    <div v-if="!isLoggedIn" class="home-component welcome-message">
      <h1>Welcome to Bench.</h1>
      <div class="info-center card">
        <div class="header">
          Contact Information
        </div>
        <div class="body">
          <div class="contact-item">
            <div class="name">
              Brian
            </div>
            <div class="email">
              bra@.g
            </div>
          </div>

          <div class="contact-item">
            <div class="name">
              Brian
            </div>
            <div class="email">
              bra@.g
            </div>
          </div>
        </div>
      </div>
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
    ...mapGetters("auth", ["isLoggedIn"]),
  },
};
</script>

<style lang="scss">
.home-component {
  width: 600px;
  margin: 0 auto;
  text-align: center;

  h1 {
    margin-bottom: 50px;
    font-weight: 700;
  }

  .info-center {
    text-align: left;

    .header {
      padding: 20px;
      border-bottom: 1px solid #eaecef;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .body {
      padding: 20px;
    }

    .contact-item {
      margin-bottom: 20px;
    }

    .contact-item .name {
      font-size: 1.2rem;
    }

    .contact-item .email {
      // margin-left: px;
      opacity: 0.7;
      font-weight: 300;
    }
  }
}
</style>
