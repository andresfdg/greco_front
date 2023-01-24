<template>
  <div class="guield vh-100">
    <div class="container">
      <h1 class="titleguilds">My guilds</h1>

      <div class="row">
        <div
          class="g card col-3 m-5 d-flex justify-content-center"
          v-for="i in data.gields"
          :key="i"
        >
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

.titleguilds {
  text-align: center;
  font-size: 40px;
  font-family: sans-serif;

  padding: 10px;
}

.g {
  padding: 10px;
  width: 280px;

  color: black;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
