<template>
<div class="carts">
<div class="col-3 card">   
  <h1>Esta tienda se llama: {{ title }}</h1>
  <h2> Se creo el: {{ date}}</h2>
</div>
</div>

</template>

<script setup>
const props = defineProps({
  title: String,
  date: String,
})

</script>

<style>
.carts {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
