<template>
  <div class="orders container-fluid vh-100">
    <div class="container">
      <p class="titleor">My orders</p>

      <div>
        <table class="table table-hover mt-1">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">item</th>
              <th scope="col">quantity</th>
              <th scope="col">store_id</th>
              <th scope="col">gield_id</th>
              <th scope="col">stade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in data.orders" :key="i">
              <th scope="row">{{ i.id }}</th>
              <td>{{ i.item }}</td>
              <td>{{ i.quantity }}</td>
              <td>{{ i.store_id }}</td>
              <td>{{ i.gield_id }}</td>
              <td>{{ i.active }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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

<style>
.orders {
  background-color: rgb(222, 245, 237);
}
.table {
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.titleor {
  text-align: center;
  font-family: sans-serif;

  font-size: 40px;
  padding: 10px;
}
</style>
