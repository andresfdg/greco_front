<template>
  <div class="container">
    <div>
      <h4>hello {{ data.user.name }}!</h4>
    </div>
    <div>
      <h4>phone: {{ data.user.phone }}!</h4>
    </div>
    <div>
      <h4>city: {{ data.user.city }}!</h4>
    </div>
    <div v-for="i in data.stores" :key="i">
      <div>
        <router-link :to="`homestore/${i.id}`">
          <h2>
            {{ i.name }}
          </h2>
        </router-link>
      </div>
      {{ i }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "../stores/store";

const store = useStore();

const data = reactive({
  name: "hola",
  user: {},
  stores: {},
});

const getinfouser = async () => {
  const res = await fetch("http://127.0.0.1:8000/infouser", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();
  console.log(da);

  data.user = da;
};

const stores = async () => {
  fetch("http://127.0.0.1:8000/allstore")
    .then((res) => res.json())
    .then((da) => (data.stores = da));
};

onMounted(() => {
  getinfouser();
  stores();
});
</script>

<style></style>
