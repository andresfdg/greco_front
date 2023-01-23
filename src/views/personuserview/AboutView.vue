<template>
  <div class="containe">
    <div class="login">
      <FormSignupVue />
    </div>
  </div>
</template>

<script setup>
import FormSignupVue from "../../components/FormSignup.vue";
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.containe {
  background-color: aquamarine;
}
</style>
