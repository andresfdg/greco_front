<template>
  <div class="store vh-100">
    <div class="container">
      <h1 class="titlestore"></h1>
      <h3 class="products">Products</h3>
      <router-link to="/home"><i class="bx bx-arrow-back"></i></router-link>
      <div class="x">
        <form
          @submit.prevent="create_guield"
          v-if="data.form"
          class="form_guield"
        >
          <input type="number" placeholder="quantity" v-model="data.quantity" />
          <input
            type="number"
            placeholder="life_time"
            v-model="data.life_time"
          />
          <input type="number" placeholder="discount" v-model="data.discount" />
          <button>add_guield</button>
        </form>
      </div>

      <div class="row">
        <div class="form d-flex justify-content-center"></div>

        <div v-for="(i, a) in data.items" :key="i" class="col-3 card m-5">
          <div @click="() => active_form(i)">
            <div>product: {{ i.name }}</div>
            <div>category: {{ i.category }}</div>
            <div>price: {{ i.price }}</div>
            <div>availability:{{ !i.availability ? 10 : i.availability }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const data = reactive({
  discount: "",
  life_time: "",
  quantity: "",
  id: "",
  form: false,
  items: [],
});

const getitems = async () => {
  const res = await fetch("http://127.0.0.1:8000/items_store", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const da = await res.json();
  data.items = da;
};

const active_form = (i) => {
  data.form = true;
  data.id = i.id;
};

const create_guield = () => {
  let payload = {
    item: data.id,
    quantity_max: data.quantity,
    life_time: data.life_time,
    discount: data.discount,
  };

  fetch(`http://127.0.0.1:8000/store_create_new_guild`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  setTimeout(() => {
    data.form = false;
  }, 2000);
};

onMounted(() => {
  getitems();
});
</script>

<style>
.form_guield {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.store {
  background-color: rgb(222, 245, 237);
}

.x {
  display: flex;
  justify-content: center;
}
</style>
