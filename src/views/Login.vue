<template>
  <div class="containe">
    <div class="login">
      <FormVue />
    </div>
  </div>
</template>

<script setup>
import FormVue from "../components/FormLogin.vue";
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.containe {
  background-color: #5bcf8b;
}
</style>
