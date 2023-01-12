<template>
  <div class="home vh-100">
    <div class="container">
      <div class="row">
        <div class="row">
          <div class="col-lg-2 col-sm-6" v-for="i in data.stores" :key="i">
            <router-link
              style="text-decoration: none; color: inherit"
              :to="`homestore/${i.id}`"
            >
              <CardStoreVue :title="i.name" :date="i.date"></CardStoreVue>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "../stores/store";
import CardStoreVue from "../components/CardStore.vue";

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

<style>
.home {
  background-color: rgb(222, 245, 237);
}
</style>
