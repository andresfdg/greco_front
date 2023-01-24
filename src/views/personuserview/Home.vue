<template>
  <div class="home vh-100">
    <div class="container">
      <span class="titlehome">Welcome! {{ data.user.name }}</span>
      <div class="alitem">
        <span class="welcomestore">
          <div class="bv">
            <div>Stores:</div>
            <div>
              <i class="bx bxs-store"></i>
            </div>
          </div>
        </span>
        <div class="row">
          <div class="col-lg-2" v-for="i in data.stores" :key="i">
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
import { useStore } from "../../stores/store";
import CardStoreVue from "../../components/CardStore.vue";

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

.alitem {
  display: flex;
  background-color: rgb(113, 200, 138);
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.titlehome {
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  padding: 10px;
  font-size: 30px;
}
.welcomestore {
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}

.bv {
  display: flex;
  margin: 10px;
}
</style>
