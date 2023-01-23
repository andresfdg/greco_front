<template>
  <div class="guield vh-100">
    <div class="container">
      <h1>gield</h1>
      <div class="mt-5"></div>
      <router-link class="mt-3" to="/home"
        ><i class="bx bx-arrow-back"></i
      ></router-link>

      <div>
        <form @submit.prevent="craete_order" class="formitem" v-if="data.form">
          <input type="number" placeholder="quantity" v-model="data.quantity" />
          <button>add</button>
          <div>cost:{{ router.params.price * data.quantity }}</div>

          <div>discount: {{ data.discount }}%</div>
          <div>
            total:{{
              router.params.price * data.quantity -
              router.params.price * data.quantity * (data.discount / 100)
            }}
          </div>
          <span>added</span>
        </form>
      </div>

      <div class="row">
        <div
          class="g card col-3 m-5 d-flex justify-content-center"
          v-for="i in data.guields"
          :key="i"
          @click="() => activeform(i)"
        >
          <div>gield_id: {{ router.params.name }}</div>
          <div>actual_quantity: {{ i.actual_quantity }}</div>
          <div>discount: {{ i.discount }}</div>
          <div>quantity_max: {{ i.quantity_max }}</div>
          <div>state: {{ i.active }}</div>
        </div>
      </div>
      {{ data.id_guield }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const data = reactive({
  id_guield: "",
  discount: "",
  form: false,
  quantity: "",
  guields: [],
});

const router = useRoute();

const getguields = async () => {
  const id = router.params.id;
  const res = await fetch(`http://127.0.0.1:8000/guielditem/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();

  data.guields = da;
};

const activeform = (i) => {
  data.discount = i.discount;
  data.id_guield = i.id;

  data.form = true;
};

const craete_order = async () => {
  let payload = {
    guild_id: Number(data.id_guield),
    quantity: Number(data.quantity),
  };

  const res = await fetch(`http://127.0.0.1:8000/user_inter_guild`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = res.json();
  console.log(da);
  data.form = false;
  getguields();
};

onMounted(() => {
  getguields();
});
</script>

<style>
.guield {
  background-color: rgb(222, 245, 237);
}
.g {
  background-color: rgb(66, 66, 66);
  height: 200px;
  border: none;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: beige;
}

.formitem {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 200px;
}
</style>
