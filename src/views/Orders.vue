<template>
  <div>
    <h1>Working</h1>
    <div>
      {{ data.orders }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "@vue/runtime-core";

const data = reactive({
  orders: {},
});

const orders = () => {
  fetch(`http://127.0.0.1:8000/userorders`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.orders = da));
};

onMounted(() => {
  orders();
});
</script>

<style></style>
