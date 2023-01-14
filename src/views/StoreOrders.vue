<template>
  <div class="storeorders">
    <div class="container">
      <h1>Orders</h1>
      <div>
        <table class="to table table-hover mt-1">
          <thead>
            <tr>
              <th scope="col">user</th>
              <th scope="col">name</th>
              <th scope="col">quantity</th>
              <th scope="col">price</th>
            </tr>
          </thead>
          <tbody>
            <tr class="m-1" v-for="i in data.orders" :key="i">
              <td>{{ i.us }}</td>
              <td>{{ i.name }}</td>
              <td>{{ i.quantity }}</td>
              <td>{{ i.price }}</td>
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
  fetch("http://127.0.0.1:8000/storeord", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json().then((da) => (data.orders = da)));
};

onMounted(() => {
  orders();
});
</script>

<style>
.storeorders {
  background-color: rgb(222, 245, 237);
}

.to {
  background-color: beige;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 8px;
}
</style>
