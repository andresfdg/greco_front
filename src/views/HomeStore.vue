<template>
  <div>
    <div class="container mt-3">
      <div class="divide">
        <h1>info</h1>

        <button @click="() => (data.form = !data.form)">AGREGAR TIENDA</button>
      </div>
      <form @submit.prevent="addStores" v-if="data.form">
        <input placeholder="Store name" v-model="ada.name" />
        <button>create store</button>
      </form>

      <div>
        {{ data.store }}
      </div>
    </div>
    <div>
      {{ data.infostore }}
    </div>
    <div>
      <button @click="addItem">ADD ITEMS</button>
      <form>
        <input type="text" name="" id="" />
        <button>add</button>
        {{ data.infoitem }}
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const data = reactive({
  form: false,
  store: {},
  infostore: {},
  infoitem: {},
});

const ada = reactive({
  name: "ddd",
});

const item = reactive({
  name: "guitarra",
  category: "musica",
  price: 500,
  actual_popularity: "low",
  discount_low: 5,
  discount_medium: 10,
  discount_high: 20,
});

const addStores = async () => {
  const res = await fetch(`http://127.0.0.1:8000/store/create`, {
    method: "POST",
    body: JSON.stringify(ada),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();
  console.log(da);
  data.store = da;
};

const addItem = async () => {
  const res = await fetch(`http://127.0.0.1:8000/item/create`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();
  console.log(da);
  data.store = da;

  infoitem();
};

const infostore = async () => {
  const res = await fetch("http://127.0.0.1:8000/onestore", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();

  data.infostore = da;
};

const infoitem = () => {
  fetch("http://127.0.0.1:8000/items", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.infoitem = da));
};

onMounted(() => {
  infostore();
});

onMounted(() => {
  infoitem();
});
</script>

<style>
.divide {
  display: flex;
  justify-content: space-between;
}
</style>
