<script setup>
import { RouterLink, RouterView } from "vue-router";
import TadVue from "./components/Tad.vue";
import NavbarVue from "./components/Navbar.vue";
</script>

<template>
  <div>
    <NavbarVue />
    <RouterView />
  </div>
</template>
