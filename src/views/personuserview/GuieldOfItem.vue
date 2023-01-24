<template>
  <div class="guield vh-100">
    <div class="container">
      <div>.</div>
      <h1 class="titleguield">Item Guilds</h1>
      <div class="mt-5"></div>
      <div class="alin">
        <div class="arrow">
          <router-link class="mt-3" :to="`/homestore/${router.params.it}`"
            ><i class="bx bx-arrow-back"></i
          ></router-link>
          <div>
            <button
              class="btguild"
              v-if="data.open"
              @click="() => activeformguild()"
            >
              Create new Guild
            </button>
          </div>
        </div>
      </div>

      <div class="fit">
        <form @submit.prevent="craete_order" class="formitem" v-if="data.form">
          <span class="titlespan">How many items do you want?</span>
          <input type="number" placeholder="quantity" v-model="data.quantity" />
          <button class="b"><i class="bx bx-cart-add"></i></button>
          <div>
            <span class="spa">cost:</span>
            {{ router.params.price * data.quantity }}
          </div>
          <div>
            <span class="spa">discount: </span>
            {{ data.discount }}%
          </div>
          <div>
            <span class="spa">total: </span>
            {{
              router.params.price * data.quantity -
              router.params.price * data.quantity * (data.discount / 100)
            }}
          </div>
        </form>
      </div>

      <div class="fit">
        <form
          @submit.prevent="craete_guild"
          class="formitem"
          v-if="data.formguild"
        >
          <select v-model="data.quantity_max">
            <option :value="data.quantity_low">{{ data.quantity_low }}</option>
            <option :value="data.quantity_medium">
              {{ data.quantity_medium }}
            </option>
            <option :value="data.quantity_high">
              {{ data.quantity_high }}
            </option>
          </select>

          <input type="number" placeholder="quantity" v-model="data.quantity" />
          <input
            type="number"
            placeholder="duration in days"
            v-model="data.life_time"
          />
          <button class="btguild">create!</button>
          {{ data.quantity_max }}
        </form>
      </div>

      <div class="row">
        <div
          class="guildca card col-3 m-5 d-flex justify-content-center"
          v-for="i in data.guields"
          :key="i"
          @click="() => activeform(i)"
        >
          <div class="alm">
            <div>
              <div>name: {{ router.params.name }}</div>
              <div>actual_quantity: {{ i.actual_quantity }}</div>
              <div>discount: {{ i.discount }}</div>
              <div>quantity_max: {{ i.quantity_max }}</div>
              <div>state: {{ i.active }}</div>
            </div>
            <img
              class="mt-3"
              src="../../assets/guild.png"
              alt=""
              width="60"
              height="80"
            />
          </div>
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
  guields: [],
  id_guield: "",
  discount: "",
  quantity: "",

  form: false,
  formguild: false,
  open: false,

  itemid: 0,
  quantity_max: "52",
  life_time: "",
  item: [],
  quantity_low: "",
  quantity_medium: "",
  quantity_high: "",
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
  data.form = !data.form;
  data.formguild = false;

  const isopen = router.params.open == "true";
  data.open = isopen;
};

const activeformguild = () => {
  data.form = false;
  data.formguild = true;
  data.open = false;
  get_item();
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

const craete_guild = async () => {
  let payload = {
    item: Number(router.params.id),
    quantity: Number(data.quantity),
    quantity_max: Number(data.quantity_max),
    life_time: Number(data.life_time),
  };

  const res = await fetch(`http://127.0.0.1:8000/user_create_new_guild`, {
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

const get_item = async () => {
  const res = await fetch(`http://127.0.0.1:8000/item/${router.params.id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();

  data.quantity_low = da.quantity_low;
  data.quantity_medium = da.quantity_medium;
  data.quantity_high = da.quantity_high;
};

onMounted(() => {
  getguields();
});
</script>

<style>
.guield {
  background-color: rgb(222, 245, 237);
}
.guildca {
  padding: 10px;
  width: 280px;

  color: black;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.formitem {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: rgb(90, 219, 150);
  border-radius: 4px;
}
.titleguield {
  text-align: center;
  font-size: 40px;
  font-family: sans-serif;
}

.alm {
  display: flex;
  justify-content: space-between;
}
.arrow {
  text-align: right;
}
.bx-arrow-back {
  font-size: 40px;
  background-color: white;
  color: black;
  border-radius: 4px;
}

.fit {
  display: flex;
  justify-content: center;
  border: none;
}
.fit input {
  border: none;
  padding: 5px;
  margin: 5px;
  border-radius: 4px;
}
.b {
  border: none;
  margin: 5px;
  border-radius: 4px;
  background-color: rgb(35, 122, 35);
  font-size: 25px;
  color: gold;
}

.titlespan {
  padding: 4px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 14px;
}

.b:hover {
  background-color: rgb(47, 101, 50);
}

.spa {
  font-weight: bold;
}

.alin {
  display: flex;
  flex-direction: column;
}
.btguild {
  background-color: rgb(255, 238, 127);
  margin: 10px;
  border: none;
  padding: 10px;
  font-size: 18px;
  font-family: sans-serif;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.btguild:hover {
  background-color: rgb(249, 223, 54);
}
</style>
