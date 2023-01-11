import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      auth: localStorage.getItem("type"),
    };
  },

  actions: {
    increase(payload) {
      this.counter += payload;
    },
  },

  getters: {},
});
