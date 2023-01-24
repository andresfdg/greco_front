<template>
  <div class="storeorders vh-100">
    <div class="container">
      <h1>Orders</h1>
      <div>
        <table class="to table table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">gield_id</th>
              <th scope="col">total_ord</th>
              <th scope="col">view</th>
            </tr>
          </thead>
          <tbody>
            <tr class="m-1" v-for="i in data.orders" :key="i">
              <td>{{ i.name }}</td>
              <td>{{ i.price }}</td>
              <td>{{ i.gield_id }}</td>
              <td>{{ i.total_ord }}</td>

              <td>
                <router-link :to="`storegieldorder/${i.gield_id}`">
                  <i class="bx bx-search-alt"></i
                ></router-link>
              </td>
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
  discount: 0,
});

const orders = () => {
  fetch("http://127.0.0.1:8000/storegield", {
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

.discount {
  color: rgb(29, 35, 205);
  font-weight: bold;
  font-size: 20px;
}
</style>
