<template>
  <div class="list-item" @click="toggleDetails">
    <div class="title">
      <div>
        {{ item.title }}
      </div>
      <div class="img-wrapper" v-bind:id="item.id" @click.prevent.stop="toggleMenu" v-click-outside="hideMenu">
        <img preload src="@/assets/more.svg" />
        <div class="card menu" v-if="showMenu">
          <div @click.stop="navigate(item.id)">edit</div>
          <div @click.stop="toggleModal(item.id)">delete</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="description" v-if="showDetails">{{ item.description }}</div>
    </transition>
    <modal buttonText="Delete" v-if="showModal" @close="showModal = false">
      <div slot="body">Are you sure you want to delete this item?</div>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  components: {
    modal: Modal,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      showDetails: false,
      showMenu: false,
      showModal: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    toggleModal() {
      this.showMenu = false;
      this.showModal = true;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
    navigate(id) {
      this.$router.push({ name: "edit", params: { id } });
    },
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
          console.warn(warn);
        }
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || !el.contains(e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },
      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
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
    height: 40px;
    box-sizing: border-box;
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
    padding: 5px;
    &:hover {
      img {
        opacity: 1;
      }
    }
  }
  img {
    height: 20px;

    opacity: 0.6;
  }
}
.menu {
  position: absolute;
  font-weight: 300;
  font-size: 1rem;
  float: right;
  margin-left: -75px;
  border: 1px solid #eaecef;
  div {
    padding: 10px 20px;
    &:hover {
      background: #eaecef;
    }
  }
  z-index: 3;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
