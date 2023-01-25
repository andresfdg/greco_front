<template>
  <div class="storegield vh-100">
    <div class="container">
      <h2 class="title">orders</h2>
      <div class="row">
        <div class="col card" v-for="i in data.store" :key="i">
          <div>name: {{ i.name }}</div>
          <div>email: {{ i.email }}</div>
          <div>city: {{ i.city }}</div>
          <div>adress: {{ i.adress }}</div>
          <div>quantity: {{ i.quantity }}</div>
          <div>discount: {{ i.discount }}</div>
          <div>id: {{ i.id }}</div>
          <div>stade: {{ i.active }}</div>
          <button v-if="i.active == 'In process'" @click="() => send(i)">
            send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

const data = reactive({
  store: [],
});

const router = useRoute();

const store = () => {
  const id = router.params.id;
  console.log(id);

  fetch(`http://127.0.0.1:8000/storegieldorder/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.store = da));
};

const send = async (i) => {
  let idx = {
    id: i.id,
  };

  const res = await fetch(`http://127.0.0.1:8000/send`, {
    method: "POST",
    body: JSON.stringify(idx),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  store();
};

onMounted(() => {
  store();
});
</script>

<style>
.storegield {
  background-color: rgb(112, 173, 173);
}

.title {
  text-align: center;
}
</style>
