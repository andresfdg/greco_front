<template>
  <div class="guield vh-100">
    <div class="container">
      <h1>gield</h1>
      <div class="mt-5"></div>
      <router-link class="mt-3" to="/home"
        ><i class="bx bx-arrow-back"></i
      ></router-link>
      <div class="row">
        <div
          class="g card col-3 m-5 d-flex justify-content-center"
          v-for="i in data.gields"
          :key="i">

          <div>gield_id: {{ i.gield_id }}</div>
          <div>name: {{ i.name }}</div>
          <div>price: {{ i.price }}</div>
          <div>total people: {{ i.order_number }}</div>
          <div>quantity max: {{ i.pop_max }}</div>
          <div>state: {{ i.active }}</div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const data = reactive({
  gields: [],
  filter: [],
});

const getgields = async () => {
  const res = await fetch("http://127.0.0.1:8000/storeorder", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const da = await res.json();

  let result = da.reduce((unique, o) => {
    if (!unique.some((obj) => obj.gield_id === o.gield_id)) {
      unique.push(o);
    }
    return unique;
  }, []);
  data.gields = result;
};

onMounted(() => {
  getgields();
});
</script>

<style>
.guield {
  background-color: rgb(222, 245, 237);
}
.g {
  background-color: rgb(66, 66, 66);
  height: 200px;
  border: none;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: beige;
}
</style>
