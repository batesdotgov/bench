<template>
  <div class="list-item" @click="toggleDetails">
    <div class="title">
      <div>
        {{ item.title }}
      </div>
      <div class="img-wrapper" @click.prevent.stop="toggleMenu"><img src="@/assets/more.svg" /></div>
    </div>
    <transition name="fade">
      <div class="description" v-if="showDetails">{{ item.description }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      showDetails: false,
      showMenu: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss">
.list-item {
  transition: all 0.1s ease-in-out;
  height: auto;
  padding: 20px;
  border-bottom: 1px solid #eaecef;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .img-wrapper {
    z-index: 2;
    &:hover {
      img {
        opacity: 1;
      }
    }
  }
  img {
    height: 20px;
    z-index: 2;
    opacity: 0.6;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
