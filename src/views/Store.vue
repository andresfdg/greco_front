<template>
  <div class="store vh-100">
    <div class="container">
      <h1 class="titlestore">{{ data.store.name }}</h1>
      <h3 class="products">Products</h3>

      <div>
        <form @submit.prevent="createorder" v-if="data.form">
          <label
            >cuantos {{ data.name }},{{ data.id }}:
            <input type="text" v-model="data.quantity"
          /></label>
          <button>enviar</button>
        </form>
      </div>
      <div class="row">
        <div v-for="i in data.items" :key="i" class="col-3 card">
          <h5 @click="() => l(i)">
            <div>
              {{ i.name }}
            </div>
            <div>
              {{ i.category }}
            </div>
            <div>
              {{ i.price }}
            </div>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";

const router = useRoute();

const data = reactive({
  store: {},
  items: {},
  form: false,
  name: "",
  id: "",
  quantity: 0,
});

const store = () => {
  const id = router.params.id;
  console.log(id);

  fetch(`http://127.0.0.1:8000/allstore/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.store = da));
};

const items = () => {
  const id = router.params.id;
  console.log(id);
  fetch(`http://127.0.0.1:8000/storeitems/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.items = da));
};

const l = (i) => {
  data.form = !data.form;
  data.name = i.name;
  data.id = i.id;
};

const createorder = () => {
  const payload = {
    item: data.id,
    quantity: data.quantity,
  };

  fetch(`http://127.0.0.1:8000/create_new_order`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

onMounted(() => {
  store();
  items();
});
</script>

<style>
.store {
  background-color: rgb(222, 245, 237);
}

.products {
  text-align: center;
}
</style>
